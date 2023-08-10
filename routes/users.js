// /api/users
const { Router } = require("express");
const { getUsers, createUser, updateUser, deleteUser } = require("../controllers/users");
const { check } = require("express-validator");
const { validateFields } = require('../middlewares/validate-fields');
const { validateJWT } = require("../middlewares/validate-jwt");

const router = Router();

router.get("/", validateJWT, getUsers);

router.post(
  "/",
  [
      validateJWT,
      check("name",'name is required.').not().isEmpty(),
      check("password",'password is required').not().isEmpty(),
      check("role",'Role is required').not().isEmpty(),
      check("email").isEmail(),
      validateFields,
  ],
  createUser
);

router.put("/:id",
    [
        validateJWT,
        check("name",'name is required.').not().isEmpty(),
        check("email").isEmail(),
        validateFields,
    ],
    updateUser);

router.delete('/:id', validateJWT, deleteUser);

module.exports = router;
