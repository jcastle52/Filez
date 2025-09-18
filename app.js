import express from "express";
const app = express();
export default app;
import folderRoutes from "./api/folders.js";
import fileRoutes from "./api/files.js";

app.use(express.json());

app.route("/").get((req, res) => {
    res.send("Test");
});

app.use("/folders", folderRoutes);
app.use("/files", fileRoutes);