export type Beer = {
  abv: number;
  attenuation_level: number;
  boil_volume: { value: number; unit: string };
  brewers_tips: string;
  contributed_by: string;
  description: string;
  ebc: number;
  first_brewed: string;
  food_pairing: string[];
  ibu: number;
  id: number;
  image_url: string;
  ingredients: {
    [key: string]:
      | {
          name: string;
          amount: {
            value: number;
            unit: string;
          };
          add?: string;
          attribute?: string;
        }[]
      | string;
  };
  method: {
    [key: string]:
      | {
          temp: {
            value: number;
            unit: string;
          };
          duration?: number;
        }
      | {
          temp: {
            value: number;
            unit: string;
          };
          duration?: number;
        }[]
      | null;
  };
  name: string;
  ph: number;
  srm: number;
  tagline: string;
  target_fg: number;
  target_og: number;
  volume: { value: number; unit: string };
};
