import React from "react";
import { useState } from "react";

const App = () => {
  const [prompt, setPrompt] = useState("");

  return (
    <div className="App">
      <div className="container">
        <div className="text">
          <h2>Generate an Image using Open AI API</h2>
        </div>
          <div className="input">
              <textarea placeholder="let's generate image..." />
          </div>
          <div className="button">
            <button>Generate</button>
          </div>
      </div>
    </div>
  );
};

export default App;
