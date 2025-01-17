/* eslint-disable no-unused-vars */
import { useState } from "react";
import "./App.css";
import MainContent from "./components/MainContent";
import { Container } from "@mui/material";

function App() {
  const [count, setCount] = useState(0);
// Mohamed ghanem and gamal
  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          width: "100vw",
          margin: "0",
        }}
      >
        <Container maxWidth="lg">
          <MainContent />
        </Container>
      </div>
    </>
  );
}

export default App;
