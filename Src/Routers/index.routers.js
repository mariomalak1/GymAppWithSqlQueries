import { Router } from "express";

import {router as trainerRouter} from "./Trainer.routers.js";

import {router as memberRouter} from "./Member.routers.js";

export const router = Router();

router.use("/trainers", trainerRouter);

router.use("/members", memberRouter);
