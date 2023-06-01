import { Router } from "express";
import {
  createRestaurant,
  deleteRestaurantByName,
  patchRestaurantByName,
  putRestaurantByname,
  readAllRestaurants,
  readRestaurantByName,
} from "./restaurants.service";

const router = Router();
//* READ Cat data
router.get("/restaurants", readAllRestaurants);

//* READ Cat data by id
router.get("/restaurants/:name", readRestaurantByName);

//* CREATE Cat data
router.post("/restaurants", createRestaurant);

//* PUT Cat data by id
router.put("/restaurants/:name", putRestaurantByname);

//* PATCH Cat data by id
router.patch("/restaurants/:name", patchRestaurantByName);

//* DELETE Cat data by id
router.delete("/restaurants/:name", deleteRestaurantByName);

export default router;
