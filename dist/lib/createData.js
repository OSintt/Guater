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
    createKits: ()=>createKits,
    createRangos: ()=>createRangos
});
const _kit = /*#__PURE__*/ _interopRequireDefault(require("../models/Kit"));
const _rango = /*#__PURE__*/ _interopRequireDefault(require("../models/Rango"));
function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
const rangos = [
    {
        title: "Leviathan",
        price: 10,
        position: 4
    },
    {
        title: "Leviathan+",
        price: 20,
        position: 3
    },
    {
        title: "Alien",
        price: 40,
        position: 2
    },
    {
        title: "Alien+",
        price: 80,
        position: 1
    }
];
const kits = [
    {
        title: 'VIP',
        price: 10,
        description: '¡Qué pro!'
    },
    {
        title: 'Alien',
        price: 100,
        description: '¡A un paso de ser parte de la familia!'
    },
    {
        title: 'VIP Supremo',
        price: 50,
        description: '¡Todo un galán!'
    },
    {
        title: 'Minero',
        price: 0,
        description: '¡A minar se ha dicho!'
    },
    {
        title: 'PVP',
        price: 0,
        description: '¡A luchar se ha dicho!'
    },
    {
        title: 'Alien+',
        price: 120,
        description: '¡Parte de la familia!'
    }
];
async function createKits() {
    await _kit.default.deleteMany();
    kits.forEach(async ({ title , price , description  })=>{
        const newKit = new _kit.default({
            title,
            description,
            price
        });
        await newKit.save();
        console.log('Se ha creado el kit', title);
    });
}
async function createRangos() {
    await _rango.default.deleteMany();
    rangos.forEach(async ({ title , price , position , description  })=>{
        const newRango = new _rango.default({
            title,
            description,
            price,
            position
        });
        await newRango.save();
        console.log('Se ha creado el rango', title);
    });
}
