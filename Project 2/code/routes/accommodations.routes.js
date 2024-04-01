import { Router } from "express";
import { AccommodationController } from "../controller/controller_accommodation.js";
const AccommondationsRouter = Router();
const accommodationController = new AccommodationController();
// YOUR ROUTES GOES HERE

AccommondationsRouter.post("/createAccommodation", async (req, res) => {
    await accommodationController.createAccommodation(req, res);
});
AccommondationsRouter.get("/accommodations", async (req, res) => {
    await accommodationController.getAllAccommodations(req, res);
});
AccommondationsRouter.get("/accommodations/:id", async (req, res) => {
    await accommodationController.getAccommodationById(req, res);
});
AccommondationsRouter.delete("/accommodations/:id", async (req, res) => {
    await accommodationController.deleteAccommodationById(req, res);
});
AccommondationsRouter.put("/accommodations/:id", async (req, res) => {
    await accommodationController.updateAccommodationById(req, res);
});

export default AccommondationsRouter;
