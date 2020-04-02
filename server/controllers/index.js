const db = require("../model/dbExtract");
const { skills, products } = db.getDB();

module.exports = {
    getIndex: async (ctx, next) => {
        await ctx.render("pages/index", {
            skills: skills || [],
            products: products || [],
            msgemail: ctx.flash("message")
        });
    },
    message: async (ctx, next) => {
        try {
            await db.addMessage(ctx.request.body);
            ctx.flash("message", "Сообщение успешно отправлено");
        } catch (message) {
            ctx.flash("message", message);
        }
        ctx.redirect("/");
    }
};
