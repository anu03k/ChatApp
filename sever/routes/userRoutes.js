// const { register } = require("../controllerss/userController");

// const router = require("express").Router();
// router.post("/register", register)

// module.exports = router;
const { register, login, setAvatar } = require("../controllers/userController");
const router = require("express").Router();
// router .post define a route that handle htttp post req
router.post("/register", register);
router.post("/login", login);
router.post("/setAvatar/:id", setAvatar)
    //  these pages will handle post req   (route , handler function)
module.exports = router;