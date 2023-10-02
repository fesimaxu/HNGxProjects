import { Request } from "express";
import multer from "multer"

// Set up storage for uploaded files
const storage = multer.diskStorage({
  destination: (req: Request, file, cb) => {
    cb(null, '../../dist/uploads');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

// Create the multer instance
export const upload = multer({ storage: storage });