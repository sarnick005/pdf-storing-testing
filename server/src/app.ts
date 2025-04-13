import express from "express";
import cors from "cors";
import router from "./routes";
import path from "path";
import dotenv from "dotenv";
import { EnvVariables } from "./config/env";

dotenv.config();

const ALLOWED_ORIGIN = EnvVariables.FRONTEND_URL;

const app = express();

const corsOptions = {
  origin: ALLOWED_ORIGIN,
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
};


app.use(express.json());
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(cors(corsOptions));

app.use("/files", express.static(path.join(process.cwd(), "public")));

app.use("/api/v1", router);

export { app };
