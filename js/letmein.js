const utils = require('./utilities')

module.exports = class letmein {

    static async action (msg, levels, db) {
        if(msg.channel.id != process.env.LOBBY)return;

        var user = await db.get('user').find({ id: msg.author.id }).value();

        if(user) {
            var lvl = await utils.levelInfo(user.exp);
            if(lvl.level != 0) await msg.member.roles.add(levels[lvl.level].id);
            await db.get('user').find({ id: msg.author.id }).set({hidden: false}).write();
        }

        return await msg.member.roles.add('606862164392673290').then(() => {
            msg.delete().catch(console.error)
            try {
                msg.member.send({"embed": { "description": "I'm Q-Bot, a unique bot created for this server.\n\nYou can use me with the prefix `?`\nand see all my commands by doing `?help`", "color": 2543500, "author": { "name": `Welcome to Qumu's Discord Server, ${msg.author.username} !`, "icon_url": msg.author.avatarURL}}});
            } catch (err) {
                console.error(err)
            }
        }).catch(console.error)
    }
}