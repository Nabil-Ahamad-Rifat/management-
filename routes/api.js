import express from "express";
const router = express.Router();
import AuthMiddleware from "../src/middlewares/AuthMiddleware.js";
import * as studentsController from "../src/controllers/studentsController.js";
import *  as FileController from "../src/controllers/FileController.js"

// Users
router.post("/register", studentsController.register)
router.post("/login", studentsController.login)
router.get("/profile_read", AuthMiddleware, studentsController.profileRead)
router.post("/Update", AuthMiddleware, studentsController.Update)


// Files
router.post("/upload_single_file", FileController.uploadSingleFile)
router.get("/read_file/:fileName", FileController.getUploadFile)
router.delete("/delete_single_file/:fileName", FileController.deleteSingleFile)



export default router;


