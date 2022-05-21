# Discord-Protect
## Un module de Protection configurable :

### AntiBot

```js
const Discord = require('discord.js');
const Client = new Discord.Client({ intents: 32767 });
const Protect = require("discord-protect");
Client.login("TOKEN");

Client.on('ready', () => console.log(`${Client.user.tag} en ligne!`));

Client.on('guildMemberAdd', member => {
  Protect.AntiBot({ Member: member, Status: true, Action: { Type: "BAN", Reason: "AntiBot Actif!" } });

  /*
  Options:
  Member: Discord Member
  Status: Boolean (true/false)

  Action: Object:
  Type: String (BAN/KICK)
  Reason: "Reason for Ban/Kick"
  */
})
```

### AntiJoin

```js
const Discord = require('discord.js');
const Client = new Discord.Client({ intents: 32767 });
const Protect = require("discord-protect");
Client.login("TOKEN");

Client.on('ready', () => console.log(`${Client.user.tag} en ligne!`));

Client.on('guildMemberAdd', member => {
  Protect.AntiJoin({ Member: member, Status: true, Action: { Type: "BAN", Reason: "AntiBot Actif!" } });

  /*
  Options:
  Member: Discord Member
  Status: Boolean (true/false)

  Action: Object:
  Type: String (BAN/KICK)
  Reason: "Reason for Ban/Kick"
  */
})
```

### AntiLink

```js
const Discord = require('discord.js');
const Client = new Discord.Client({ intents: 32767 });
const Protect = require("discord-protect");
Client.login("TOKEN");

Client.on('ready', () => console.log(`${Client.user.tag} en ligne!`));

Client.on('messageCreate', message => {
  Protect.AntiLink({ Status: true, Message: message });

  /*
  Options:
  Message: Discord Message
  Status: Boolean (true/false)
  */
})
```

### AntiSpam

```js
const Discord = require('discord.js');
const Client = new Discord.Client({ intents: 32767 });
const Protect = require("discord-protect");
const AntiSpamSettings = new Protect.AntiSpamSettings({ Warn: { Messages: 7, Reply: "Attention [member] (**[memberTag]**), veuillez ralentir !" }, Sanction: { Messages: 10, Type: "KICK", Reason: "Antispam Actif", Reply: "Le membre [member] **[memberTag]** a été exclu du serveur." }, TimeoutDeleteCollection: 10000 });

/*
Options:
Warn: Object:
Messages: Number | Minimum Messages for Warned Member
Reply: String | Message Reply

Sanction: Object:
Messages: Number | Maximum Messages for banned/kicked Member
Type: String | Sanction (BAN/KICK)
Reason: String | Reason to Kick/Ban Member
Reply: String | Message Reply

TimeoutDeleteCollection: Number | Timeout AntiSpam
*/

Client.login("TOKEN");

Client.on('ready', () => console.log(`${Client.user.tag} en ligne!`));

Client.on('messageCreate', message => {
  AntiSpamSettings.AntiSpam({ Status: true, Message: message });

  /*
  Options:
  Message: Discord Message
  Status: Boolean (true/false)
  */
})
```

#### Support:

Notre support est présent sur le support de mon bot Discord (Winter):
https://discord.gg/hsmD2Q3mjS

By: Kurama#0001
