import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";

import "./App.css";
import Timer from "./features/timer/Timer";

function App() {
  const [cards, setCards] = useState([uuidv4()]);

  function addCard() {
    return setCards([...cards, uuidv4()]);
  }

  return (
    <div className="App">
      <header>
        <h1>Lawyer Timer</h1>
      </header>
      <main>
        {cards.map((card) => (
          <Timer uuid={card} key={card}></Timer>
        ))}
        <article>
          <button onClick={addCard}>Add</button>
        </article>
      </main>
    </div>
  );
}

export default App;
