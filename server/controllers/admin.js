const db = require("../model/dbExtract");

module.exports = {
    getAdmin: async (ctx, next) => {
        await ctx.render("pages/admin", {
            msgskill: ctx.flash("skill"),
            msgfile: ctx.flash("product")
        });
    },
    addProduct: async (ctx, next) => {
        try {
            await db.addProduct(
                { ...ctx.request.body, photo: ctx.request.files.photo.name },
                ctx.request.files.photo.path
            );
            ctx.flash("product", "Продукт успешно добавлен");
        } catch (message) {
            console.log(message);
            ctx.flash("product", message);
        }
        ctx.redirect(".");
    },
    setSkills: async (ctx, next) => {
        try {
            await db.setSkills(ctx.request.body);
            ctx.flash("skill", "Скилы успешно обновлены");
        } catch (message) {
            ctx.flash("skill", message);
        }
        ctx.redirect(".");
    }
};
