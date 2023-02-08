"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    getPurchases: ()=>getPurchases,
    createOrder: ()=>createOrder,
    captureOrder: ()=>captureOrder,
    cancelOrder: ()=>cancelOrder
});
const _purchase = /*#__PURE__*/ _interopRequireDefault(require("../models/Purchase"));
const _dotenv = require("dotenv");
const _axios = /*#__PURE__*/ _interopRequireDefault(require("axios"));
function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
(0, _dotenv.config)();
const getPurchases = async (req, rep)=>{
    const purchases = await _purchase.default.find();
    rep.send({
        status: 200,
        purchases
    });
};
const createOrder = async (req, rep)=>{
    const { funds_added  } = req.params;
    const order = {
        intent: "CAPTURE",
        purchase_units: [
            {
                amount: {
                    currency_code: "USD",
                    value: funds_added
                },
                description: `Añadiendo ${funds_added}USD en fondos a su cuenta`
            }
        ],
        application_context: {
            brand_name: "GUATER",
            landing_page: "LOGIN",
            user_action: "PAY_NOW",
            shipping_preference: "NO_SHIPPING",
            return_url: `${process.env.DOMAIN}/api/purchases/success`,
            cancel_url: `${process.env.DOMAIN}/api/purchases/failed`
        }
    };
    try {
        const params = new URLSearchParams();
        params.append("grant_type", "client_credentials");
        const { data: { access_token  }  } = await _axios.default.post("https://api-m.sandbox.paypal.com/v1/oauth2/token", params, {
            headers: {
                "Content-Type": "x-www-form-urlencoded"
            },
            auth: {
                username: process.env.CLIENT_PAYPAL,
                password: process.env.SECRET_PAYPAL
            }
        });
        req.funds_added = funds_added;
        const res = await _axios.default.post(`${process.env.URI_PAYPAL}/v2/checkout/orders`, order, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${access_token}`
            }
        });
        rep.send(res.data.links[1]);
    } catch (e) {
        console.log(e);
        rep.code(400).send({
            status: 400,
            message: "Error inesperado"
        });
    }
};
const captureOrder = async (req, rep)=>{
    const { token  } = req.query;
    const { data  } = await _axios.default.post(`${process.env.URI_PAYPAL}/v2/checkout/orders/${token}/capture`, {}, {
        auth: {
            username: process.env.CLIENT_PAYPAL,
            password: process.env.SECRET_PAYPAL
        }
    });
    const purchase = new _purchase.default({
        charge: Number(data.purchase_units[0].payments.captures[0].amount.value),
        date: new Date()
    });
    await purchase.save();
    const added_funds = Number(data.purchase_units[0].payments.captures[0].seller_receivable_breakdown.net_amount.value);
    req.user.funds += added_funds;
    req.user.purchases.push(purchase._id);
    await req.user.save();
    rep.code(201).send({
        status: 201,
        added_funds,
        user: req.user
    });
};
const cancelOrder = (req, rep)=>{
    req.redirect("/");
};
