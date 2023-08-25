const fs = require("fs");
const User = require("../models/user.model");
const Doctors = require("../models/doctor");
const Hospital = require("../models/hospital");

const updateImage = async (type, id, nameFile) => {
  console.log("very good!");
  switch (type) {
    case "doctors":
      const doctor = await Doctors.findById(id);
      if (!doctor) {
        console.log("doctor not founded.");
        return false;
      }
      console.log(doctor.img);
      const pathOld = `./uploads/doctors/${doctor.img}`;
      console.log("Old Path-->" + pathOld);
      deleteImage(pathOld);

      doctor.img = nameFile;
      await doctor.save();
      return true;
      break;
    case "users":
      const user = await User.findById(id);
      if (!user) {
        console.log("user not found.");
        return false;
      }
      const pathUser = `./uploads/users/${user.img}`;
      deleteImage(pathUser);

      user.img = nameFile;
      await user.save();
      return true;
      break;
    case "hospitals":
      const hospital = await Hospital.findById(id);
      if (!hospital) {
        console.log("hospital not found.");
        return false;
      }
      const path = `./uploads/hospitals/${hospital.img}`;
      deleteImage(path);

      hospital.img = nameFile;
      await hospital.save();
      return true;
      break;

    default:
      break;
  }
};

const deleteImage = (path) => {
  console.log("Old Path-->" + path);
  if (fs.existsSync(path)) {
    console.log("existSync");
    fs.unlinkSync(path);
  }
};

module.exports = {
  updateImage,
};
