import Cart from "../models/Cart.js";
import Stripe from "stripe";

export const addToCart = async (req, res) => {
  try {
    const userId = req.user.id;
    const { bookId } = req.body;

    let cart = await Cart.findOne({ user: userId });

    if (!cart) {
      cart = await Cart.create({
        user: userId,
        items: [{ bookId, count: 1 }],
      });
    } else {
      const existingItem = cart.items.find(
        (item) => item.bookId.toString() === bookId
      );

      if (existingItem) {
        existingItem.count += 1;
      } else {
        cart.items.push({ bookId, count: 1 });
      }

      await cart.save();
    }

    res.status(200).json({ message: "success", cart });
  } catch (error) {
    res.status(500).json({ message: "fail", error: error.message });
  }
};

export const getAllCart = async (req, res) => {
  try {
    const userId = req.user.id;
    const cart = await Cart.findOne({ user: userId }).populate("items.bookId");

    if (!cart) {
      return res.status(200).json({ items: [] });
    }
    res.status(200).json({ message: "success", cart });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getCartCount = async (req, res) => {
  try {
    const userId = req.user.id;
    const cart = await Cart.findOne({ user: userId }).populate("items.bookId");
    const count = cart
      ? cart.items.reduce((acc, items) => {
          return acc + items.count;
        }, 0)
      : 0;
    res.status(200).json({ message: "success", count });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const removeCart = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    const cart = await Cart.findOne({ user: userId }).populate("items.bookId");

    if (!cart) {
      return res.status(404).json({ message: "fail", data: "Cart not found" });
    }

    cart.items = cart.items
      .map((item) => {
        if (item._id.toString() === id) {
          if (item.count > 1) {
            item.count -= 1;
            return item;
          } else {
            return null;
          }
        }
        return item;
      })
      .filter((item) => item !== null);

    await cart.save();

    res.status(200).json({ message: "success", cart });
  } catch (error) {
    res.status(500).json({ message: "fail", error: error.message });
  }
};

//Checout Way
const stripe = new Stripe(`${process.env.STRIPE_SECRET_KEY}`);

export const checkOut = async (req, res) => {
  try {
    const userId = req.user.id;
    const cart = await Cart.findOne({ user: userId }).populate("items.bookId");

    const line_items = cart.items.map((item) => {
      const book = item.bookId;
      const unitPrice = Math.round((book.price || 0) * 100);
      return {
        price_data: {
          currency: "usd",
          product_data: {
            name: book.title || "Book",
            description: book.author || "",
            images: [book.bookImage],
            metadata: {
              userId: userId,
              bookId: book._id.toString(),
              rating: book.rating || "0",
            },
          },
          unit_amount: unitPrice,
        },
        quantity: item.count,
      };
    });

    const session = await stripe.checkout.sessions.create({
      line_items: line_items,
      mode: "payment",
      success_url: `${process.env.FRONTEND_URL}/checout-success`,
      cancel_url: `${process.env.FRONTEND_URL}/cart`,
    });

    res.status(200).json({ url: session.url });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
