import Marquee from "react-fast-marquee";
import netflix from "../../assets/images/netflix.jpg";
import prime from "../../assets/images/prime.png";
import disney from "../../assets/images/disney.jpg";
import youtube from "../../assets/images/youtube.jpg";
import apple from "../../assets/images/apple.jpg";
import LazyImage from "../common/LazyImage";

const images = [netflix, prime, disney, apple, youtube];

function Tvs() {
  return (
    <div className="mx-auto mt-5 w-full rounded-xl border border-border bg-surface py-4">
      <Marquee speed={150} gradient={false} autoFill={true}>
        {images.map((src, i) => (
          <div key={i} className="mx-1 h-16 rounded-xl shadow-lg md:h-32">
            <LazyImage
              src={src}
              className="h-full w-full rounded-xl object-cover"
              alt={`logo-${i}`}
            />
          </div>
        ))}
      </Marquee>
    </div>
  );
}

export default Tvs;
