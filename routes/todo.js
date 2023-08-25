const { Router } = require("express");
const { getTodo, getDocumentsCollection } = require ('../controllers/todo');
const { validateJWT } = require("../middlewares/validate-jwt");

const router = Router();
router.get("/:search", validateJWT, getTodo);

router.get("/collection/:table/:search", validateJWT, getDocumentsCollection);

module.exports = router;
