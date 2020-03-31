const db = require("../model/dbExtract");
const { skills, products } = db.getDB();

module.exports = {
    getIndex: (req, res) => {
        res.render("index", {
            skills: skills || [],
            products: products || [],
            msgsemail: req.flash("message")
        });
    },
    message: async (req, res) => {
        try {
            await db.addMessage(req.body);
            req.flash("message", "Сообщение успешно отправлено");
        } catch (message) {
            req.flash("message", message);
        }
        res.redirect("/");
    }
};
