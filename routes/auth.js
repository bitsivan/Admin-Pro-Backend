//path: /api/login
const { Router } = require("express");
const { login, googleSignIn, renewToken } = require("../controllers/login");
const { check } = require("express-validator");
const { validateFields } = require("../middlewares/validate-fields");
const { validateJWT } = require("../middlewares/validate-jwt");

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

router.get('/renew',
  validateJWT,
  renewToken
)
module.exports = router;
