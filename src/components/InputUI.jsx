import React from "react";
import { styled } from "@mui/material/styles";
import { Box, Button, TextField, Typography } from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

const InputUI = (props) => {
  const {
    inputRef,
    imgURL,
    setImageURL,
    handleProcessImage,
    handleProcessImageFile,
  } = props;
  const VisuallyHiddenInput = styled("input")({
    clip: "rect(0 0 0 0)",
    clipPath: "inset(50%)",
    height: 1,
    overflow: "hidden",
    position: "absolute",
    bottom: 0,
    left: 0,
    whiteSpace: "nowrap",
    width: 1,
  });
  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        margin: "0 auto",
      }}
    >
      <h1>Analyze image:</h1>
      輸入一個圖片網址，然後按下 <strong>分析圖片</strong> 按鈕.
      <br />
      <br />
      <Typography mb={1} children={"Image to analyze:"} />
      <Box
        component="form"
        sx={{
          "& > :not(style)": { m: 1, width: "25ch" },
        }}
        noValidate
        autoComplete="off"
      >
        <TextField
          type={"text"}
          ref={inputRef}
          value={imgURL}
          id="outlined-basic"
          label=""
          variant="outlined"
          onChange={(e) => setImageURL(e.target.value)}
        />
      </Box>
      <Button variant="outlined" onClick={handleProcessImage}>
        分析圖片
      </Button>
      <br />
      <br />
      <Button
        component="label"
        role={undefined}
        variant="contained"
        tabIndex={-1}
        startIcon={<CloudUploadIcon />}
      >
        Upload file
        <VisuallyHiddenInput
          type="file"
          onChange={(e) => handleProcessImageFile(e.target.files[0])}
          accept={"image/*"}
        />
      </Button>
      <br />
      <br />
    </div>
  );
};

export default InputUI;
