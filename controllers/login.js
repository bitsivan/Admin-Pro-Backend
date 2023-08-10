const { response } = require("express");
const { generateJWT } = require("../helpers/jwt");
const User = require("../models/user.model");
const bcrypt = require("bcryptjs");

const login = async (req, res = response) => {
  const { email, password } = req.body;
  try {
    const _user = await User.findOne({ email });
    if (!_user) {
      return res.status(404).json({
        ok: false,
        mng: "Email invalid.",
      });
    }

    //check password
    const validPassword = bcrypt.compareSync(password, _user.password);
    if (!validPassword) {
      return res.status(400).json({
        ok: false,
        msg: "Invalid Password.",
      });
    }

    const token = await generateJWT(_user.id);

    return res.json({
      ok: true,
      token
    });

  } catch (error) {
    return res.status(500).json({
      ok: false,
      msg: "Error login",
    });
  }
};

module.exports = {
  login,
};
