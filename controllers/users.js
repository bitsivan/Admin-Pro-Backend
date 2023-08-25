const { response } = require("express");
const User = require("../models/user.model");
const bcrypt = require("bcryptjs");
const { generateJWT } = require("../helpers/jwt");

const getUsers = async (req, res) => {
  const from=Number(req.query.from) || 0;
  console.log(from);
  // const user = await User.find({}, "name email")
  //                         .skip(0)
  //                         .limit(from);
  // const total = await User.count();         

  const [users, total]=await Promise.all([
    User.find({}, "name email")
                             .skip(0)
                             .limit(from),
    User.countDocuments()
  ])
  res.json({
    ok: true,
    users,
    uid: req.uid,
    total: total
  });
};

const createUser = async (req, res = response) => {
  const { email, password, name } = req.body;
  console.log(req.body);

  try {
    const existEmail = await User.findOne({ email });

    if (existEmail) {
      return res.status(400).json({
        ok: false,
        msg: "Email already registered.",
      });
    }
    const user = new User(req.body);

    //Encrypt password
    const salt = bcrypt.genSaltSync();
    user.password = bcrypt.hashSync(password, salt);

    await user.save();
    
    const token =await generateJWT(user.uid);

    res.json({
      ok: true,
      user,
      token
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Error... review logs",
    });
  }
};

const updateUser = async (req, res=response)=>{
    const uid=req.params.id;
    try {
        const _user = await User.findById(uid);
        if(!_user){
            return res.status(404).json({
                ok: false,
                msg: 'Dont exist the user by id'
            });
        }

        //updates
        const {password, google, email, ...campos} = req.body;
        if(_user.email !== email){
            const existEmail = await User.findOne({email});
            if(existEmail){
                return res.status(400).json({
                    ok: false,
                    msg:'The user already exist.'
                });
            }
        }

        campos.email = email;

        const userUpdated = await User.findByIdAndUpdate(uid, campos,{new: true});

        res.json({
            ok: true,
            user: userUpdated
        })


    } catch (error) {
        console.log(error);
        resizeBy.status(500).json({
            ok: false,
            msg: 'Error unexpected'
        })
    }
}

const deleteUser = async (req, res=response) =>{
    try {
      const id=req.params.id;
      
      const _user=await User.findById(id);
      if(!_user){
        return res.status(404).json({
            ok: false,
            msg: 'The user does not exist in the db.'
        })
      }

      await User.findByIdAndDelete(id);

      res.json({
        ok: true,
        msg:'User deleted successfully.'
      })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'error deleting user.'
        })
    }
}

module.exports = {
  getUsers,
  createUser,
  updateUser,
  deleteUser
};
