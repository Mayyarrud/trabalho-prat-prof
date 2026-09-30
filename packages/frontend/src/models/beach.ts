import type { Forecast } from "./forecast";

export interface Beach {
  id: string;
  name: string;
  ibgeCode: string;
  latitude: number;
  longitude: number;
}

export interface BeachDetail extends Beach {
  forecast: Forecast[];
}