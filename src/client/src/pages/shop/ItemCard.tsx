import { KitInterface, RangoInterface } from "../../interfaces/@types.users";
import { MouseEvent } from "react";
import { config } from "../../config";
import axios, { AxiosError } from "axios";
import { getError, throwError } from "../lib/GetError";
const ItemCard = ({
  rango,
  tipo,
}: {
  rango: KitInterface | RangoInterface;
  tipo: String;
}) => {
  const handleBuy = async (e: MouseEvent<HTMLDivElement>) => {
    const endpoint = tipo === 'rango' ? `/rangos/purchase/${rango._id}` : `/kits/purchase/${rango._id}`;
    try {
      const { data } = await axios({
        method: 'PUT',
        url: config.DOMAIN + endpoint,
        withCredentials: true
      });
    } catch(e: AxiosError | unknown) {
      return throwError({message: getError(e)})
    }

  };

  return (
    <div className="rango-card">
      <div className="rango-title">
        <h2>{rango.title}</h2>
      </div>
      <div className="rango-price">
        <p>${String(rango.price)}</p>
        <span>al mes</span>
      </div>
      <div className="rango-info">
        {tipo === "rango" ? <p>Rol de Discord</p> : <p>{rango.description}</p>}
        {rango.sale ? (
          <p>
            <span>{String(rango.sale_percent)}%</span> de descuento en la tienda
          </p>
        ) : (
          ""
        )}
      </div>
      <div className="buy-button" onClick={handleBuy}>
        Comprar
      </div>
    </div>
  );
};

export default ItemCard;
