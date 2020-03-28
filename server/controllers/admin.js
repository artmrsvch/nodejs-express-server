const db = require("../model/dbExtract");

module.exports = {
    getAdmin: (req, res) => {
        res.render("admin");
    },
    addProduct: async (req, res) => {
        console.log(req.body);
        res.render("admin");
    },
    setSkills: async (req, res) => {
        await db.setSkills(req.body);
        res.redirect("../");
    }
};
