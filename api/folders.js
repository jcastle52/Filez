import express from "express";
const router = express.Router();
export default router;
import { getAllFolders, getFolderById, getFolderByIdWithFiles} from "#db/queries/folders";
import { createFile } from "../db/queries/files.js";

router.route("/").get(async (req, res) => {
  try {
    const response = await getAllFolders();
    res.status(200).send(response);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.route("/:id").get(async (req, res) => {
  try {
    const { id } = req.params;
    if (id < 0) {
      return res.status(400).send("id must be a positive integer");
    }
    const response = await getFolderByIdWithFiles({ id });
    if (!response) {
      return res.status(404).send("Folder does not exist");
    }
    res.status(200).send(response);
  } catch (error) {
    res.status(404).send(error);
  }
});

router.route("/:id/files").post(async (req, res) => {
  try {
    const { id: folder_id } = req.params;
    if (folder_id < 0) {
      return res.status(400).send("Folder Id must be a positive integer");
    }

    const testFolderExist = await getFolderById({ folder_id })
    if (!testFolderExist) {
      return res.status(404).send("Folder does not exist");
    }

    const { name, size } = req.body;
    if (!name || !size || !folder_id) {
      return res.status(400).send("Information is missing");
    }

    const response = await createFile({ name, size, folder_id });
    res.status(201).send(response);
  } catch (error) {
    res.status(400).send(error);
  }
});
