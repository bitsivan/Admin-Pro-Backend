///-->api/hospitals

// /api/users
const { Router } = require("express");
const { getUsers, createUser, updateUser, deleteUser } = require("../controllers/users");
const { check } = require("express-validator");
const { validateFields } = require('../middlewares/validate-fields');
const { validateJWT } = require("../middlewares/validate-jwt");
const { getHospitals, createHospital, updateHospital, deleteHospital } = require("../controllers/hospitals");
const { validate } = require("uuid");

const router = Router();

router.get("/", getHospitals);

router.post(
  "/",
  [
    validateJWT,
    check('name', 'Te name of hospital is required.').not().isEmpty(),
    validateFields
  ],
  createHospital
);

router.put("/:id",
    [
      validateJWT,
      check('name', 'Te name of hospital is required.').not().isEmpty(),
      validateFields
    ],
    updateHospital);

router.delete('/:id', validateJWT, deleteHospital);

module.exports = router;
