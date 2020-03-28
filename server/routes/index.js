const express = require("express");
const router = express.Router();
const controllerIndex = require("../controllers/index");
const controllerLogin = require("../controllers/login");
const controllerAdmin = require("../controllers/admin");

router.get("/", controllerIndex.getIndex);
router.post("/", controllerIndex.message);
router.get("/login", controllerLogin.getLogin);
router.post("/login", controllerLogin.setLogin);
router.get("/admin", controllerAdmin.getAdmin);
router.post("/admin/skills", controllerAdmin.setSkills);
router.post("/admin/update", controllerAdmin.addProduct);

module.exports = router;
