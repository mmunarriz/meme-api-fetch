import React, { useState, useEffect } from "react";
import "../App.css";
import html2canvas from "html2canvas";

function Memes() {
  const [pictures, setPictures] = useState([]);

  useEffect(() => {
    var requestOptions = {
      method: "GET",
      redirect: "follow",
    };
    fetch("https://api.imgflip.com/get_memes", requestOptions)
      .then((data) => data.json())
      .then((json) => setPictures(json.data.memes));
  }, []);

  console.log(pictures);

  const [linea1, setLinea1] = useState("");
  const [imagen, setImagen] = useState("https://i.imgflip.com/30b1gx.jpg");

  const onChangeLinea1 = function (e) {
    setLinea1(e.target.value);
  };

  const onChangeImagen = function (e) {
    setImagen(e.target.value);
  };

  const onClickExportar = function () {
    alert("exportar");

    html2canvas(document.querySelector("#meme"), { allowTaint: true, useCORS: true})
    .then((canvas) => {
      var img = canvas.toDataURL("image/png");
      var link = document.createElement("a");
      link.download = "meme.jpg";
      link.href = img;
      link.click();
    });
  };

  return (
    <div className="App">
      <select onChange={onChangeImagen}>
        {pictures.map((picture) => (
          <option value={picture.url}> {picture.name} </option>
        ))}
      </select>
      <br />
      <input
        onChange={onChangeLinea1}
        type="text"
        placeholder="Escribir algo"
      />
      <br />
      <button onClick={onClickExportar}> Exportar </button>
      <div className="meme" id="meme">
        <span> {linea1} </span>
        <img style={{ width: "350px" }} src={imagen} alt="urls" />
      </div>
    </div>
  );
}

export default Memes;
