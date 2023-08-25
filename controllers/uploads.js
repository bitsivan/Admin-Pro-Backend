const path = require('path');
const { response } = require("express");
const { v4: uuidv4 } = require("uuid");
const { updateImage }= require('../helpers/update-image');
const fs = require('fs');

const fileUpload = (req, resp = response) => {
  try {
    const { type, id } = req.params;
    console.log(type, id);
    const validTypes = ["doctors", "hospitals", "users"];
    if (!validTypes.includes(type)) {
      return resp.status(400).json({
        ok: false,
        msg: "The type is not a user, a doctor or a hospital.",
      });
    }

    console.log(req.files);
    if (!req.files || Object.keys(req.files).length === 0) {
      return resp.status(400).json({
        ok: false,
        msg: "No files were uploaded.",
      });
    }

    //Process Image...
    const file = req.files.image;
    console.log(file);
    const imageSplit = file.name.split(".");
    const extFile = imageSplit[imageSplit.length - 1];

    //validate ext
    const validExtensions = ["png", "jpg", "jpeg", "gif"];
    if (!validExtensions.includes(extFile)) {
      return resp.status(400).json({
        ok: false,
        msg: "Extension no valid.",
      });
    }

    const nameFile = `${uuidv4()}.${extFile}`;

    const path = (`./uploads/${type}/${nameFile}`);
    console.log(path);
    // Use the mv() method to place the file somewhere on your server
    file.mv(path, (err) => {
      if (err) {
        console.log(err);
        return resp.status(500).json({
          ok: false,
          msg: "Error moving file",
        });
      }

      updateImage(type, id, nameFile);
 
      resp.json({
        ok: true,
        msg: "Uploaded file!",
        file: nameFile,
      });
      
    });
  } catch (error) {
    resp.status(500).json({
      ok: false,
      msg: "Call the Administrator",
    });
  }
};

const returnImages=(req, resp=response)=>{
    const {type, picture} = req.params;

    const pathImg=path.join(__dirname, `../uploads/${type}/${picture}`);

    //default image
    if(fs.existsSync(pathImg)){
        resp.sendFile(pathImg);
    }else{
        const defaultImg=path.join(__dirname, `../uploads/no-disponible.png`);
        resp.sendFile(defaultImg);
    }
}

module.exports = {
  fileUpload,
  returnImages,
};
