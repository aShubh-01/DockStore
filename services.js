const objectModel = require("./models.js");
const { deleteFile } = require("./utils");

exports.storeFile = async (virtualPath, file) => {
    const objectName = file.path.split("/")[1];
  const doc = {
    path: virtualPath,
    originalName: file.originalname,
    size: file.size,
    mimeType: file.mimetype,
    uploadedAt: new Date()
  };
  const result = await objectModel.insert(doc);
  return result.insertedId;
};

exports.getFileById = async (id) => {
  return await objectModel.findById(id);
};

exports.getFilesByPath = async (path) => {
  return await objectModel.findByPath(path);
};

exports.deleteFileById = async (id) => {
  const file = await objectModel.findById(id);
  if (!file) return false;
  await deleteFile(`uploads/${file._id.toString()}`);
  await objectModel.deleteById(id);
  return true;
};

exports.deleteFilesByPath = async (path) => {
  const files = await objectModel.findByPath(path);
  for (const file of files) {
    await deleteFile();
    await objectModel.deleteById(`uploads/${file._id.toString()}`);
  }
  return files.length;
};
