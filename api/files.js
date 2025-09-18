import express from "express";
const router = express.Router();
export default router;
import { getAllFilesWithFolder } from "#db/queries/files";

router
    .route("/")
    .get(async (req, res) => {
        try {
         const response = await getAllFilesWithFolder();
         res.status(200).send(response);   
        } catch (error) {
            res.status(400).send(error);
        }
    });