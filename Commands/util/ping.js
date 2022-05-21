const {
    CommandInteraction,
    MessageEmbed
} = require('discord.js');
const {
    Client
} = require('discord.js')
module.exports = {
    name: "ping",
    description: "Donne la latence du bot + api",

    /**
     * @param {CommandInteraction} interaction
     * @param {Client} client
     */
    execute(interaction, client) {
        let api = client.ws.ping
        const embed = new MessageEmbed()
        embed.addField("API", `${api}`, true)
        embed.setColor("#06c8c3")
        interaction.reply({
            embeds: [embed],
            fetchReply: true
        }).then(msg => {
            embed.addField('BOT', `${msg.createdAt - interaction.createdAt}`, true)
            interaction.editReply({
                embeds: [embed]
            }).catch(e => {})
        })
    }

}
