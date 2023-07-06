const express = require("express");
const path = require("path");
const multer  = require('multer')
// const decompress = require("decompress");
const AdmZip = require("adm-zip");
const app = express();
const port = process.env.PORT || 3000;
app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }))



function extractZipFile(zipFilePath, destinationFolderPath) {
  return new Promise((resolve, reject) => {
    const zip = new AdmZip(zipFilePath);
    zip.extractAllTo(destinationFolderPath, true);

    zip.getEntries().forEach((entry) => {
      if (entry.entryName === 'extractedFile.txt') {
        // Perform additional operations on the extracted file
        // For example, you can read its contents or manipulate it
      }
    });

    resolve('File extraction completed successfully');
  });
}

// Usage example
const zipFilePath = './uploads/node.zip';
const destinationFolderPath = 'dist';

extractZipFile(zipFilePath, destinationFolderPath)
  .then((message) => {
    console.log(message);
    // Perform any other actions you need after the file extraction is complete
  })
  .catch((error) => {
    console.error('An error occurred during file extraction:', error);
  });




const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      return cb(null,"./uploads");
    },
    filename: function (req, file, cb) {
        return cb(null,`${Date.now()}-${file.originalname}`);
    }
  })
  
const upload = multer({ storage: storage })

app.get("/", (req, res) => {
    return res.render("homepage");
})

app.post("/upload", upload.single('profileImage'),(req, res) => {
    console.log(req.body);
    console.log(req.file);
    return res.redirect("/");
})
app.listen(port, () => {
    console.log(`Listening to PORT ${port}`);
})