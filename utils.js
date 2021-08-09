const fs = require('fs');
const { promisify } = require('util');
const readFileAsync = promisify(fs.readFile);
const writeFileAsync = promisify(fs.writeFile);


const utils = {
    getNotes: async () => {
        try {
            const notes = await readFileAsync('./Develop/db/db.json');
            return JSON.parse(notes);
        } catch (err) {
            console.log(err);
        }
    },

    updateFile: async (notes) => {
        try {
            await writeFileAsync('./Develop/db/db.json', JSON.stringify(notes));
        } catch (err) {
            console.log(err);
        }
    },

    deleteNote: async (id) => {
        try {
            const notes = await readFileAsync('./Develop/db/db.json');
            const filteredArr = JSON.parse(notes).filter((note) => note.id !== id);
            console.log(filteredArr);
            writeFileAsync('./Develop/db/db.json', JSON.stringify(filteredArr))
            return { ok: true }
        } catch (err) {
            console.log(err)
        }
    }
}

module.exports = utils;