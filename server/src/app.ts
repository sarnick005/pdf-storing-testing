import express from "express";
import cors from "cors";
import router from "./routes";
import path from "path";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(cors());
app.use("/files", express.static(path.join(process.cwd(), "public")));

app.use("/api/v1", router);

export { app };
