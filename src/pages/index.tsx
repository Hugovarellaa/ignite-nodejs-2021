import { styled } from "../styles";

const Button = styled("button", {
  display: "inline-block",
  border: "none",
  padding: "0.5rem 1rem",
  borderRadius: "0.25rem",
  fontSize: "0.875rem",
  fontWeight: "bold",
  backgroundColor: "$gree300",
  color: "$white",
});

export default function Home() {
  return (
    <>
      <main>
        <Button>Adicionar</Button>
      </main>
    </>
  );
}
