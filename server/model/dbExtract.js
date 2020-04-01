const fs = require("fs");
const util = require("util");
const path = require("path");
const Events = require("events");

const unlink = util.promisify(fs.unlink);
const writeFile = util.promisify(fs.writeFile);
const { isEmpty } = require("./validateFields");

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
const getFiles = (fields, filePath) => {
    return new Promise(async (resolve, reject) => {
        const upload = path.join("../public", "assets", "img", "products");

        if (isEmpty(fields)) {
            await unlink(filePath);
            reject("Все поля должны быть заполнены");
        }
        const fileName = path.join(upload, fields.photo);

        fs.rename(filePath, fileName, err => {
            err && reject(err);
            resolve({
                src: `./assets/img/products/${fields.photo}`,
                name: fields.name,
                price: fields.price
            });
        });
    });
};
module.exports = {
    getDB: () => require("./db/db.json"),
    addUsers: data => {
        return new Promise((resolve, reject) => {
            isEmpty(data)
                ? reject("Все поля должны быть заполнены")
                : emiter.emit("apply", resolve, reject, applyData("users", data));
        });
    },
    addMessage: data => {
        return new Promise((resolve, reject) => {
            isEmpty(data)
                ? reject("Все поля должны быть заполнены")
                : emiter.emit("apply", resolve, reject, applyData("messages", data));
        });
    },
    setSkills: data => {
        return new Promise((resolve, reject) => {
            isEmpty(data)
                ? reject("Все поля должны быть заполнены")
                : emiter.emit("apply", resolve, reject, replaceData(data));
        });
    },
    addProduct: (fields, filePath) => {
        return new Promise(async (resolve, reject) => {
            try {
                const data = await getFiles(fields, filePath);
                emiter.emit("apply", resolve, reject, applyData("products", data));
            } catch (message) {
                reject(message);
            }
        });
    }
};
