import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import { motion } from 'framer-motion';
import { PropagateLoader } from 'react-spinners';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import useNews from '../../Hooks/useNews';
import LazyImage from '../common/LazyImage';

function News() {
  const { data: upcoming, isLoading } = useNews();

  if (isLoading)
    return (
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        className="theme-muted flex h-screen items-center justify-center text-lg"
      >
        <PropagateLoader color="#4b7de0" />
      </motion.div>
    );

  return (
    <div className="theme-section relative -mb-20 mx-auto w-full py-20 xl:right-[5%] xl:w-[110%]">
      <div className="mx-auto max-w-4xl px-6 md:max-w-6xl">
        <div className="relative mb-12">
          <h1 className="theme-heading py-5 text-3xl md:text-5xl">Up-Comming</h1>
          <span className="absolute -bottom-3 left-0 h-[3px] w-1/3 rounded-full bg-accent md:w-1/7" />
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
          className="h-[500px] pb-20"
        >
          {upcoming?.map((item) => (
            <SwiperSlide key={item.id}>
              <div className="theme-news-card group hover:-translate-y-2">
                <div className="overflow-hidden rounded-2xl">
                  <LazyImage
                    src={`https://image.tmdb.org/t/p/w500/${item.poster_path}`}
                    alt={item.original_title}
                    className="h-64 w-full rounded-2xl object-cover object-center transition-all duration-700 group-hover:scale-110"
                  />
                </div>

                <div className="mt-5">
                  <h2 className="mb-2 line-clamp-1 text-xl font-bold text-foreground">
                    {item.original_title}
                  </h2>

                  <p className="theme-muted line-clamp-2 text-sm leading-relaxed">
                    {item.overview}
                  </p>

                  <div className="mt-4 flex items-center justify-between">
                    <span className="font-bold text-yellow-600">
                      ⭐ {item.vote_average}
                    </span>
                    <span className="theme-muted text-sm">{item.release_date}</span>
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
