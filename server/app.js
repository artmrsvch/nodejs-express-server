const Koa = require("koa");
const app = new Koa();
const static = require("koa-static");
const session = require("koa-session");
const flash = require("koa-better-flash");
const Pug = require("koa-pug");

const pug = new Pug({
    viewPath: "../source/template",
    pretty: false,
    basedir: "../source/template",
    noCache: true,
    app: app
});
const errorHandler = require("./libs/error");
const router = require("./routes/index");
const config = require("./config/index.json");
app.use(static("../public"));
app.use(errorHandler);
app.on("error", (err, ctx) => {
    ctx.request;
    ctx.response.body = {};
    ctx.render("error", {
        status: ctx.response.status,
        error: ctx.response.message
    });
});
app.use(session(config.session, app))
    .use(flash())
    .use(router.routes())
    .use(router.allowedMethods());

app.listen(3000, () => {
    console.log("RUN NA PORTY 3000");
});
