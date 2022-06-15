import multer from "multer";
import path from "path";
import crypto from "crypto";

export default {
  storage: multer.diskStorage({
    destination: path.resolve(__dirname, "..", "temp", "uploads"),
    filename(request, file, callback) {
      const hash = crypto.randomBytes(6).toString("hex");
      const fileName = `${hash}-${file.originalname.replace(/\s/g, "")}`;
      console.log(fileName.trim());
      callback(null, fileName);
    },
  }),
};
