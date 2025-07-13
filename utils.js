const fs = require("fs/promises");

exports.deleteFile = async (filePath) => {
  try {
    await fs.unlink(filePath);
  } catch (e) {
    console.warn("Failed to delete file:", filePath);
  }
};

exports.renameFile = async (oldPath, newPath) => {
  try {
    await fs.rename(oldPath, newPath);
  } catch (e) {
    console.warn("Failed to rename file:", oldPath);
  }
}
