const fs = require("fs");
const util = require("util");
const path = require("path");
const Events = require("events");
const formidable = require("formidable");
const writeFile = util.promisify(fs.writeFile);

const emiter = new Events();

emiter.on("apply", (resolve, reject, data) => {
    writeFile(path.join(__dirname, "db/db.json"), JSON.stringify(data))
        .then(() => {
            resolve();
        })
        .catch(e => {
            reject(e);
        });
});

const applyData = (key, data) => {
    const store = require("./db/db.json");
    store[key].push(data);
    return store;
};
const replaceData = ({ age, concerts, cities, years }) => {
    const store = require("./db/db.json");
    store.skills[0].number = age;
    store.skills[1].number = concerts;
    store.skills[2].number = cities;
    store.skills[3].number = years;
    return store;
};
const getFiles = req => {
    return new Promise((resolve, reject) => {
        const form = new formidable.IncomingForm();
        const upload = path.join("../public", "assets", "img", "products");

        form.uploadDir = path.join(process.cwd(), upload);

        form.parse(req, (err, fields, files) => {
            err && reject(err);
            const fileName = path.join(upload, files.photo.name);

            fs.rename(files.photo.path, fileName, err => {
                err && reject(err);
                resolve({
                    src: `./assets/img/products/${files.photo.name}`,
                    ...fields
                });
            });
        });
    });
};
module.exports = {
    getDB: () => require("./db/db.json"),
    addUsers: data => {
        return new Promise((resolve, reject) => {
            emiter.emit("apply", resolve, reject, applyData("users", data));
        });
    },
    addMessage: data => {
        return new Promise((resolve, reject) => {
            emiter.emit("apply", resolve, reject, applyData("messages", data));
        });
    },
    setSkills: data => {
        return new Promise((resolve, reject) => {
            emiter.emit("apply", resolve, reject, replaceData(data));
        });
    },
    addProduct: req => {
        return new Promise(async (resolve, reject) => {
            const data = await getFiles(req);
            emiter.emit("apply", resolve, reject, applyData("products", data));
        });
    }
};
