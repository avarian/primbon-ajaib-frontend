import { useState } from "react";
import "./App.css";
import Login from "./Login";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <main className="App">
        <Login />
      </main>
    </>
  );
}

export default App;
