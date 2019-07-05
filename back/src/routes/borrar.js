const express = require("express");
const Router = express.Router();

const path = require("path");
const multer = require("multer");

const storage = multer.diskStorage({

    destination: './src/public/receipt',
    filename: function (req, file, cb) {
        cb(null, "RECEIPT-" + Date.now() + path.extname(file.originalname));
    },
});

const upload = multer({
    storage,
    limits: { fileSize: 1000000 },
    fileFilter: function (req, file, cb) {
        var filetypes = /jpeg|png|pdf|jpg/;
        var mimetype = filetypes.test(file.mimetype);
        var extname = filetypes.test(path.extname(file.originalname).toLowerCase());
        if (mimetype && extname) return cb(null, true);
        cb("Error: File upload only supports the following filetypes - " + filetypes);
      }
});


Router.post("/upload", upload.single("myImage"), (req, res) => {
    const file = req.file; // file passed from client
    
    console.log(file)
    res.send('ok')
}
)
module.exports = Router;