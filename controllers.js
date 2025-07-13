const service = require("./services");
const { renameFile } = require("./utils");
const fs = require('fs/promises');
const path = require('path');

exports.storeFile = async (req, res) => {
    const { path: filePath } = req.body;
    const file = req.file;

    if (!filePath || !file) return res.status(400).json({ error: "Path and file required" });

    const id = await service.storeFile(filePath, file);

    let oldPath = file.path;
    let newPath = path.resolve("uploads", id.toString());

    await renameFile(oldPath, newPath);
    await fs.chmod(newPath, 0o644);

    res.status(201).json({ objectId: id });
};

exports.getFileById = async (req, res) => {
    const fileObj = await service.getFileById(req.params.id);
    if (!fileObj) return res.status(404).json({ error: "File not found" });

    res.download(`uploads/${fileObj._id.toString()}`, fileObj.originalName);
};

exports.getFilesByPath = async (req, res) => {
    const { path } = req.query;
    if (!path) return res.status(400).json({ error: "Path required" });

    const files = await service.getFilesByPath(path);
    res.json(files);
};

exports.deleteById = async (req, res) => {
    const deleted = await service.deleteFileById(req.params.id);
    res.json({ deleted });
};

exports.deleteByPath = async (req, res) => {
    const { path } = req.query;
    if (!path) return res.status(400).json({ error: "Path required" });

    const deletedCount = await service.deleteFilesByPath(path);
    res.json({ deletedCount });
};
