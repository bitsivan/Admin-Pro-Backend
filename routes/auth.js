//path: /api/login
const { Router } = require("express");
const { login, googleSignIn } = require("../controllers/login");
const { check } = require("express-validator");
const { validateFields } = require("../middlewares/validate-fields");

const router = Router();

router.post(
  "/",
  [
    check("email", "email is required").isEmail(),
    check("password", "password is required").not().isEmpty(),
    validateFields,
  ],
  login
);

router.post(
  "/google",
  [
    check("token", "Googlee Token is required").not().isEmpty(),
    validateFields,
  ],
  googleSignIn
);
module.exports = router;
