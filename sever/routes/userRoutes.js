// const { register } = require("../controllerss/userController");

// const router = require("express").Router();
// router.post("/register", register)

// module.exports = router;
const { register, login } = require("../controllers/userController");
const router = require("express").Router();

router.post("/register", register);
router.post("/login", login);

module.exports = router;