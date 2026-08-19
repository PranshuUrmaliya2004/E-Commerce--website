import  multer from "multer";

const storage= multer.diskStorage({
  filename:function(req,file,callback){
        callback (null,file.originalname)  
  }
})
const upload= multer({storage})
export default upload;


// import multer from "multer";
// import path from "path";

// // Temporary storage folder
// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, path.join(process.cwd(), "tmp")); // backend project root me 'tmp' folder
//   },
//   filename: function (req, file, cb) {
//     const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
//     const ext = path.extname(file.originalname);
//     cb(null, file.fieldname + "-" + uniqueSuffix + ext); // e.g., image1-123456789.png
//   },
// });

// // File filter (optional, only images)
// const fileFilter = (req, file, cb) => {
//   if (file.mimetype.startsWith("image/")) {
//     cb(null, true);
//   } else {
//     cb(new Error("Only image files are allowed!"), false);
//   }
// };

// // Max file size 5MB (optional)
// const upload = multer({
//   storage,
//   fileFilter,
//   limits: { fileSize: 5 * 1024 * 1024 },
// });

// export default upload;
