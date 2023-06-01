import { RestaurantType, Restaurants } from "./restaurants.model";
import { Request, Response } from "express";
import * as fs from "fs";
import * as path from "path";

//* READ restaurant data
export const readAllRestaurants = (req: Request, res: Response) => {
  try {
    res.status(200).send({
      success: true,
      data: Restaurants,
    });
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(400).send({
        success: false,
        error: error.message,
      });
    } else {
      res.status(400).send({
        success: false,
        error: "unknown error",
      });
    }
  }
};

//* READ restaurant data by name
export const readRestaurantByName = (req: Request, res: Response) => {
  try {
    const name = req.params.name;
    const toBeReadRestaurant: RestaurantType | undefined = Restaurants.find(
      (restaurant) => restaurant.name === name
    );
    if (!toBeReadRestaurant) throw new Error("restaurant not found");

    res.status(200).send({
      success: true,
      data: toBeReadRestaurant,
    });
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(400).send({
        success: false,
        error: error.message,
      });
    } else {
      res.status(400).send({
        success: false,
        error: "unknown error",
      });
    }
  }
};

//* CREATE restaurant data
export const createRestaurant = (req: Request, res: Response) => {
  try {
    // 자동으로 JSON.Parse를 해주는 것 같다.
    const toBeCreatedRestaurant: RestaurantType = req.body;
    const restaurantExists: boolean =
      Restaurants.find(
        (restaurant) => restaurant.name === toBeCreatedRestaurant.name
      ) !== undefined;
    if (restaurantExists) throw new Error("restaurant already exists");

    Restaurants.push(toBeCreatedRestaurant);
    fs.writeFileSync(
      path.join(__dirname, "restaurants.json"),
      JSON.stringify({ restaurants: Restaurants })
    );

    res.status(200).send({
      success: true,
      data: toBeCreatedRestaurant,
    });
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(400).send({
        success: false,
        error: error.message,
      });
    } else {
      res.status(400).send({
        success: false,
        error: "unknown error",
      });
    }
  }
};

//* PUT restaurant data by name
export const putRestaurantByname = (req: Request, res: Response) => {
  try {
    const name = req.params.name;
    // 자동으로 JSON.Parse를 해주는 것 같다.
    const newRestaurant: RestaurantType = req.body;
    const restaurantNames: string[] = Restaurants.map(
      // restuarant.name이 undefined일 수도 있으니, optional chaining을 사용한다.
      (restaurant) => restaurant.name ?? ""
    );
    const toBePutRestaurantIndex = restaurantNames.indexOf(name);
    if (toBePutRestaurantIndex <= -1) throw new Error("restaurant not found");
    Restaurants[toBePutRestaurantIndex] = newRestaurant;
    fs.writeFileSync(
      path.join(__dirname, "restaurants.json"),
      JSON.stringify({ restaurants: Restaurants })
    );
    res.status(200).send({
      success: true,
      data: Restaurants[toBePutRestaurantIndex],
    });
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(400).send({
        success: false,

        error: error.message,
      });
    } else {
      res.status(400).send({
        success: false,
        error: "unknown error",
      });
    }
  }
};

//* PATCH restaurant data by name
export const patchRestaurantByName = (req: Request, res: Response) => {
  try {
    const name = req.params.name;
    const patchData: RestaurantType = req.body;
    const toBePatchedRestaurant: RestaurantType | undefined = Restaurants.find(
      (restaurant) => restaurant.name === name
    );
    if (!toBePatchedRestaurant) throw new Error("restaurant not found");
    const index = Restaurants.indexOf(toBePatchedRestaurant);
    Restaurants[index] = { ...toBePatchedRestaurant, ...patchData };
    fs.writeFileSync(
      path.join(__dirname, "restaurants.json"),
      JSON.stringify({ restaurants: Restaurants })
    );
    res.status(200).send({
      success: true,
      data: Restaurants[index],
    });
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(400).send({
        success: false,
        error: error.message,
      });
    } else {
      res.status(400).send({
        success: false,
        error: "unknown error",
      });
    }
  }
};

//* DELETE restaurant data by name
export const deleteRestaurantByName = (req: Request, res: Response) => {
  try {
    const name = req.params.name;
    const toBeDeletedRestaurant: RestaurantType | undefined = Restaurants.find(
      (restaurant) => restaurant.name === name
    );
    if (!toBeDeletedRestaurant) throw new Error("cat not found");
    const index = Restaurants.indexOf(toBeDeletedRestaurant);
    Restaurants.splice(index, 1);
    fs.writeFileSync(
      path.join(__dirname, "restaurants.json"),
      JSON.stringify({ restaurants: Restaurants })
    );
    res.status(200).send({
      success: true,
      data: toBeDeletedRestaurant,
    });
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(400).send({
        success: false,
        error: error.message,
      });
    } else {
      res.status(400).send({
        success: false,
        error: "unknown error",
      });
    }
  }
};
