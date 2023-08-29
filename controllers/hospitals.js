const { response } = require("express");
const Hospital = require("../models/hospital");

const getHospitals = async (req, res = response) => {
  const hospitals = await Hospital.find().populate("user", "name email");
  res.json({
    ok: true,
    msg: "getHospitals",
    hospitals: hospitals,
  });
};

const createHospital = async (req, res = response) => {
  const uid = req.uid;
  const hospital = new Hospital({
    user: uid,
    ...req.body,
  });
  try {
    const hospitalDb = await hospital.save();
    res.json({
      ok: true,
      msg: "createHospital",
      hospital: hospitalDb,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Talk with the administrator.",
    });
  }
};

const updateHospital = async (req, res = response) => {
  const hospitalId = req.params.id;
  const uid = req.uid;

  try {
    const hospital = await Hospital.findById(hospitalId);

    if (!hospital) {
      return res.status(400).json({
        okk: false,
        msg: "Not Found",
      });
    }
    //hospital.name = req.body.name;
    const changes = {
      ...req.body,
      user: uid,
    };

    const hospitalUpdated = await Hospital.findByIdAndUpdate(hospitalId, changes, {
      new: true,
    });
    res.json({
      ok: true,
      msg: "updateHospital",
      hospitalUpdated,
    });
  } catch (error) {
    res.status(400).json({
      ok: false,
      msg: "updateHospital",
    });
  }
};

const deleteHospital = async (req, res = response) => {

  const hospitalId=req.params.id;
  try {
    const hospital=await Hospital.findById(hospitalId);
    if(!hospital){
     return res.json({
        ok: false,
        msg: "Hospital does not exist."
      });   
    }

    await Hospital.findByIdAndDelete(hospitalId);

    res.json({
        ok: true,
        msg: hospital.name+ " was deleted successfully",
      });
  } catch (error) {
    res.json({
        ok: false,
        msg: "deleteHospital",
        error
      });
  }
};

module.exports = {
  getHospitals,
  createHospital,
  updateHospital,
  deleteHospital,
};
