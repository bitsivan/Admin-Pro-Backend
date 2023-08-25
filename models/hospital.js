const { Schema, model } = require('mongoose');

const HospitalSquema = Schema({
  name: {
    type: String,
    required: true,
  },
  img: {
    type: String,
  },
  user:{
    required: true,
    type: Schema.Types.ObjectId,
    ref:'User'
  }
});

HospitalSquema.method('toJSON', function(){
  const { __v, _id, password, ...object }=this.toObject();
  object.uid=_id;
  return object;
})

module.exports = model("Hospital", HospitalSquema);
