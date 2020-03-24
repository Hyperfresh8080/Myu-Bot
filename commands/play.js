const music = require('../js/music')
const { YouTube } = require('popyt')
const yt = new YouTube(process.env.YT_TOKEN)

module.exports.run = (bot, msg, args) => {
    music.play(bot, msg, args, yt);
};

module.exports.help = {
    name: 'play',
    usage: "?play (YouTube link | keywords)",
    desc: "Play YouTube videos in the Qumu Radio voice channel"
};