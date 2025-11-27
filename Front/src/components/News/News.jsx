import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

function News() {
  const { data: upcoming, isLoading } = useQuery({
    queryKey: ["news"],
    queryFn: async () => {
      const res = await axios.get(
        "https://api.themoviedb.org/3/movie/upcoming?api_key=e776029a0090458349a40650701fda97"
      );
      return res?.data?.results;
    },
  });

  if (isLoading)
    return (
      <h1 className="text-center text-white text-3xl mt-10">Loading...</h1>
    );

  return (
    <div className="mx-auto w-full  lg:w-[110%] relative lg:-left-[5%] -mb-20 bg-gray-950 py-20">
      <div className="max-w-4xl md:max-w-6xl mx-auto px-6">
        <div className="relative mb-12 ">
          <h1 className="text-3xl md:text-5xl py-5 font-extrabold bg-linear-to-r from-[#c5814b] to-[#ffb77a] bg-clip-text text-transparent">
            Up-Comming
          </h1>
          <span className="absolute left-0 -bottom-3 md:w-1/7 w-1/3  h-[3px] rounded-full bg-linear-to-r from-[#c5814b] to-[#ffb77a]"></span>
        </div>

        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          spaceBetween={25}
          pagination={{ clickable: true }}
          autoplay={{ delay: 2500 }}
          loop={true}
          speed={500}
          breakpoints={{
            320: { slidesPerView: 1 },
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
            1250: { slidesPerView: 4 },
          }}
          className="pb-20 h-[500px] "
        >
          {upcoming?.map((item) => (
            <SwiperSlide key={item.id}>
              <div
                className="group backdrop-blur-xl cursor-grabbing bg-white/10 border border-white/20 p-5 rounded-3xl shadow-lg 
              transition-all duration-500 transform hover:-translate-y-2 hover:shadow-2xl 
              hover:border-[#ffb77a]/40 hover:bg-white/20"
              >
                <div className="overflow-hidden rounded-2xl">
                  <img
                    src={`https://image.tmdb.org/t/p/w500/${item.poster_path}`}
                    className="w-full h-64 object-cover object-center rounded-2xl 
                    transition-all duration-700 group-hover:scale-110 group-hover:rotate-1"
                  />
                </div>

                <div className="mt-5">
                  <h2 className="text-xl font-bold text-white mb-2 line-clamp-1">
                    {item.original_title}
                  </h2>

                  <p className="text-gray-300 text-sm line-clamp-2 leading-relaxed">
                    {item.overview}
                  </p>

                  <div className="mt-4 flex items-center justify-between">
                    <span className="text-yellow-400 font-bold">
                      ⭐ {item.vote_average}
                    </span>
                    <span className="text-gray-400 text-sm">
                      {item.release_date}
                    </span>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}

export default News;
