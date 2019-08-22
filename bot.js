const Discord = require('discord.js');
const client = new Discord.Client();

var prefix = ('+');


client.login(process.env.BOT_TOKEN);

client.on('guildMemberAdd', member =>{
    member.guild.channels.get('605438284151128065').send(' **Hello** ' + member.user + ' **,** **Welcome to Kingdom** **,** **We are now** ' + member.guild.memberCount + ' **Members** **!** :heart: ');
    console.log('+1')
});

client.on('message', function (message) {
    if (!message.guild) return
    let args = message.content.trim().split(/ +/g)
 
    if (args[0].toLocaleLowerCase() === prefix + 'ban') {
       if (!message.member.hasPermission('BAN_MEMBERS')) return message.channel.send("**You do not have the permission to use the ban command al7mar **;(")
       let member = message.mentions.members.first()
       if (!member) return message.channel.send("**Please Mention an user ! **")
       if (member.highestRole.calculatedPosition >= message.member.highestRole.calculatedPosition && message.author.id !== message.guild.owner.id) return message.channel.send("**You do not have the permission to ban this member**")
       if (!member.bannable) return message.channel.send("**I do not have the permission to ban this member**")
       message.guild.ban(member, {days: 7})
       message.channel.send('**' + member.user.username + '** Hes been banned from the server, Bye :o')
    }
});

client.on('message', function (message) {
    if (!message.guild) return
    let args = message.content.trim().split(/ +/g)
 
    if (args[0].toLowerCase() === prefix + 'kick') {
       if (!message.member.hasPermission('KICK_MEMBERS')) return message.channel.send("You do not have the permission to use the kick command Al7mar ;(")
       let member = message.mentions.members.first()
       if (!member) return message.channel.send("**Please Mention an user**")
       if (member.highestRole.calculatedPosition >= message.member.highestRole.calculatedPosition && message.author.id !== message.guild.owner.id) return message.channel.send("**You do not have the permission to kick this member**")
       if (!member.kickable) return message.channel.send("**I do not have the permission to kick this member**")
       member.kick()
       message.channel.send('**' + member.user.username + '** Has been kicked from the server, Bye :o')
    }
});

client.on('message', function (message) {
    if (!message.guild) return
    let args = message.content.trim().split(/ +/g)
 
    if (args[0].toLowerCase() === prefix + "clear") {
        if (!message.member.hasPermission('MANAGE_MESSAGES')) return message.channel.send("**You do not have the permission to use this command a l7mar**")
        let count = parseInt(args[1])
        if (!count) return message.channel.send("**Please choose a number of messages to delete**")
        if (isNaN(count)) return message.channel.send("** Please choose a valid number**")
        if (count < 1 || count > 100) return message.channel.send("**Please choose a number from 1 to 100**")
        message.channel.bulkDelete(count + 1, true)
    }
 
    if (args[0].toLowerCase() === prefix + "mute") {
        if (!message.member.hasPermission('MANAGE_MESSAGES')) return message.channel.send("** You do not have the permission to use this commannd a l7mar**")
        let member = message.mentions.members.first()

        if (!member) return message.channel.send("** Member not found**")
        if (member.highestRole.calculatedPosition >= message.member.highestRole.calculatedPosition && message.author.id !== message.guild.ownerID) return message.channel.send("**You can not mute this member**")
        if (!member.manageable) return message.channel.send("**I can not mute this member**")
        let muterole = message.guild.roles.find(role => role.name === 'Muted')
        if (muterole) {
            member.addRole(muterole)
            message.channel.send(member + ' **Has been muted :o**')
        }
        else {
            message.guild.createRole({name: 'Muted', permissions: 0}).then(function (role) {
                message.guild.channels.filter(channel => channel.type === 'text').forEach(function (channel) {
                    channel.overwritePermissions(role, {
                        SEND_MESSAGES: false
                    })
                })
                member.addRole(role)
                message.channel.send(member + ' Has been muted :o ')
            })
        }
    }
})
