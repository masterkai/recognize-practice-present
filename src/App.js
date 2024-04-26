import "./App.css";
import { useRef, useState } from "react";
import axios from "axios";

const initialImageURL =
  "https://pbs.twimg.com/media/GMFg3ncaAAEDUeq?format=jpg&name=small";

function App() {
  const url = "https://eastus.api.cognitive.microsoft.com/";
  const uriBase = url + "vision/v2.1/analyze";
  const params = {
    visualFeatures: "Categories,Description,Color",
    details: "",
    language: "en",
  };
  const headers = {
    "Content-Type": "application/json",
    "Ocp-Apim-Subscription-Key": process.env.REACT_APP_SUBSCRIPTION_KEY,
  };
  const inputRef = useRef(null);
  const [imgURL, setImageURL] = useState(initialImageURL);
  const [captions, setCaptions] = useState([]);
  const [responseData, setResponseData] = useState("");

  const handleProcessImage = () => {
    console.log(imgURL);
    setImageURL(inputRef.current.value);
    processImage().then((r) => {
      console.log(r);
      setResponseData(JSON.stringify(r, null, 2));
      setCaptions(r.description?.captions);
    });
  };

  async function processImage() {
    const requestBody = { url: imgURL };
    const res = await axios.post(uriBase, requestBody, { params, headers });
    return res.data;
  }

  return (
    <div className="App">
      <h1>Analyze image:</h1>
      輸入一個圖片網址，然後按下 <strong>分析圖片</strong> 按鈕.
      <br />
      <br />
      Image to analyze:
      <input
        type="text"
        name="inputImage"
        id="inputImage"
        ref={inputRef}
        value={imgURL}
        onChange={(e) => setImageURL(e.target.value)}
      />
      <button onClick={handleProcessImage}>分析圖片</button>
      <br />
      <br />
      <div
        id="wrapper"
        style={{
          width: 1020,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          margin: "0 auto",
        }}
      >
        <div id="jsonOutput" style={{ width: 600, display: "table-cell" }}>
          Response:
          <br />
          <br />
          <textarea
            id="responseTextArea"
            className="UIInput"
            style={{ width: 580, height: 400 }}
            value={responseData}
          ></textarea>
        </div>
        <div id="imageDiv" style={{ width: 420, display: "table-cell" }}>
          Source image:
          <br />
          <br />
          <img id="sourceImage" width="400" alt={""} src={imgURL} />
          <div>
            {captions.map((o) => (
              <p>{o.text}</p>
            ))}
          </div>
        </div>
      </div>
      <br />
      <br />
    </div>
  );
}

export default App;
