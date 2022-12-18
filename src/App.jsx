import React from "react";
import { useState } from "react";
import { Configuration, OpenAIApi } from "openai";
import classes from "./App.module.css";
import LoadingSpinner from "./components/LoadingSpinner";

const App = () => {
  const [prompt, setPrompt] = useState("");
  const [result, setResult] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const config = new Configuration({
    apiKey: import.meta.env.VITE_Open_AI_Key,
  });

  const openai = new OpenAIApi(config);

  const textHandler = (e) => {
    e.preventDefault();
    setPrompt(e.target.value);
  };

  const generateImg = async () => {
    setResult("");
    setIsLoading(true);
    setError(null);
    try {
      const res = await openai.createImage({
        prompt: prompt,
        n: 1,
        size: "256x256",
      });
      if (res.status !== 200) {
        throw new Error("Something went wrong!");
      }
      setResult(res.data.data[0].url);
    } catch (error) {
      setError(error.message);
    }
    setIsLoading(false);
  };

  return (
    <div className={classes.app}>
      <div className={classes.container}>
        <h1>Generate an Image using Open AI API</h1>
        <h4>1. Type a wished image! 2. Click GENERATE! 3. Wait results...!</h4>

        <input
          onChange={textHandler}
          placeholder="let's generate image..."
          maxLength="120"
        />

        {!isLoading ? (
          <button onClick={generateImg}>GENERATE</button>
        ) : (
          <LoadingSpinner />
        )}
        <div className={classes.result}>
          {!isLoading && error && <h2>Something went wrong! Try again!</h2>}
          {result.length > 0 && <img src={result} alt={result} />}
        </div>
      </div>
    </div>
  );
};

export default App;
