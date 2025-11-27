import Marquee from "react-fast-marquee";
import netflix from "../../assets/images/netflix.jpg";
import prime from "../../assets/images/prime.png";
import disney from "../../assets/images/disney.jpg";
import youtube from "../../assets/images/youtube.jpg";
import apple from "../../assets/images/apple.jpg";

const images = [netflix, prime, disney, apple, youtube];

function Tvs() {
  return (
    <div className=" w-full mx-auto py-4 mt-5 bg-gray-400/30 dark:bg-gray-700/30 rounded-xl border border-gray-300 dark:border-gray-600">
      <Marquee speed={150} gradient={false} autoFill={true}>
        {images.map((src, i) => (
          <div
            key={i}
            className="h-16 md:h-32 mx-1 shadow-lg rounded-xl
          "
          >
            <img
              src={src}
              className="h-full w-full object-cover rounded-xl"
              alt={`logo-${i}`}
            />
          </div>
        ))}
      </Marquee>
    </div>
  );
}

export default Tvs;
