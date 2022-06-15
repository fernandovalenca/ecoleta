import { Router } from "express";

import multer from "multer";
import multerConfig from "./config/multer";

import { PointsController } from "./controllers/PointsController";
import { ItemsController } from "./controllers/ItemsController";

const routes = Router();
const upload = multer(multerConfig);

const pointsController = new PointsController();
const itemsController = new ItemsController();

//index, show, create, update, delete

routes.post("/points", upload.single("image"), pointsController.create);
routes.get("/points/:id", pointsController.show);
routes.get("/points", pointsController.index);

routes.get("/items", itemsController.index);

export { routes };
