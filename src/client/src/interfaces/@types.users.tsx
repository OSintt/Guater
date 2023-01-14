import { ReactNode } from "react";

export type Nullable<T> = T | null;

export interface Props {
  children?: ReactNode;
}

export interface RangoInterface {
  _id: String;
  title: String;
  price: Number;
  description: Number;
  sale: Boolean;
  rango_value: String;
  sale_percent: Number;
  position: Number;
}

export interface KitInterface {
  _id: String;
  title: String;
  description: String;
  price: Number;
  rango_value: String;
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
}
