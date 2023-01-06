import {
  ProductContainer,
  ProductDetails,
  ProductImageContainer,
} from "../../styles/pages/product";

import axios from "axios";
import { GetStaticPaths, GetStaticProps } from "next";
import Head from "next/head";
import Image from "next/image";
import { useState } from "react";
import Stripe from "stripe";
import { stripe } from "../../lib/stripe";

interface ProductProps {
  product: {
    id: string;
    name: string;
    description: string;
    imagesUrl: string;
    price: string;
    defaultPrice: string;
  };
}

export default function Product({ product }: ProductProps) {
  const [isCreatingCheckoutSession, setIsCreatingCheckoutSession] =
    useState(false);

  async function handleByProduct() {
    try {
      setIsCreatingCheckoutSession(true);
      const response = await axios.post("/api/checkout", {
        priceId: product.defaultPrice,
      });

      const { checkoutUrl } = response.data;

      window.location.href = checkoutUrl;
    } catch (err) {
      alert("Falha ao redirecionar ao checkout!");
      // Conectar com uma ferramenta de observabilidade (Datadog / Sentry)
      console.log(err);
      setIsCreatingCheckoutSession(false);
    }
  }

  return (
    <>
      <Head>
        <title>{product.name} | Ignite Shop</title>
      </Head>

      <ProductContainer>
        <ProductImageContainer>
          <Image
            src={product.imagesUrl}
            alt={product.name}
            width={520}
            height={480}
          />
        </ProductImageContainer>

        <ProductDetails>
          <h1>{product.name}</h1>

          <span>{product.price}</span>

          <p>{product.description}</p>
          <button
            onClick={handleByProduct}
            disabled={isCreatingCheckoutSession}
          >
            Comprar agora
          </button>
        </ProductDetails>
      </ProductContainer>
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: "blocking", // -> Deixa a tela em branco ate ela carregar                ** Menos usado **
    // fallback: true,   -> parar cria o Skeleton componential com o estado de loading ** Mais usado **
    // fallback: false , -> So carregar as paginas que foi builded nos paths
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
        defaultPrice: price.id,
      },
    },
    revalidate: 60 * 60 * 24, // 24 hours
  };
};
