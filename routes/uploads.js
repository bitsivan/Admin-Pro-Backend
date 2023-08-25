/*
    api/uploads
*/

const { Router } = require("express");
const { validateJWT } = require("../middlewares/validate-jwt");
const { fileUpload, returnImages } = require("../controllers/uploads");
const expressFileUpload = require('express-fileupload');

const router = Router();
router.use(expressFileUpload());

router.put("/:type/:id", validateJWT, fileUpload);
router.get('/:type/:picture', returnImages);

module.exports = router;
