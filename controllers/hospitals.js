const {response}=require('express');
const Hospital = require('../models/hospital');


const getHospitals =async (req, res=response)=>{
    const hospitals=await Hospital.find().populate('user','name email');
    res.json({
        ok: true,
        msg: 'getHospitals',
        hospitals: hospitals
    });
}

const createHospital =async (req, res=response)=>{
    const uid = req.uid;
    const hospital=new Hospital({
        user: uid,
        ...req.body});
    try {
       const hospitalDb=  await hospital.save()
        res.json({
            ok: true,
            msg: 'createHospital',
            hospital: hospitalDb
        });

    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Talk with the administrator.'
        })
    }
}

const updateHospital =(req, res=response)=>{
    res.json({
        ok: true,
        msg: 'updateHospital'
    });
}

const deleteHospital =(req, res=response)=>{
    res.json({
        ok: true,
        msg: 'deleteHospital'
    });
}

module.exports ={
    getHospitals, createHospital, updateHospital, deleteHospital
}
