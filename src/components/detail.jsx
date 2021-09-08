import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { detailHero } from "../utils";
import axios from "axios";

export function Detail() {
  const { id } = useParams();
  const [detail, setDetail] = useState("");

  const detailHero = (id) => {
    axios
      .get(`https://www.superheroapi.com/api.php/10221366481211546/${id}`)
      .then((response) => setDetail(response));
  };

  useEffect(() => {
    detailHero(id);
    return () => {
      setDetail("");
    };
  }, []);

  return detail?.data?.name ? (
    <div>

    <div>{detail.data.name}</div>
    <Link to="/home">Home</Link>
    </div>
  ) : (
    <div>cargando</div>
  );
}
