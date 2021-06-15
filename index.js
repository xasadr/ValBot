const Discord = require('discord.js');
const client = new Discord.Client();
const config = require('./config.json');
const command = require('./command')
const mongo = require('./mongo')
const welcome = require('./welcome')

client.on('ready', async () => {
    console.log('The client is ready!')
    welcome(client);
    await mongo().then(mongoose => {
        try {
            console.log('DB Connected')
        } finally {
            mongoose.connection.close();
        }
    })
    command(client, ['ping', 'test'], (message) => {
        message.channel.send('pong!')
    })

    command(client, 'servers', message => {
        client.guilds.cache.forEach(guild => {
            message.channel.send(`${guild.name} has a total of ${guild.memberCount} members`)
        })
    })

    command(client, 'clearchat', message => {
        if (message.member.hasPermission('ADMINSTRATOR')) {
            message.channel.messages.fetch().then(results => {
                message.channel.bulkDelete(results);
            })
        }
    })

    command(client, 'status', message => {
        const content = message.content.replace ('-status ', '');
        client.user.setPresence({
            activity: {
                name: content,
                type: 0
            },
        })
    })

    command(client, 'rank', message => {
        let count = 0
        if(count == 0) {
            message.channel.send(message)
            count++;
        }
    })
})

client.login(config.token)