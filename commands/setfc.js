const Discord = require('discord.js')

module.exports.run = async (bot, msg, args, db) => {
    if(args.length == 1) {
        var content = args[0]
        if(content.length != 14 || content.search(/\d\d\d\d-\d\d\d\d-\d\d\d\d/gi) == -1) {
            return msg.channel.send({"embed": { "title": ":x: > **Switch Friend Code format invalid ! Please enter your FC without the 'SW-' at the beginning**", "color": 13632027 }});
        }

        var userDB = await db.get('user').find({ id: msg.author.id }).value();
        if(userDB.fc != null) {
            return msg.channel.send({"embed": { "title": ":x: > **You can't change your FC !**", "description": "**Contact <@125325519054045184> for any demand of change.**", "color": 13632027 }});
        }

        await db.get('user').find({ id: msg.author.id }).set('fc', content).write();
        const embed = new Discord.MessageEmbed();
        embed.setAuthor("Your Switch FC is now set to : ", msg.author.avatarURL);
        embed.setTitle(`**${content}**`)
        embed.setColor('AQUA')
        try {
            console.log(`info: switch fc of ${msg.author.tag} set`)
            return await msg.channel.send(embed).then(msg.delete())
        } catch(err) {
            console.error(err);
        }
    }
};

module.exports.help = {
    name: 'setfc',
    usage: "?setfc (your Switch FC)",
    desc: "Register your Switch Friend Code to Q-Bot\nPlease enter your FC without 'SW-' at the beginning"
};