const {
    CommandInteraction,
    MessageEmbed,
    MessageActionRow,
    MessageButton
} = require('discord.js');
const {
    Client
} = require('discord.js')
module.exports = {
        name: "help",
        description: "Permet de donner les commandes du bot",
        directory: "NOM DE LA CATEGORIE POUR LA COMMANDE HELP",

        /**
         * @param {CommandInteraction} interaction
         * @param {Client} client
         */
        async execute(interaction, client) {

            try {
                if (!interaction.isCommand()) return;

                await interaction.deferReply().catch((_) => {})

                const dirs = [...new Set(client.commands.map((c) => c.directory))];

                const helpArray = dirs.map((d) => {
                    const getCmd = client.commands.filter((c) => c.directory === d).map((c) => {
                        return {
                            name: c.name || "Aucun nom",
                            description: c.description || "Aucune description"
                        }
                    })
                    return {
                        name: d,
                        commands: getCmd,
                    }
                })
                let pageNo = 1;


                const embed = new MessageEmbed()
                    .setColor('BLUE')
                    .setThumbnail(client.user.displayAvatarURL({
                        size: 4096
                    }))
                    .setTimestamp()
                    .setFooter({
                        text: `Page ${pageNo}/${helpArray.length}`
                    })

                const getButtons = (pageNo) => {
                    return new MessageActionRow().addComponents(
                        new MessageButton().setLabel('précédent').setCustomId('prev').setStyle('DANGER').setDisabled(pageNo < 1),
                        new MessageButton().setLabel('Suivant').setCustomId('next').setStyle('DANGER').setDisabled(!(pageNo < helpArray.length)),
                    )
                };

                embed.setTitle(`**__Categorie :__** \`${helpArray[pageNo-1].name}\``).addFields(
                    helpArray[0].commands.map(({ name, description }) => {
                        console.log(name, description)
                        return {
                            name: `\`${name}\``,
                            value: `${description}`,
                            inline: true
                        };
                    })
                    );

                    const intrMsg = await interaction.editReply({
                        embeds: [embed],
                        components: [getButtons(pageNo)],
                        fetchReply: true
                    })

                    const collector = intrMsg.createMessageComponentCollector({time: 600000, componentType: "BUTTON"});

                    collector.on("collect", async i => {
                        if(i.customId === "next"){
                            pageNo++;
                        } else if (i.customId === "prev"){
                            pageNo--;
                        }

                        const categ = helpArray[pageNo-1];

                        embed.fields = [];
                        embed.setTitle(`**__Categorie :__** \`${categ.name}\``).addFields(
                            categ.commands.map(({ name, description }) => {
                                return {
                                    name: `\`${name}\``,
                                    value: `${description}`,
                                    inline: true
                                };
                            })
                            ).setFooter({text: `Page ${pageNo}/${helpArray.length}`});

                            await i.update({embeds: [embed], components: [getButtons(pageNo)], fetchReply: true})
                    })
                }
                catch (err) {
                    console.log("Quelque chose a mal tourné", err)
                }
            }
        }
