import {
  ProductContainer,
  ProductDetails,
  ProductImageContainer,
} from "../../styles/pages/product";

import { GetStaticPaths, GetStaticProps } from "next";
import Image from "next/image";
import Stripe from "stripe";
import { stripe } from "../../lib/stripe";

interface ProductProps {
  product: {
    id: string;
    name: string;
    description: string;
    imagesUrl: string;
    price: string;
  };
}

export default function Product({ product }: ProductProps) {
  return (
    <ProductContainer>
      <ProductImageContainer>
        <Image src={product.imagesUrl} alt={product.name} />
      </ProductImageContainer>

      <ProductDetails>
        <h1>{product.name}</h1>

        <span>{product.price}</span>

        <p>{product.description}</p>
        <button>Comprar agora</button>
      </ProductDetails>
    </ProductContainer>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps<any, { id: string }> = async ({
  params,
}) => {
  const productId = params.id;

  const product = await stripe.products.retrieve(productId, {
    expand: ["default_price"],
  });

  const price = product.default_price as Stripe.Price;

  return {
    props: {
      product: {
        id: product.id,
        name: product.name,
        description: product.description,
        imagesUrl: product.images[0],
        price: new Intl.NumberFormat("pt-BR", {
          style: "currency",
          currency: "BRL",
        }).format(price.unit_amount / 100),
      },
    },
    revalidate: 60 * 60 * 24, // 24 hours
  };
};
