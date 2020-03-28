const db = require("../model/dbExtract");
const { skills, products } = db.getDB();

module.exports = {
    getIndex: (req, res) => {
        res.render("index", {
            skills: skills || [],
            products: products || [],
            msgsemail: req.flash("success")
        });
    },
    message: async (req, res) => {
        await db.addMessage(req.body);
        req.flash("success", "Сообщение успешно отправлено");
        res.redirect("/");
    }
};
