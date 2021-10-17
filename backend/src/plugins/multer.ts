import multer from "multer";

const upload = multer({
  // storage configuration
  storage: multer.diskStorage({
    // destination
    destination: function(req, file, cb) {
      // place where we store assets
      cb(null, "public/uploads");
    },

    // filename configuration
    filename: function(req, file, cb) {
      let extArray = file.mimetype.split("/");
      let extension = extArray[extArray.length - 1];
      cb(null, file.fieldname + "-" + Date.now() + "." + extension);
    },
  }),
});

export default [
  // allow any multipart/form-data
  upload.any(),
];
