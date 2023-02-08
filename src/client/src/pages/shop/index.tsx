import axios from "axios";
import { useEffect, useState } from "react";
import { config } from "../../config";
import { KitInterface, RangoInterface } from "../../interfaces/@types.users";
import ItemCard from "./ItemCard";
import "../styles/css/shop.css";
import { Fade } from "react-awesome-reveal";
export const Shop = () => {
  const [rangos, setRangos] = useState<RangoInterface[]>([]);
  const [kits, setKits] = useState<KitInterface[]>([]);

  useEffect(() => {
    const fetchRangos = async () => {
      const { data } = await axios.get(`${config.DOMAIN}/rangos`);
      setRangos(data.rangos);
    };
    const fetchKits = async () => {
      const { data } = await axios.get(`${config.DOMAIN}/kits`);
      setKits(data.kits);
    };
    fetchRangos();
    fetchKits();
  }, []);

  return (
    <div className="shop-container">
      <div className="shop-container-titles">
        <h1>Guater Shop</h1>
      </div>
      <div className="shop-container-items">
        <h2>Rangos</h2>
        <div className="items-container">
          <Fade direction="up" cascade={true} damping={0.5} triggerOnce={true}>
            {rangos.map((rango) => (
              <ItemCard rango={rango} tipo="rango" />
            ))}
          </Fade>
        </div>
      </div>
      <div className="shop-container-items">
        <h2>Kits</h2>
        <div className="items-container">
          <Fade direction="up" cascade={true} damping={0.5} triggerOnce={true}>
            {kits.map((kit) => (
              <ItemCard rango={kit} tipo="kit" />
            ))}
          </Fade>
        </div>
      </div>
    </div>
  );
};
