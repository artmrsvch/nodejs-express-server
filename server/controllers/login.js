const db = require("../model/dbExtract");

module.exports = {
    getLogin: async (ctx, next) => {
        await ctx.render("pages/login");
    },
    setLogin: async (ctx, next) => {
        try {
            await db.addUsers(ctx.request.body);
            ctx.redirect("admin");
        } catch (message) {
            ctx.redirect("login");
        }
    }
};
