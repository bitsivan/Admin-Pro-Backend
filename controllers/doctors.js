const { response } = require('express');
const Doctor = require('../models/doctor');

const getDoctors = async (req, res = response) => {
    const doctors= await Doctor.find()
                .populate('user','name email')
                .populate('hospital','name');
  res.json({
    ok: true,
    msg: "getDoctors",
    doctors: doctors
  });
};

const createDoctor = async (req, res = response) => {
  const uid = req.uid;
  const doctor = new Doctor({
    user: uid,
    ...req.body,
  });

  try {
    const doctorDb = await doctor.save();

    res.json({
      ok: true,
      msg: "createDoctor",
      doctor: doctorDb,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Talk with the administrator.",
    });
  }
};

const updateDoctor = (req, res = response) => {
  res.json({
    ok: true,
    msg: "updateDoctor",
  });
};

const deleteDoctor = (req, res = response) => {
  res.json({
    ok: true,
    msg: "deleteDoctor",
  });
};

module.exports = {
  getDoctors,
  createDoctor,
  updateDoctor,
  deleteDoctor,
};
