import Purchase from "../models/Purchase";
import { config } from "dotenv";
import axios from "axios";

config();

export const getPurchases = async (req, rep) => {
  const purchases = await Purchase.find();
  rep.send({ status: 200, purchases });
};

export const createOrder = async (req, rep) => {
  const { funds_added } = req.params;
  const order = {
    intent: "CAPTURE",
    purchase_units: [
      {
        amount: {
          currency_code: "USD",
          value: funds_added,
        },
        description: `Añadiendo ${funds_added}USD en fondos a su cuenta`,
      },
    ],
    application_context: {
      brand_name: "GUATER",
      landing_page: "LOGIN",
      user_action: "PAY_NOW",
      shipping_preference: "NO_SHIPPING",
      return_url: `${process.env.DOMAIN}/api/purchases/success`,
      cancel_url: `${process.env.DOMAIN}/api/purchases/failed`,
    },
  };
  try {
    const params = new URLSearchParams();
    params.append("grant_type", "client_credentials");
    const {
      data: { access_token },
    } = await axios.post(
      "https://api-m.sandbox.paypal.com/v1/oauth2/token",
      params,
      {
        headers: {
          "Content-Type": "x-www-form-urlencoded",
        },
        auth: {
          username: process.env.CLIENT_PAYPAL,
          password: process.env.SECRET_PAYPAL,
        },
      }
    );

    req.funds_added = funds_added;

    const res = await axios.post(
      `${process.env.URI_PAYPAL}/v2/checkout/orders`,
      order,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${access_token}`,
        },
      }
    );
    rep.send(res.data.links[1]);
  } catch (e) {
    console.log(e);
    rep.code(400).send({ status: 400, message: "Error inesperado" });
  }
};

export const captureOrder = async (req, rep) => {
  const { token } = req.query;
  const { data } = await axios.post(
    `${process.env.URI_PAYPAL}/v2/checkout/orders/${token}/capture`,
    {},
    {
      auth: {
        username: process.env.CLIENT_PAYPAL,
        password: process.env.SECRET_PAYPAL,
      },
    }
  );

  const purchase = new Purchase({
    charge: Number(data.purchase_units[0].payments.captures[0].amount.value),
    date: new Date(),
  });
  await purchase.save();
  const added_funds = Number(
    data.purchase_units[0].payments.captures[0].seller_receivable_breakdown
      .net_amount.value
  );
  req.user.funds += added_funds;
  req.user.purchases.push(purchase._id);
  await req.user.save();
  rep.code(201).send({ status: 201, added_funds, user: req.user });
};

export const cancelOrder = (req, rep) => {
  req.redirect("/");
};
