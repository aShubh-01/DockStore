const express = require("express");
const router = express.Router();
const multer = require("multer");
const controller = require("./controllers");

const upload = multer({ dest: "./uploads/" });

router.post("/", upload.single("file"), controller.storeFile);
router.get("/:id", controller.getFileById);
router.get("/path", controller.getFilesByPath);

router.delete("/:id", controller.deleteById);
router.delete("/path", controller.deleteByPath);

module.exports = router;
