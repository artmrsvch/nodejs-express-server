const db = require("../model/dbExtract");

module.exports = {
    getLogin: (req, res) => {
        res.render("login", { msglogin: req.flash("login") });
    },
    setLogin: async (req, res) => {
        try {
            await db.addUsers(req.body);
            req.flash("login", "Успешная авторизация");
            res.redirect("admin");
        } catch (message) {
            req.flash("login", message);
            res.redirect("login");
        }
    }
};
