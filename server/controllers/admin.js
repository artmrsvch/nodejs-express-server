const db = require("../model/dbExtract");

module.exports = {
    getAdmin: (req, res) => {
        res.render("admin");
    },
    addProduct: async (req, res) => {
        await db.addProduct(req);
        res.redirect("../");
    },
    setSkills: async (req, res) => {
        await db.setSkills(req.body);
        res.redirect("../");
    }
};
