const { Schema, model } = require('mongoose');

const DoctorSquema = Schema({
  name: {
    type: String,
    required: true,
  },
  img: {
    type: String,
  },
  user:{
    type: Schema.Types.ObjectId,
    ref:'User',
    required: true
  },
  hospital:{
    type: Schema.Types.ObjectId,
    ref: 'Hospital',
    required: true
  }
});

DoctorSquema.method('toJSON', function(){
  const { __v, _id, password, ...object }=this.toObject();
  object.uid=_id;
  return object;
})

module.exports = model("Doctor", DoctorSquema);
