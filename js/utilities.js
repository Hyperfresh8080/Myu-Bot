const Discord = require('discord.js')

const al = require('anilist-node');
const Anilist = new al();

module.exports = class utilities {

    static async ping (msg, author, bot) {

        var ping = Math.ceil(bot.ping)
        await msg.channel.send("pong ! `" + ping + "ms`")
            .then(console.log("[" + new Date().toLocaleTimeString() + "] Ping : " + author))
            .catch(console.error);

    }

    static async pong (msg, author, bot) {

        var ping = Math.ceil(bot.ping)
        await msg.channel.send("ping ! `" + ping + "ms`")
            .then(console.log("[" + new Date().toLocaleTimeString() + "] Ping : " + author))
            .catch(console.error);

    }

    static async info (msg, iwaUrl) {

        var embed = {
            "embed": {
                "title": "**Bot Infos**",
                "description": "Q-Bot is developed and handled by     <@125325519054045184>\n\nLanguage : `JavaScript` using NodeJS\nAPI Access   : `discord.js` package on npm\n\nYou can access to the index of commands  by typing `?help`\n\nAll my work is done for free, but you can still support me [here](https://paypal.me/nokushi)",
                "color": 13002714,
                "footer": {
                  "text": "Created with ♥ by iwa | Copyright © iwa, v1.0.0"
                },
                "thumbnail": {
                  "url": iwaUrl
                }
            }
        }

        try {
            console.log("[" + new Date().toLocaleTimeString() + "] Info sent to " + msg.author.tag)
            await msg.author.send(embed)
        } catch(ex) {
            return error.no(9, msg)
        }

    }

    static leaderboard (msg, cont, author, Discord, mongod, db, bot) {

        if(cont.length > 2)return;

        switch(cont[1]) {
            case "xp":
            case "exp":
                return xp(msg, author, Discord, db, bot)

            case "pat":
            case "pats":
            case "patpat":
            case "patpats":
                return pat(msg, author, Discord, db, bot)

            case "hug":
            case "hugs":
                return hug(msg, author, Discord, db, bot)

            case "boop":
            case "boops":
                return boop(msg, author, Discord, db, bot)

            default:
                msg.channel.send({"embed": { "title": "`exp | pat | hug | boop`", "color": 3396531}});
            break;
        }

        return mongod.close();

    }

    static async role (msg, cont) {

        if(await msg.channel.type != "text")return;
        if(await msg.guild.id != "225359327525994497")return;
        if(await msg.channel.id != "611349541685559316")return;

        if(cont.length < 3)return;

        var req = cont[1];
        cont.splice(0, 2);
        var game = cont.join(' ').toLowerCase();

        switch(req) {
            case "join":
                return join(msg, game);

            case "leave":
                return leave(msg, game);
        }

    }

    static async anime (msg, cont, error) {

        if(cont.length < 2)return;
        cont.shift();
        var req = cont.join(' ');

        Anilist.search('anime', req, 1, 1).then(async data => {
            var res = data.media[0];
            var info = await Anilist.media.anime(res.id)
            const embed = new Discord.RichEmbed();
            embed.setTitle("**" + info.title.romaji + " / " + info.title.english + "**")
            embed.setThumbnail(info.coverImage.large)
            embed.addField("Status", info.status, true)
            if(info.episodes != null)
                embed.addField("Episodes", info.episodes, true)
            embed.addField("Format", info.format, true)
            embed.addField("Duration per ep", info.duration + "min", true)
            embed.addField("Started on", info.startDate.month + "/" + info.startDate.day + "/" + info.startDate.year, true)
            if(info.endDate.day != null)
                embed.addField("Ended on", info.endDate.month + "/" + info.endDate.day + "/" + info.endDate.year, true)
            embed.addField("Genres", info.genres, false)
            var desc = await info.description.replace(/<br>/gm, '');
            if(desc.length >= 1024)
                desc = desc.substring(0, 1023)
            embed.addField("Description", desc, false)
            embed.setColor('BLUE')

            console.log("[" + new Date().toLocaleTimeString() + "] Anime Request : " + req + " by " + msg.author.tag)
            return msg.channel.send(embed)
        }).catch(err => {
            console.error(err)
            return error.no(17, msg)
        });

    }

    static async manga (msg, cont, error) {

        if(cont.length < 2)return;
        cont.shift();
        var req = cont.join(' ');

        Anilist.search('manga', req, 1, 1).then(async data => {
            var res = data.media[0];
            var info = await Anilist.media.manga(res.id)
            const embed = new Discord.RichEmbed();
            embed.setTitle("**" + info.title.romaji + " / " + info.title.english + "**")
            embed.setThumbnail(info.coverImage.large)
            embed.addField("Status", info.status, true)
            if(info.volumes != null)
                embed.addField("Volumes", info.volumes, true)
            embed.addField("Format", info.format, false)
            embed.addField("Started on", info.startDate.month + "/" + info.startDate.day + "/" + info.startDate.year, true)
            if(info.endDate.day != null)
                embed.addField("Ended on", info.endDate.month + "/" + info.endDate.day + "/" + info.endDate.year, true)
            embed.addField("Genres", info.genres, false)
            var desc = await info.description.replace(/<br>/gm, '');
            if(desc.length >= 1024)
                desc = desc.substring(0, 1023)
            embed.addField("Description", desc, false)
            embed.setColor('BLUE')

            console.log("[" + new Date().toLocaleTimeString() + "] Manga Request : " + req + " by " + msg.author.tag)
            return msg.channel.send(embed) 
        }).catch(err => {
            console.error(err)
            return error.no(17, msg)
        });

    }

}

