const {
    Client
} = require('discord.js');
const {
    promisify
} = require('util');
const {
    glob
} = require('glob');

const PG = promisify(glob);
const Ascii = require('ascii-table')

/**
 * @param {Client} client
 */
module.exports = async (client) => {
    const Table = new Ascii("Command Loaded");

    CommandsArray = [];

    (await PG(`${(process.cwd().replace(/\\/g, "/"))}/Commands/*/*.js`)).map(async (file) => {
        const command = require(file)

        if (!command.name)
            return Table.addRow(file.split("/")[7], "❌ Failed", "Missing a name")

        if (!command.description)
            return Table.addRow(command.name, "❌ Failed", "Missing a description")

        client.commands.set(command.name, command)
        CommandsArray.push(command);

        await Table.addRow(command.name, "✅ SUCCESSFUL");
    });

    console.log(Table.toString());


    client.on("ready", async (client) => {
        const MainGuild = await client.guilds.cache.get("IDENTIFIANT GUILD");

        MainGuild.commands.set(CommandsArray).then(async (command) => {
            MainGuild.commands.set(CommandsArray);
        });
    })
}
