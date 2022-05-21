## Comment lancer le bot ?

#### Première étape :

Allez dans `config.js` et changez le [Token](https://discord.com/developers), puis incérer votre lien [Database](https://www.mongodb.com/atlas)
```json
{
    "Token": "TOKEN",
    "Database": "URL DATABASE"
}
```

#### Deuxième étape :

Allez dans le fichier `structures/handlers/commands` puis mettre l'identifiant de votre serveur

```js
    client.on("ready", async (client) => {
        const MainGuild = await client.guilds.cache.get("IDENTIFIANT GUILD");

        MainGuild.commands.set(CommandsArray).then(async (command) => {
            MainGuild.commands.set(CommandsArray);
        });
    })
```

## Aide ?

Si tout problème envers le code ou autre, veuillez me contacter sur discord ($'Airi.#9999)

By: $'Airi.#9999
