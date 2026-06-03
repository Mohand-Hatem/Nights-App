import { FaShoppingCart, FaStar } from 'react-icons/fa';
import LazyImage from '../common/LazyImage';

function TrendingMovieCard({ movie, onOpen, onAddToCart }) {
  const handleAddClick = (e) => {
    e.stopPropagation();
    onAddToCart(movie._id);
  };

  const inStock = movie.stock == null || movie.stock > 0;

  return (
    <article
      onClick={() => onOpen(movie._id)}
      className="trending-card group flex h-full cursor-pointer flex-col overflow-hidden rounded-xl border transition-all duration-300 hover:-translate-y-0.5"
    >
      <div className="relative aspect-3/4 overflow-hidden bg-surface-muted">
        <LazyImage
          src={movie.bookImage}
          alt={movie.title}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-black/60 via-black/10 to-transparent" />

        {movie.star && (
          <span className="absolute left-3 top-3 flex items-center gap-1 rounded-md border border-white/10 bg-black/60 px-2 py-1 text-xs font-medium text-white backdrop-blur-sm">
            <FaStar className="text-amber-400" size={10} />
            {movie.star}
          </span>
        )}

        {movie.onSale && (
          <span className="trending-sale absolute right-3 top-3 rounded-md px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider">
            Sale
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col bg-card p-4 md:p-5">
        <h3 className="line-clamp-1 text-base font-semibold text-foreground md:text-lg">
          {movie.title}
        </h3>
        <p className="mt-1 text-xs font-medium uppercase tracking-wide text-muted">
          {movie.author}
        </p>
        <p className="mt-2 line-clamp-2 flex-1 text-sm leading-relaxed text-muted">
          {movie.description}
        </p>

        <div className="mt-4 flex items-end justify-between gap-3 border-t border-border pt-4">
          <div>
            <p className="text-[10px] font-medium uppercase tracking-wider text-muted">
              Price
            </p>
            <p className="text-lg font-bold text-foreground">
              {movie.price}
              <span className="ml-1 text-xs font-normal text-muted">EGP</span>
            </p>
            {movie.stock != null && (
              <p
                className={`mt-0.5 text-xs ${inStock ? 'text-muted' : 'text-red-600 dark:text-red-400'}`}
              >
                {inStock ? `${movie.stock} in stock` : 'Out of stock'}
              </p>
            )}
          </div>

          <button
            type="button"
            onClick={handleAddClick}
            className="trending-btn flex shrink-0 items-center gap-1.5"
          >
            <FaShoppingCart size={12} />
            <span className="hidden sm:inline">Add</span>
          </button>
        </div>
      </div>
    </article>
  );
}

export default TrendingMovieCard;
