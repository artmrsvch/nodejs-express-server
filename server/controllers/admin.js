const db = require("../model/dbExtract");

module.exports = {
    getAdmin: (req, res) => {
        res.render("admin", {
            msgskill: req.flash("successSkill"),
            msgfile: req.flash("successFile")
        });
    },
    addProduct: async (req, res) => {
        await db.addProduct(req);
        req.flash("successFile", "Продукт успешно добавлен");
        res.redirect(".");
    },
    setSkills: async (req, res) => {
        await db.setSkills(req.body);
        req.flash("successSkill", "Скиллы успешно обновленны");
        res.redirect(".");
    }
};
