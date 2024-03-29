import express from "express";
import cors from "cors";
import path from "path";

import { routes } from "./routes";

const app = express();

app.use(cors());
app.use(express.json());
app.use(routes);
app.use("/images", express.static(path.resolve(__dirname, "temp")));

app.listen(3333);
