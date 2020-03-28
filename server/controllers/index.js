const db = require("../model/dbExtract");
const { skills, products } = db.getDB();

module.exports = {
    getIndex: (req, res) => {
        res.render("index", {
            skills: skills || [],
            products: products || []
        });
    },
    message: async (req, res) => {
        await db.addMessage(req.body);
        res.render("index", {
            skills: skills || [],
            products: products || []
        });
    }
};
