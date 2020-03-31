const db = require("../model/dbExtract");

module.exports = {
    getAdmin: (req, res) => {
        res.render("admin", {
            msgskill: req.flash("skill"),
            msgfile: req.flash("file")
        });
    },
    addProduct: async (req, res) => {
        try {
            await db.addProduct(req);
            req.flash("file", "Продукт успешно добавлен");
        } catch (message) {
            req.flash("file", message);
        }
        res.redirect(".");
    },
    setSkills: async (req, res) => {
        try {
            await db.setSkills(req.body);
            req.flash("skill", "Скиллы успешно обновленны");
        } catch (message) {
            req.flash("skill", message);
        }
        res.redirect(".");
    }
};
