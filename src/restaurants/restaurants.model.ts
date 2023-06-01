import * as data from "./restaurants.json";

// name, address, phone이 필수적으로 있어야 한다.
export type RestaurantType = {
  name?: string;
  address?: string;
  phone?: string;
};

export const Restaurants: RestaurantType[] = data.restaurants;
