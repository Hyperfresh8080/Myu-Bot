import { Client, Message } from 'discord.js'
import { Db } from 'mongodb'
const color = require('./color')

module.exports.run = async (bot:Client, msg:Message, args:string[], db:Db) => {
    color.run(bot, msg, args, db);
};

module.exports.help = {
    name: 'colors',
    usage: "?colors [color id]",
    desc: "Choose your username color\n(alias of `?color`)"
};