import {Router} from "express";

import {
    addTrainerController, getSpecificTrainerController, getAllTrainersController,
    updateTrainerController, deleteTrainerController, getAllRevenuesOfTrainerController, getAllTrainerMembersController
} from "../Controllers/Trainer.controller.js";

export const router = Router();

router.get("/totalRevenues/", getAllRevenuesOfTrainerController);

router.get("/members/", getAllTrainerMembersController);

router.get("/:id/", getSpecificTrainerController);

router.put("/:id/", updateTrainerController);

router.delete("/:id/", deleteTrainerController);

router.post("/", addTrainerController);

router.get("/", getAllTrainersController);