import React from "react";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom"
const style = {
  diplay: "flex",
  justifyContent: "center",
  placeContent: "center",
  width: "100%",
  height: "60vh",
};

const textStyle = {
  fontSize: "1.5rem",
  fontFamily: "Roboto",
  color: "white",
  marginTop: "30vh",
  fontWeight: "400",
};

export const NotFound = () => {
  return (
    <div style={style}>
      <h1 style={textStyle}>Invalid Link</h1>
      <Link to="/">
      <Button variant="primary">Return home</Button>
      </Link>
    </div>
  );
};
