const Router = require("koa-router");
const router = new Router();
const koaBody = require("koa-body");
const path = require("path");
const { getIndex, message } = require("../controllers/index");
const { getLogin, setLogin } = require("../controllers/login");
const controllerAdmin = require("../controllers/admin");

router.get("/", getIndex);
router.post("/", koaBody(), message);
router.get("/login", getLogin);
router.post("/login", koaBody(), setLogin);
router.get("/admin", controllerAdmin.getAdmin);
router.post("/admin/skills", koaBody(), controllerAdmin.setSkills);
router.post(
    "/admin/update",
    koaBody({
        multipart: true,
        formidable: {
            uploadDir: path.join(process.cwd(), "../public", "assets", "img", "products")
        }
    }),
    controllerAdmin.addProduct
);

module.exports = router;
