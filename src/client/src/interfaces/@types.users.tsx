import { ReactNode } from "react";

export type Nullable<T> = T | null;

export interface Props {
  children?: ReactNode;
}

export interface RangoInterface {
  _id: String;
  title: String;
  price: Number;
  description?: String;
  sale: Boolean;
  sale_percent: Number;
  position: Number;
}

export interface KitInterface {
  _id: String;
  title: String;
  description: String;
  price: Number;
  sale: Boolean;
  sale_percent: Number;
}

export interface PurchaseInterface {
  _id: String;
  date: Date;
  charge: Number;
}

export interface UserInterface {
  _id: String;
  username: String;
  discriminator: String;
  userId: String;
  avatarURL?: String;
  purchases: [PurchaseInterface];
  rango: RangoInterface;
  kit: [KitInterface];
  admin: Boolean;
  funds: Number;
  date: Date;
  mc_nick: String;
}
