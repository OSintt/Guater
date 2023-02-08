import Kit from "../models/Kit";
import Rango from '../models/Rango';

const rangos = [
  {
    title: "Leviathan",
    price: 10,
    position: 4,
  },
  {
    title: "Leviathan+",
    price: 20,
    position: 3,
  },
  {
    title: "Alien",
    price: 40,
    position: 2,
  },
  {
    title: "Alien+",
    price: 80,
    position: 1,
  },
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
    }, 
];

export async function createKits() {
    await Kit.deleteMany();
    kits.forEach(async ({title, price, description}) => {
        const newKit = new Kit({
            title,
            description,
            price
        });
        await newKit.save();
        console.log('Se ha creado el kit', title);
    });
} 

export async function createRangos() {
    await Rango.deleteMany();
    rangos.forEach(async ({title, price, position, description}) => {
        const newRango = new Rango({
            title,
            description,
            price,
            position
        });
        await newRango.save();
        console.log('Se ha creado el rango', title);
    });
} 
