// import multer from "multer";

// export const upload = multer({storage: multer.diskStorage({})})


// configs/multer.js
import multer from 'multer';
import path from 'path';

// Set storage engine
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './uploads'); // Specify where the file will be stored
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Set a unique filename using timestamp
  },
});

// Create Multer instance with storage engine and file filter
export const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    if (file.mimetype === 'application/pdf' || file.mimetype.startsWith('image/')) {
      cb(null, true); // Accept file
    } else {
      cb(new Error('Only PDF and image files are allowed'), false); // Reject file if not PDF or image
    }
  },
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB file size limit
  },
});
