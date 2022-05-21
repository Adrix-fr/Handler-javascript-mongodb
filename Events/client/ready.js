const {
    Client
} = require('discord.js');

const mongoose = require('mongoose');

const {
    Database
} = require('../../structures/config.json');

module.exports = {
    name: "ready",
    description: "L'event ready du bot",
    once: true,

    /**
     * @param {Client} client 
     */
    execute(client) {
        console.log(`${client.user.tag} est maintenant en ligne ✅`)

        if (!Database) return;

        mongoose.connect(Database, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        }).then(() => {
            console.log(`${client.user.tag} est maintenant connecté a la database ✅`)
        }).catch((err) => {
            console.log(err)
        })
    }
}