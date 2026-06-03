import { useFormik } from 'formik';
import useUpdateMovie from '../../Hooks/useUpdateMovie';
import { PropagateLoader } from 'react-spinners';

function MovieCard({ movie }) {
  const updateMovie = useUpdateMovie();
  const formik = useFormik({
    initialValues: {
      price: movie.price,
      onSale: movie.onSale,
      stock: movie.stock,
    },
    onSubmit: (values) => {
      updateMovie.mutate({ id: movie._id, newData: values });
    },
  });

  if (updateMovie.isLoading) {
    return (
      <div className="theme-muted flex h-40 items-center justify-center">
        <PropagateLoader color="#4b7de0" />
      </div>
    );
  }

  return (
    <div className="theme-card flex flex-col items-center p-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl">
      <div className="mb-4 flex w-full justify-center">
        <img
          src={movie.bookImage}
          alt={movie.title}
          className="h-40 w-28 rounded-xl object-cover shadow-lg transition-transform duration-300 hover:scale-105 md:h-44 md:w-32"
        />
      </div>

      <h3 className="text-mdl mb-3 line-clamp-1 truncate text-center font-semibold text-accent">
        {movie.title}
      </h3>

      <form className="w-full space-y-3" onSubmit={formik.handleSubmit}>
        <div className="flex flex-col">
          <label className="theme-label mb-1">Price ($)</label>
          <input
            type="number"
            name="price"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            step="0.01"
            placeholder={movie.price}
            value={formik.values.price}
            className="theme-input"
          />
        </div>
        <div className="flex flex-col">
          <label className="theme-label mb-1">Stock</label>
          <input
            type="number"
            name="stock"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            placeholder={movie.stock}
            value={formik.values.stock}
            className="theme-input"
          />
        </div>

        <div className="flex flex-col">
          <label className="theme-label mb-1">On Sale</label>
          <select
            name="onSale"
            value={formik.values.onSale ? "true" : "false"}
            onChange={(e) =>
              formik.setFieldValue("onSale", e.target.value === "true")
            }
            onBlur={formik.handleBlur}
            className="theme-input"
          >
            <option value="true">Yes</option>
            <option value="false">No</option>
          </select>
        </div>

        <button
          type="submit"
          className="w-full cursor-pointer rounded-xl bg-amber-600 py-2 font-medium text-white shadow-md transition-all duration-300 hover:bg-amber-700 hover:shadow-lg"
        >
          Update Movie
        </button>
      </form>
    </div>
  );
}

export default MovieCard;
