///-->api/hospitals

// /api/users
const { Router } = require("express");
const { getUsers, createUser, updateUser, deleteUser } = require("../controllers/users");
const { check } = require("express-validator");
const { validateFields } = require('../middlewares/validate-fields');
const { validateJWT } = require("../middlewares/validate-jwt");
const { getHospitals, createHospital, updateHospital, deleteHospital } = require("../controllers/hospitals");
const { getDoctors, createDoctor, updateDoctor, deleteDoctor } = require("../controllers/doctors");

const router = Router();

router.get("/", getDoctors);

router.post(
  "/",
  [
    validateJWT,
    check('name', 'The name of doctor is required.').not().isEmpty(),
    check('hospital', 'The hospital id should be valid.').isMongoId(),
    validateFields
  ],
  createDoctor
);

router.put("/:id",
    [
      validateJWT,
      check('name', 'Te name of doctor is required.').not().isEmpty(),
      check('hospital', 'The hospital id is required.').not().isEmpty(),
      validateFields
    ],
    updateDoctor);

router.delete('/:id', validateJWT, deleteDoctor);

module.exports = router;
