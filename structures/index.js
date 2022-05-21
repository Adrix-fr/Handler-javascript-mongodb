const {
    Client,
    Collection
} = require('discord.js');

const client = new Client({
    intents: 32767
});

const {
    Token
} = require(
    '../structures/config.json'
);

client.commands = new Collection()

require('./handlers/Events')(client);
require('./handlers/commands')(client);

client.login(Token);