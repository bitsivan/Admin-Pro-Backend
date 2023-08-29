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

const updateDoctor = async (req, res = response) => {
    const doctorId = req.params.id;
    const uid = req.uid;
    const hospitalId=req.body.hospital;
  
    try {
      const doctor = await Doctor.findById(doctorId);
  
      if (!doctor) {
        return res.status(400).json({
          okk: false,
          msg: "Not Found",
        });
      }
      //doctor.name = req.body.name;
      const changes = {
        ...req.body,
        user: uid,
        hospital: hospitalId
      };
  
      const _doctor = await Doctor.findByIdAndUpdate(doctorId, changes, {
        new: true,
      });
      res.json({
        ok: true,
        msg: "updateDoctor",
        _doctor,
      });
    } catch (error) {
      res.status(400).json({
        ok: false,
        msg: "updateDoctor",
      });
    }
  };
  
  const deleteDoctor = async (req, res = response) => {
  
    const doctorId=req.params.id;
    try {
      const doctor=await Doctor.findById(doctorId);
      if(!doctor){
       return res.json({
          ok: false,
          msg: "Doctor does not exist."
        });   
      }
  
      await Doctor.findByIdAndDelete(doctorId);
  
      res.json({
          ok: true,
          msg: doctor.name+ " was deleted successfully",
        });
    } catch (error) {
      res.json({
          ok: false,
          msg: "deleteDoctor",
          error
        });
    }
  };

module.exports = {
  getDoctors,
  createDoctor,
  updateDoctor,
  deleteDoctor,
};
