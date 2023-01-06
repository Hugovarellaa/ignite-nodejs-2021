import "keen-slider/keen-slider.min.css";
import { useKeenSlider } from "keen-slider/react";
import Image from "next/image";
import { HomeContainer, HomeProduct } from "../styles/pages/home";

import {
  default as camiseta01,
  default as camiseta02,
} from "../assets/img02.png";
import camiseta03 from "../assets/img03.png";
import {
  default as camiseta04,
  default as camiseta05,
} from "../assets/img04.png";

export default function Home() {
  const [sliderRef] = useKeenSlider({
    slides: {
      perView: 3,
      spacing: 48,
    },
  });

  return (
    <>
      <HomeContainer ref={sliderRef} className="keen-slider">
        <HomeProduct className="keen-slider__slide">
          <Image src={camiseta01} alt="camiseta01" width={520} height={480} />
          <footer>
            <strong>Camiseta X</strong>
            <span>R$ 79,90</span>
          </footer>
        </HomeProduct>

        <HomeProduct className="keen-slider__slide">
          <Image src={camiseta02} alt="camiseta01" width={520} height={480} />
          <footer>
            <strong>Camiseta X</strong>
            <span>R$ 79,90</span>
          </footer>
        </HomeProduct>
        <HomeProduct className="keen-slider__slide">
          <Image src={camiseta03} alt="camiseta01" width={520} height={480} />
          <footer>
            <strong>Camiseta X</strong>
            <span>R$ 79,90</span>
          </footer>
        </HomeProduct>

        <HomeProduct className="keen-slider__slide">
          <Image src={camiseta04} alt="camiseta01" width={520} height={480} />
          <footer>
            <strong>Camiseta X</strong>
            <span>R$ 79,90</span>
          </footer>
        </HomeProduct>

        <HomeProduct className="keen-slider__slide">
          <Image src={camiseta05} alt="camiseta01" width={520} height={480} />
          <footer>
            <strong>Camiseta X</strong>
            <span>R$ 79,90</span>
          </footer>
        </HomeProduct>
      </HomeContainer>
    </>
  );
}
