import Express from "express";
import multer from "multer";
import { saveProductImage } from "../../lib/fs-tools.js";
import { extname } from "path";

const filesRouter = Express.Router();

filesRouter.post(
  "/:id/upload",
  multer().single("image"),
  async (req, res, next) => {
    try {
      //   console.log("FILE:", req.file);
      const originalFileExtension = extname(req.file.originalname);
      const fileName = req.params.id + originalFileExtension; // using the same "id" name from link/ router
      await saveProductImage(fileName, req.file.buffer);
      res.send({ message: "image uploaded" });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
);

export default filesRouter;
