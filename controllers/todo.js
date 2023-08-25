const { response } = require("express");
const User = require("../models/user.model");
const Hospital = require("../models/hospital");
const Doctor = require("../models/doctor");

const getTodo = async (req, res = response) => {
  try {
    const search = req.params.search;
    const regExpr = new RegExp(search, "i");
    // const users=await User.find({
    //     name: regExpr
    // });
    // const hospitals= await Hospital.find({
    //     name: regExpr
    // })
    // const doctors=await Doctor.find({
    //     name: regExpr
    // })

    const [users, doctors, hospitals] = await Promise.all([
      User.find({ name: regExpr }),
      Doctor.find({ name: regExpr }),
      Hospital.find({ name: regExpr }),
    ]);

    res.json({
      ok: true,
      msn: "getTodo",
      search,
      users,
      doctors,
      hospitals,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Contact the Administrator",
    });
  }
};

const getDocumentsCollection = async (req, res = response) => {
  try {
    const table = req.params.table;
    const search = req.params.search;
    const regExpr = new RegExp(search, "i");
    let data = [];
    switch (table) {
      case 'doctors':
        data = await Doctor.find({ name: regExpr })
          .populate("user", "name email")
          .populate("hospital", "name");
        break;
      case 'users':
        data = await User.find({ name: regExpr });

        break;
      case 'hospitals':
        data = await Hospital.find({ name: regExpr }).populate(
          "user",
          "name email"
        );
        break;

      default:
        return res.status(400).json({
          ok: false,
          msgg: "The table should be users/doctors/hospitals.",
        });
    }

    //   const [users, doctors, hospitals]=await Promise.all([
    //       User.find({name: regExpr}),
    //       Doctor.find({name: regExpr}),
    //       Hospital.find({name: regExpr})
    //   ])

    // res.json({
    //   ok: true,
    //   msn: "getTodo",
    //   search,
    //   users,
    //   doctors,
    //   hospitals,
    // });


    res.json({
        ok: true,
        results: data,
      });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Contact the Administrator",
    });
  }
};

module.exports = {
  getTodo,
  getDocumentsCollection,
};
