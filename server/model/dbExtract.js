const fs = require("fs");
const util = require("util");
const path = require("path");

const writeFile = util.promisify(fs.writeFile);

module.exports = {
    getDB: () => require("./db.json"),
    addUsers: data => {
        const concatDB = data => {
            const store = require("./users.json");
            store.users.push(data);
            return store;
        };
        return new Promise((resolve, reject) => {
            writeFile(path.join(__dirname, "users.json"), JSON.stringify(concatDB(data)))
                .then(() => {
                    console.log("write successful");
                    resolve();
                })
                .catch(e => {
                    reject(e);
                });
        });
    },
    addMessage: data => {
        const concatDB = data => {
            const store = require("./messages.json");
            store.message.push(data);
            return store;
        };
        return new Promise((resolve, reject) => {
            writeFile(path.join(__dirname, "messages.json"), JSON.stringify(concatDB(data)))
                .then(() => {
                    console.log("messages successful added");
                    resolve();
                })
                .catch(e => {
                    reject(e);
                });
        });
    },
    setSkills: data => {
        const concatDB = ({ age, concerts, cities, years }) => {
            const store = require("./db.json");
            store.skills[0].number = age;
            store.skills[1].number = concerts;
            store.skills[2].number = cities;
            store.skills[3].number = years;
            return store;
        };
        return new Promise((resolve, reject) => {
            writeFile(path.join(__dirname, "db.json"), JSON.stringify(concatDB(data)))
                .then(() => {
                    console.log("messages successful added");
                    resolve();
                })
                .catch(e => {
                    reject(e);
                });
        });
    }
};
