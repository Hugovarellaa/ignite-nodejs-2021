import "keen-slider/keen-slider.min.css";
import { useKeenSlider } from "keen-slider/react";
import Image from "next/image";
import { HomeContainer, HomeProduct } from "../styles/pages/home";

import { GetStaticProps } from "next";
import Stripe from "stripe";
import { stripe } from "../lib/stripe";

interface HomeProps {
  products: {
    id: string;
    name: string;
    description: string;
    imagesUrl: string;
    price: number;
  }[];
}

export default function Home({ products }: HomeProps) {
  const [sliderRef] = useKeenSlider({
    slides: {
      perView: 3,
      spacing: 48,
    },
  });

  return (
    <>
      <HomeContainer ref={sliderRef} className="keen-slider">
        {products.map((product) => (
          <HomeProduct className="keen-slider__slide" key={product.id}>
            <Image
              src={product.imagesUrl}
              alt="camiseta01"
              width={520}
              height={480}
            />
            <footer>
              <strong>{product.name}</strong>
              <span>{product.price}</span>
            </footer>
          </HomeProduct>
        ))}
      </HomeContainer>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const response = await stripe.products.list({
    expand: ["data.default_price"],
  });

  const products = response.data.map((product) => {
    const price = product.default_price as Stripe.Price;
    return {
      id: product.id,
      name: product.name,
      description: product.description,
      imagesUrl: product.images[0],
      price: price.unit_amount! / 100,
    };
  });

  return {
    props: { products },
    revalidate: 60 * 60 * 24,
  };
};
