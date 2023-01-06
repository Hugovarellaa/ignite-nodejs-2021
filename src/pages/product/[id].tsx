import {
  ProductContainer,
  ProductDetails,
  ProductImageContainer,
} from "../../styles/pages/product";

import Image from "next/image";
import img from "../../assets/img03.png";

export default function Product() {
  return (
    <ProductContainer>
      <ProductImageContainer>
        <Image src={img} alt="camisa" />
      </ProductImageContainer>

      <ProductDetails>
        <h1>Camiseta x</h1>

        <span>R$ 79,90</span>

        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut iste ipsam
          sed non sapiente, incidunt nulla quia unde est. Doloremque distinctio
          cum, alias beatae provident placeat ad asperiores vel enim.
        </p>
        <button>Comprar agora</button>
      </ProductDetails>
    </ProductContainer>
  );
}
