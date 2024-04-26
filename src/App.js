import "./App.css";
import {useRef, useState} from "react";
import axios from "axios";

const initialImageURL =
    "https://pbs.twimg.com/media/GMFg3ncaAAEDUeq?format=jpg&name=small";

function App() {
    const dic = [
        {lang: "繁體中文", code: "zh-Hant"},
        {lang: "簡體中文", code: "zh-Hans"},
        {lang: "粵語 (繁體中文)", code: "yue"},
        {lang: "印度文", code: "hi"},
        {lang: "韓文", code: "ko"},
        {lang: "毛利文", code: "mi"},
        {lang: "泰文", code: "th"},
        {lang: "日文", code: "ja"},
        {lang: "藏文", code: "bo"},
        {lang: "文言文", code: "lzh"},
    ];
    const dicSource = dic.map((d) => [d.code, d.lang]);
    const dicMap = new Map(dicSource);
    const displayName = new Intl.DisplayNames(["zh-Hant"], {
        type: "language",
    });
    const inputRef = useRef(null);
    const [imgURL, setImageURL] = useState(initialImageURL);
    const [caption, setCaption] = useState("");
    const [responseData, setResponseData] = useState("");
    const [denseCaptionsResults, setDenseCaptionsResults] = useState([]);
    const [translations, setTranslations] = useState([]);

    const handleProcessImage = () => {
        console.log(imgURL);
        setImageURL(inputRef.current.value);
        processImage().then((r) => {
            console.log(r);
            setResponseData(JSON.stringify(r, null, 2));
            setCaption(r.captionResult?.text);
            setDenseCaptionsResults(r.denseCaptionsResult.values);
        });
    };

    async function processImage() {
        const url = "https://eastus.api.cognitive.microsoft.com/";
        // const uriBase = url + "vision/v2.1/analyze";
        const uriBase = url + "computervision/imageanalysis:analyze";
        const params = {
            // visualFeatures: "Categories,Description,Color",
            // details: "",
            // language: "en",
            details: "Landmarks",
            "api-version": "2023-10-01",
            language: "en",
            features: "tags,read,caption,denseCaptions,smartCrops,objects,people",
        };
        const headers = {
            "Content-Type": "application/json",
            "Ocp-Apim-Subscription-Key": process.env.REACT_APP_SUBSCRIPTION_KEY,
        };
        const requestBody = {url: imgURL};
        const res = await axios.post(uriBase, requestBody, {params, headers});
        return res.data;
    }

    async function processTranslate() {
        console.log(
            "REACT_APP_TRANSLATOR_KEY",
            process.env.REACT_APP_TRANSLATOR_KEY,
        );

        const uriBase = "https://api.cognitive.microsofttranslator.com/translate";
        const params = {
            "api-version": "3.0",
            // from: "lzh",
            to: "zh-Hant,zh-Hans,yue,hi,ko,mi,th,ja,bo,lzh",
        };
        const headers = {
            "Content-Type": "application/json",
            "Ocp-Apim-Subscription-Key": process.env.REACT_APP_TRANSLATOR_KEY,
            "Ocp-Apim-Subscription-Region": "uksouth",
        };
        //取得要翻譯的文字
        const requestBody = [{Text: caption}];

        //送出分析
        const res = await axios.post(uriBase, requestBody, {params, headers});
        console.log(res.data);
        setTranslations(res.data[0].translations);
    }

    return (
        <div className="App">
            <h1>Analyze image:</h1>
            輸入一個圖片網址，然後按下 <strong>分析圖片</strong> 按鈕.
            <br/>
            <br/>
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
            <br/>
            <br/>
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
                <div id="jsonOutput" style={{width: 600, display: "table-cell"}}>
                    Response:
                    <br/>
                    <br/>
                    <textarea
                        id="responseTextArea"
                        className="UIInput"
                        style={{width: 580, height: 400}}
                        value={responseData}
                    ></textarea>
                </div>
                <div id="imageDiv" style={{width: 420, display: "table-cell"}}>
                    Source image:
                    <br/>
                    <br/>
                    <img id="sourceImage" width="400" alt={""} src={imgURL}/>
                    <div>{caption}</div>
                    <br/>
                    {caption ? (
                        <button onClick={processTranslate}>translate the caption</button>
                    ) : null}
                    <br/>
                    <div>
                        {translations?.map((o, idx) => (
                            <p key={idx}>
                                {displayName.of(o?.to)} - <b>{dicMap.get(o?.to)}</b> - {o?.text}
                            </p>
                        ))}
                    </div>
                    {denseCaptionsResults ? <h1>Dense Captions Results</h1> : null}
                    <div>
                        {denseCaptionsResults?.map((o, idx) => (
                            <p key={idx}>{o.text}</p>
                        ))}
                    </div>
                </div>
            </div>
            <br/>
            <br/>
        </div>
    );
}

export default App;
