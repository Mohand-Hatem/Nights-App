import { useEffect, useState } from "react";
import Slider from "react-slick";
import { motion } from "framer-motion";
import oneSlider from "../../assets/images/1.jpg";
import twoSlider from "../../assets/images/2.jpg";
import threeSlider from "../../assets/images/3.png";
import fourSlider from "../../assets/images/4.jpg";
import fiveSlider from "../../assets/images/5.jpg";
import sixSlider from "../../assets/images/6.jpg";
import sevenSlider from "../../assets/images/7.jpg";
import eightSlider from "../../assets/images/8.jpg";
import nineSlider from "../../assets/images/9.jpg";
import tenlider from "../../assets/images/10.jpg";
import elevenSlider from "../../assets/images/11.jpg";
import twelveSlider from "../../assets/images/12.jpg";
import thirteenSlider from "../../assets/images/13.png";

const sliderImages = [
  oneSlider,
  twoSlider,
  threeSlider,
  fourSlider,
  fiveSlider,
  sixSlider,
  sevenSlider,
  eightSlider,
  nineSlider,
  tenlider,
  elevenSlider,
  twelveSlider,
  thirteenSlider,
];
const sentences = [
  "The Home Movies",
  "Your Next Adventure Awaits",
  "Stories That Inspire",
  "Cinema That Lives Forever",
];

function HomeSlider() {
  const [index, setIndex] = useState(0);
  const text = sentences[index];

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % sentences.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const textVariants = {
    hidden: { opacity: 0, y: 40, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.7, ease: "easeOut" },
    },
    exit: {
      opacity: 0,
      y: -40,
      scale: 0.95,
      transition: { duration: 0.5, ease: "easeIn" },
    },
  };

  const [initialSlide] = useState(() =>
    Math.floor(Math.random() * sliderImages.length)
  );
  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3500,
    speed: 1000,
    arrows: false,
    fade: true,
    cssEase: "ease-in-out",
    pauseOnHover: false,
    initialSlide: initialSlide,
  };

  return (
    <div className="relative w-[96%]  md:w-full mx-auto mt-18 overflow-hidden rounded-4xl shadow-2xl transition-all duration-500">
      <Slider {...settings}>
        {sliderImages.map((img, index) => (
          <div key={index} className="relative w-full h-[30vh] sm:h-[85vh]">
            <img
              src={img}
              alt={`Slide ${index + 1}`}
              className="w-full h-full md:h-full object-cover object-center transition-transform duration-700 ease-in-out hover:scale-105"
            />

            <div className="absolute inset-0 bg-black/60"></div>

            <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
              <div className="flex justify-center items-center min-h-[120px] relative">
                <motion.div
                  key={text}
                  variants={textVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  className="relative px-10 py-5 rounded-3xl backdrop-blur-xs bg-white/5 border border-white/10 shadow-xl"
                >
                  <motion.h1
                    className="text-xl md:text-6xl font-extrabold tracking-wide text-center
          bg-linear-to-r from-[#c5814b] via-[#ffb77a] to-[#c5814b]
          bg-clip-text text-transparent drop-shadow-[0_3px_10px_rgba(0,0,0,0.5)]
          animate-gradient-move glow-text"
                  >
                    {text.split("").map((char, i) => (
                      <motion.span
                        key={i}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.03 }}
                      >
                        {char}
                      </motion.span>
                    ))}
                  </motion.h1>
                </motion.div>
              </div>
              <p
                className="text-lg md:text-2xl font-senibold 
                bg-linear-to-r from-gray-300 via-gray-400 to-gray-200 
                bg-clip-text text-transparent drop-shadow-md delay-300"
              >
                where all you find
              </p>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
}

export default HomeSlider;
