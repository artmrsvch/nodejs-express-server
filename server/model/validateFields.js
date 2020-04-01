module.exports = {
    isEmpty: data => {
        for (str in data) {
            if (data[str].trim() === "") return true;
        }
    }
};
