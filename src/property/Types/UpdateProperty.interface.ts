import { ILocation } from "./Location.dto.interface";
import { IPeriod } from "./Period.dto.interface";
import { IAddress } from "./address.dto.interface";

export interface IUpdatePropertyDto {
  address: IAddress;
  location?: ILocation;
  price: number;
  type: string;
  period: IPeriod;
  description: string;
  images?: string[];
}

