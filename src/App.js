import "./App.css";

function App() {
  console.log(
    "process.env.REACT_APP_SUBSCRIPTION_KEY",
    process.env.REACT_APP_SUBSCRIPTION_KEY,
  );
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
        value="https://www.petmd.com/sites/default/files/petmd-cat-happy-10.jpg"
      />
      <button id="thisButton">分析圖片</button>
      <br />
      <br />
      <div id="wrapper" style={{ width: 1020, display: "table" }}>
        <div id="jsonOutput" style={{ width: 600, display: "table-cell" }}>
          Response:
          <br />
          <br />
          <textarea
            id="responseTextArea"
            className="UIInput"
            style={{ width: 580, height: 400 }}
          ></textarea>
        </div>
        <div id="imageDiv" style={{ width: 420, display: "table-cell" }}>
          Source image:
          <br />
          <br />
          <img id="sourceImage" width="400" alt={""} />
          <p id="picDescription"></p>
        </div>
      </div>
      <br />
      <br />
    </div>
  );
}

export default App;
