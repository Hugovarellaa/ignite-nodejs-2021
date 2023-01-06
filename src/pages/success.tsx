import Link from "next/link";
import { ImageContainer, SuccessContainer } from "../styles/pages/success";

export default function Success() {
  return (
    <SuccessContainer>
      <h1>Compra efetuada</h1>
      <ImageContainer>
        <img src="" alt="" />
      </ImageContainer>

      <p>
        Uhuul <strong>Diego Fernandes</strong>, sua{" "}
        <strong>Camiseta Beyond the Limits</strong>
        já está a caminho da sua casa.{" "}
      </p>

      <Link href="/">
        <span>Voltar ao catálogo</span>
      </Link>
    </SuccessContainer>
  );
}
