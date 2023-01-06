import Image from "next/image";
import { HomeContainer, HomeProduct } from "../styles/pages/home";

// import camiseta01 from "../assets/img01.png";
import camiseta02 from "../assets/img02.png";
import camiseta03 from "../assets/img03.png";
// import camiseta04 from "../assets/img04.png";
// import camiseta05 from "../assets/img05.png";

export default function Home() {
  return (
    <>
      <HomeContainer>
        <HomeProduct>
          <Image src={camiseta02} alt="camiseta01" width={520} height={480} />
          <footer>
            <strong>Camiseta X</strong>
            <span>R$ 79,90</span>
          </footer>
        </HomeProduct>

        <HomeProduct>
          <Image src={camiseta03} alt="camiseta01" width={520} height={480} />
          <footer>
            <strong>Camiseta X</strong>
            <span>R$ 79,90</span>
          </footer>
        </HomeProduct>
      </HomeContainer>
    </>
  );
}
