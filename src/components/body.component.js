import Container from "react-bootstrap/Container";
/*className="Content mt-3"*/
export default function Body({ children }) {
  return (
    <Container className='mt-3' style={{ height: "100%" }}>
      {children}
    </Container>
  );
}
