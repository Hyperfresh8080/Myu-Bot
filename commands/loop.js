const music = require('../js/music')

module.exports.run = (bot, msg) => {
    music.loop(msg);
};

module.exports.help = {
    name: 'loop'
};