// Functions

async function join (msg, game) {
    switch (game) {
        case "mariokart":
        case "mario kart":
            if(! await msg.member.roles.find(val => val.id == '614445539693559820')) {
                return msg.member.addRole('614445539693559820').then(msg.reply("you joined Mario Kart!"))
            } break;

        case "smashbros":
        case "smash bros":
        case "smash":
            if(! await msg.member.roles.find(val => val.id == '614445571045982228')) {
                return msg.member.addRole('614445571045982228').then(msg.reply("you joined Smash Bros!"))
            } break;

        case "splatoon":
        case "sploon":
            if(! await msg.member.roles.find(val => val.id == '614445571276668930')) {
                return msg.member.addRole('614445571276668930').then(msg.reply("you joined Splatoon!"))
            } break;

        case "mariomaker":
        case "mario maker":
            if(! await msg.member.roles.find(val => val.id == '614445572199546880')) {
                return msg.member.addRole('614445572199546880').then(msg.reply("you joined Mario Maker!"))
            } break;

        default:
            return msg.reply("the game you entered doesn't exist yet")

    }
}

async function leave (msg, game) {
    switch (game) {
        case "mariokart":
        case "mario kart":
            if(await msg.member.roles.find(val => val.id == '614445539693559820')) {
                return msg.member.removeRole('614445539693559820').then(msg.reply("you leaved Mario Kart!"))
            } break;

        case "smashbros":
        case "smash bros":
        case "smash":
            if(await msg.member.roles.find(val => val.id == '614445571045982228')) {
                return msg.member.removeRole('614445571045982228').then(msg.reply("you leaved Smash Bros!"))
            } break;

        case "splatoon":
        case "sploon":
            if(await msg.member.roles.find(val => val.id == '614445571276668930')) {
                return msg.member.removeRole('614445571276668930').then(msg.reply("you leaved Splatoon!"))
            } break;

        case "mariomaker":
        case "mario maker":
            if(await msg.member.roles.find(val => val.id == '614445572199546880')) {
                return msg.member.removeRole('614445572199546880').then(msg.reply("you leaved Mario Maker!"))
            } break;

        default:
            return msg.reply("the game you entered doesn't exist yet")

    }
}


async function xp (msg, author, Discord, db, bot) {

    var leaderboard = await db.collection('user').find().sort({exp:-1}).limit(10).toArray();
    var n = 0;

    msg.channel.startTyping()

    const embed = new Discord.RichEmbed();
    embed.setColor('GREY')
    embed.setTitle("**XP Leaderboard**")

    leaderboard.forEach(async elem => {
        let user = await bot.fetchUser(elem._id)
        n++;
        embed.addField(n + ". " + user.username, elem.exp + " xp's")
    })

    setTimeout(() => {
        msg.channel.send(embed).then(console.log("[" + new Date().toLocaleTimeString() + "] XP Leaderboard to " + author), msg.channel.stopTyping()).catch(console.error)
    }, 1500)
}

async function pat (msg, author, Discord, db, bot) {

    var leaderboard = await db.collection('user').find().sort({pat:-1}).limit(10).toArray();
    var n = 0;

    msg.channel.startTyping()

    const embed = new Discord.RichEmbed();
    embed.setColor('GREY')
    embed.setTitle("**Pat Leaderboard**")

    leaderboard.forEach(async elem => {
        let user = await bot.fetchUser(elem._id)
        n++;
        embed.addField(n + ". " + user.username, elem.pat + " pats")
    })

    setTimeout(() => {
        msg.channel.send(embed).then(console.log("[" + new Date().toLocaleTimeString() + "] Pat Leaderboard to " + author), msg.channel.stopTyping()).catch(console.error)
    }, 1500)
}

async function hug (msg, author, Discord, db, bot) {

    var leaderboard = await db.collection('user').find().sort({hug:-1}).limit(10).toArray();
    var n = 0;

    msg.channel.startTyping()

    const embed = new Discord.RichEmbed();
    embed.setColor('GREY')
    embed.setTitle("**Hugs Leaderboard**")

    leaderboard.forEach(async elem => {
        let user = await bot.fetchUser(elem._id)
        n++;
        embed.addField(n + ". " + user.username, elem.hug + " hugs")
    })

    setTimeout(() => {
        msg.channel.send(embed).then(console.log("[" + new Date().toLocaleTimeString() + "] Hug Leaderboard to " + author), msg.channel.stopTyping()).catch(console.error)
    }, 1500)
}

async function boop (msg, author, Discord, db, bot) {

    var leaderboard = await await db.collection('user').find().sort({boop:-1}).limit(10).toArray();
    var n = 0;

    msg.channel.startTyping()

    const embed = new Discord.RichEmbed();
    embed.setColor('GREY')
    embed.setTitle("**Boops Leaderboard**")

    leaderboard.forEach(async elem => {
        let user = await bot.fetchUser(elem._id)
        n++;
        embed.addField(n + ". " + user.username, elem.boop + " boops")
    })

    setTimeout(() => {
        msg.channel.send(embed).then(console.log("[" + new Date().toLocaleTimeString() + "] Boop Leaderboard to " + author), msg.channel.stopTyping()).catch(console.error)
    }, 1500)
}