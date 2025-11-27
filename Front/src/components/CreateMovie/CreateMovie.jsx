import { useMutation } from "@tanstack/react-query";
import { useFormik } from "formik";
import React, { useState } from "react";
import * as Yup from "yup";
import axiosInstance from "../../config/axio";
import toast from "react-hot-toast";
import useGetCategories from "../../Hooks/useGetCategories";

function CreateMovie() {
  const [preview, setPreview] = useState(null);
  const [posterFile, setPosterFile] = useState(null);
  const { data: categories, isLoading: catLoading } = useGetCategories();

  const {
    data,
    mutate: addmovie,
    isLoading,
  } = useMutation({
    mutationKey: ["addmovies"],
    mutationFn: async (formData) => {
      const res = await axiosInstance.post("book", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      console.log(res?.data);
    },
    onMutate: () => {
      toast.loading("Please wait, creating movie..", { duration: 12000 });
    },
    onSuccess: () => {
      toast.dismiss();
      toast.success("🎬 Movie Created Successfully");
    },
    onError: (error) => {
      toast.dismiss();
      toast.error(error?.response?.data?.message || "Something went wrong");
    },
  });
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPosterFile(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const formik = useFormik({
    initialValues: {
      title: "",
      author: "",
      stock: "",
      price: "",
      category: "",
      onSale: false,
      description: "",
      star: 0,
    },
    validationSchema: Yup.object({
      title: Yup.string().required("Title is required"),
      author: Yup.string().required("Author is required"),
      stock: Yup.number().required("Stock is required").positive(),
      price: Yup.number().required("Price is required").positive(),
      category: Yup.string().required("Category is required"),
      description: Yup.string().required("Description is required"),
      star: Yup.number()
        .min(1, "Rating must be at least 1 star")
        .max(5, "Rating cannot exceed 5 stars")
        .required("Rating is required"),
    }),

    onSubmit: (values, { resetForm }) => {
      if (!posterFile) return alert("Please upload a poster!");

      const formData = new FormData();
      for (const key in values) {
        formData.append(key, values[key]);
      }
      formData.append("bookImage", posterFile);

      addmovie(formData, { onSuccess: () => resetForm() });
    },
  });

  return (
    <>
      <form
        onSubmit={formik.handleSubmit}
        className="bg-gray-800 text-white p-8 mx-auto max-w-4xl rounded-2xl shadow-2xl border border-gray-700"
      >
        <h1 className="text-3xl md:text-4xl mb-4 font-extrabold font-mono bg-linear-to-r from-[#c5814b] to-[#ffb77a] bg-clip-text text-transparent tracking-wide text-center">
          🎬 Create New Movie
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div className="flex flex-col">
            <label
              htmlFor="title"
              className="mb-2 text-sm font-semibold text-gray-300"
            >
              Title
            </label>
            <input
              type="text"
              name="title"
              id="title"
              placeholder="Enter movie title"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.title}
              className="bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-amber-500 transition-all"
            />
            {formik.touched.title && formik.errors.title && (
              <p className="text-red-400 text-sm mt-1">{formik.errors.title}</p>
            )}
          </div>

          <div className="flex flex-col">
            <label
              htmlFor="author"
              className="mb-2 text-sm font-semibold text-gray-300"
            >
              Author
            </label>
            <input
              type="text"
              name="author"
              id="author"
              placeholder="Enter author name"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.author}
              className="bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-amber-500 transition-all"
            />
            {formik.touched.title && formik.errors.title && (
              <p className="text-red-400 text-sm mt-1">{formik.errors.title}</p>
            )}
          </div>

          <div className="flex flex-col">
            <label
              htmlFor="stock"
              className="mb-2 text-sm font-semibold text-gray-300"
            >
              Stock
            </label>
            <input
              type="number"
              name="stock"
              id="stock"
              placeholder="Available stock"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.stock}
              className="bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-amber-500 transition-all"
            />
            {formik.touched.title && formik.errors.title && (
              <p className="text-red-400 text-sm mt-1">{formik.errors.title}</p>
            )}
          </div>

          <div className="flex flex-col">
            <label
              htmlFor="price"
              className="mb-2 text-sm font-semibold text-gray-300"
            >
              Price ($)
            </label>
            <input
              type="number"
              name="price"
              id="price"
              placeholder="Enter price"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.price}
              className="bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-amber-500 transition-all"
            />
            {formik.touched.title && formik.errors.title && (
              <p className="text-red-400 text-sm mt-1">{formik.errors.title}</p>
            )}
          </div>

          <div className="flex flex-col md:col-span-1">
            <label className="mb-2 text-sm font-semibold text-gray-300">
              Select Category
            </label>

            {catLoading && <p>Loading categories...</p>}

            <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-5 bg-gray-700 p-4 rounded-lg border border-gray-600">
              {categories?.map((cat) => (
                <label
                  key={cat._id}
                  className="flex items-center gap-2 cursor-pointer text-gray-200"
                >
                  <input
                    type="radio"
                    name="category"
                    value={cat._id}
                    checked={formik.values.category === cat._id}
                    onChange={(e) =>
                      formik.setFieldValue("category", e.target.value)
                    }
                    className="accent-amber-500"
                  />
                  {cat.name}
                </label>
              ))}
            </div>

            {formik.touched.category && formik.errors.category && (
              <p className="text-red-400 text-sm mt-1">
                {formik.errors.category}
              </p>
            )}
          </div>

          <div className=" flex flex-col justify-evenly">
            <div className="flex flex-col">
              <label
                htmlFor="onSale"
                className="mb-2 text-sm font-semibold text-gray-300"
              >
                On Sale?
              </label>
              <select
                id="onSale"
                name="onSale"
                onBlur={formik.handleBlur}
                onChange={(e) =>
                  formik.setFieldValue("onSale", e.target.value === "true")
                }
                value={formik.values.onSale ? "true" : "false"}
                className="bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-amber-500 transition-all"
              >
                <option value="true">true</option>
                <option value="false">false</option>
              </select>
              {formik.touched.title && formik.errors.title && (
                <p className="text-red-400 text-sm mt-1">
                  {formik.errors.title}
                </p>
              )}
            </div>

            <div className="flex flex-col mt-3">
              <label className="mb-1 text-sm font-semibold text-gray-300">
                Rating
              </label>

              <div className="flex gap-2 text-2xl cursor-pointer">
                {[1, 2, 3, 4, 5].map((starValue) => (
                  <span
                    key={starValue}
                    onClick={() => formik.setFieldValue("star", starValue)}
                    className={`transition-all ${
                      starValue <= formik.values.star
                        ? "text-yellow-400"
                        : "text-gray-500"
                    } hover:text-yellow-300`}
                  >
                    ★
                  </span>
                ))}
              </div>

              {formik.touched.star && formik.errors.star && (
                <p className="text-red-400 text-sm mt-1">
                  {formik.errors.star}
                </p>
              )}
            </div>
          </div>

          <div className="flex flex-col md:col-span-2">
            <label
              htmlFor="poster"
              className="mb-2 text-sm font-semibold text-gray-300"
            >
              Upload Movie Poster
            </label>
            <input
              type="file"
              id="poster"
              accept="image/*"
              onChange={handleImageChange}
              className="file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0
                       file:text-sm file:font-semibold
                       file:bg-linear-to-r file:from-[#c5814b] file:to-[#ffb77a]
                       file:text-gray-900 hover:file:opacity-90 cursor-pointer
                       bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-amber-500 transition-all"
            />
            {preview && (
              <div className="mt-4 flex justify-center">
                <img
                  src={preview}
                  alt="Poster Preview"
                  className="w-48 h-64 object-cover rounded-lg shadow-lg border border-amber-500 hover:scale-105 transition-transform duration-300"
                />
              </div>
            )}
          </div>

          <div className="flex flex-col md:col-span-2">
            <label
              htmlFor="description"
              className="mb-2 text-sm font-semibold text-gray-300"
            >
              Description
            </label>
            <textarea
              name="description"
              id="description"
              rows={4}
              placeholder="Write a short description..."
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.description}
              className="bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-amber-500 transition-all resize-none"
            />
            {formik.touched.title && formik.errors.title && (
              <p className="text-red-400 text-sm mt-1">{formik.errors.title}</p>
            )}
          </div>
        </div>

        <div className="flex justify-center mt-10">
          <button
            type="submit"
            className="px-8 cursor-pointer py-3 bg-linear-to-r from-[#c5814b] to-[#ffb77a] text-gray-900 font-bold rounded-lg shadow-md hover:scale-105 hover:shadow-lg transition-all duration-300"
          >
            Create Movie
          </button>
        </div>
      </form>
    </>
  );
}

export default CreateMovie;
