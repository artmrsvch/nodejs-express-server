const db = require("../model/dbExtract");

module.exports = {
    getLogin: (req, res) => {
        res.render("login");
    },
    setLogin: async (req, res) => {
        console.log(req.body);
        await db.addUsers(req.body);
        res.redirect("admin");
    }
};
