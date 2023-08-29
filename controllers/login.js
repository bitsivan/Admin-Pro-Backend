const { response } = require("express");
const { generateJWT } = require("../helpers/jwt");
const User = require("../models/user.model");
const bcrypt = require("bcryptjs");
const { googleVerify } = require("../helpers/google-verify");

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
      token,
    });
  } catch (error) {
    return res.status(500).json({
      ok: false,
      msg: "Error login",
    });
  }
};

const googleSignIn = async (req, resp = response) => {
  try {
    const {email, name, picture} = await googleVerify(req.body.token);

    const userDB = await User.findOne({email});
    let user;

    if(!userDB){
      user=new User({
        name: name,
        email,
        password: '@@',
        img: picture,
        google: true
      })
    }else{
      use=userDB;
      user.google=true;
    }

    //save user 
    await user.save();

    //Generate Token
    const token = await generateJWT(user.id);

    resp.json({
      ok: true,
      email, name, picture,
      token
    });
  } catch (error) {
    resp.status(400).json({
      ok: false,
      msg: 'Google Token is not valid.',
    });
  }

};

module.exports = {
  login,
  googleSignIn,
};
