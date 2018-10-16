//////////////////////////////////// 404DISCORD.COM PASSCODE BOT /////////////////////////////////////////////
//--------------------------------------------------------------------------------------------------------/////#endregion

//connecty stuff
var Discordie           =   require("discordie");
var i2b                 =   require('imageurl-base64');
var bella               =   require("bella-scheduler");
var rules               =   require("./text.json")
var token               =   require("./settings.json")
var settings            =   require("./settings.json")
var ownerID             =   require("./settings.json")


var client = new Discordie({
    messageCacheLimit: 1000,
    autoReconnect: true
});


var mainchannel         =   client.Channels.get('432740303825403906')
var passcodeChannel     =   client.Channels.get('269612335675473921')
var staffbotschannel    =   client.Channels.get('452098129328603136')


//connect
client.connect({
    token: settings.token
});
//ready
client.Dispatcher.on("GATEWAY_READY", e => {
    console.log("Connected as: " + client.User.username);
});



////////////////////////////////////User related stuff////////////////////////////////////////////////


//joinDM
/*client.Dispatcher.on("GUILD_MEMBER_ADD", e => {
    e.member.openDM().then(function (channel, err) {
        channel.sendMessage('Hey there, New user! you just joined 404discord.com! Read #Server-info and type --404 in #passcode!');
    });
});*/

//Welcome message in #passcode
client.Dispatcher.on("GUILD_MEMBER_ADD", e => {
    passcodeChannel.sendMessage(
        `
Welcome  ${e.member.mention} to the **${e.guild.name}** official discord server!
**Make sure to read** <#492090180275011615> . When you're done, type **--404** to enter the server! `
    );
});

client.Dispatcher.on("MESSAGE_CREATE", e => {
    var mainchannel                 =   client.Channels.get('432740303825403906')
    var passcodeChannel             =   client.Channels.get('269612335675473921')
    var staffbotschannel            =   client.Channels.get('452098129328603136')
    var serverID                    =   require("./settings.json")
    var message                     =   e.message
    var channel                     =   message.channel
    var author                      =   message.member
    var guild                       =   message.guild
    var content1                    =   message.content
    var content                     =   content1.toLowerCase();
    var args                        =    content.split(/[ ]+/).slice(1)
    var p                           =    '--'
    var passArray                   =   ['--404', '—404', '--404', '--404', '-404', '~~404', '--404', '- - 404', '- -404', '—404']
    var server                      =   client.Guilds.get('235366697249275905')
    var passRole = server.roles.filter(r => r.id == "432740449757823003")[0]
    var tempRole = server.roles.filter(r => r.id == "432807720979005442")[0]
    if (channel.isDM) return;
    if (message.author.bot) return;

    //--donate  #staff-bots              Send a message to main, asking for a donation

    if (content.startsWith(p + 'donate') && channel.id == staffbotschannelid) {
        if (author.id == ownerID) {
            message.delete();
            mainchannel.sendMessage('Running the website, bots and advertising costs money. Wanna help out? Become a patreon and get a sicc role! http://404discord.com/donate');
        } else channel.sendMessage('<:error:335660275481051136> **Owner Only**')
    }

    //--ping  #passcode                    Returns response time
    if (content.startsWith(p + 'ping') && channel.id == passcodeChanneliD) {
        let start = process.hrtime();
        channel.sendMessage("ping: ").then(m => {
            const diff = process.hrtime(start);
            let time = diff[0] * 1000 + diff[1] / 1000000
            m.edit('ping: **' + Math.round(time) + 'ms**');
        });
    }

    //--pingstaff #staff-bots             Returns response time to #staff-bots
    if (content.startsWith(p + 'ping') && channel.id == staffbotschannel.id) {
        let start = process.hrtime();
        channel.sendMessage("ping: ").then(m => {
            const diff = process.hrtime(start);
            let time = diff[0] * 1000 + diff[1] / 1000000
            m.edit('Bot is up! ping: **' + Math.round(time) + 'ms**');
        });
    }

    //--avatar #staff-bots                Changes bot avatar

    if (content.startsWith(p + 'avatar ') && channel.id == staffbotschannel.id) {
        if (author.id == ownerID) {
            i2b(args[0], function (err, data) {
                if (err) channel.sendMessage('<:error:335660275481051136> **Avatar Change Error**\`\`\`xl\n' + err.message + '```')
                else {
                    client.User.setAvatar(data.dataUri);
                    channel.sendMessage(':white_check_mark: **Avatar Changed**');
                }
            });
        } else channel.sendMessage('<:error:335660275481051136> **Owner Only**"')
    }

    //--nick #staff-bots                Changes bot nickname

    if (content.startsWith(p + 'nick') && channel.id == staffbotschannel.id) {
        if (author.can(Discordie.Permissions.General.MANAGE_CHANNELS, guild) || author.id == ownerID) {
            var botUser = client.User.memberOf(guild)
            botUser.setNickname(args.join(' '));
            channel.sendMessage(':white_check_mark: Nickname changed to** ' + args.join(' ') + ' **');
            console.log('Nickname changed to** ' + args.join(' ') + ' **')
        } else channel.sendMessage('<:error:335660275481051136> **Staff Only**"')
    }


    //--name #staff-bots - ratelimit: 2x per hour

    if (content.startsWith(p + 'name') && channel.id == passcodeChannel.id) {
        if (author.id == ownerID) {
            client.User.setUsername(args.join(' '))
            channel.sendMessage('<:check:335544753443831810> Name changed to** ' + args.join(' ') + ' **');
            console.log(' Name changed to** ' + args.join(' ') + ' **')
        } else channel.sendMessage('<:error:335660275481051136> **Owner Only** [Use --nick to change Nickname]')
    }

    //--everyoneping #passcode              - don't do this too often

    if (content.startsWith(p + 'everyoneping') && channel.id == passcodeChannel.id) {
        if (author.id == ownerID) {
            message.delete();
            channel.sendMessage('@everyone please say `--404` to join the server!');
            console.log('pinged everyone')
        } else channel.sendMessage('<:error:335660275481051136> **Owner Only**')
    }

    //command list

    if (content.startsWith(p + 'help') && channel.id == passcodeChannel.id) {
        channel.sendMessage('' + author.mention + ' say --404 to join the server. If that doesn\'t work, tag <@151063310199029760>')
        console.log('listed commands for ' + author.nick + '')

    }

    //rules
    if (content.startsWith(p + 'rules') && channel.id == passcodeChannel.id) {
        channel.sendMessage(' You can find the rules in <#492090180275011615> or at http://404discord.com, ' + author.mention + '! ');
        console.log('told ' + author.nick + ' where to find the rules ');

    }

    //dankfail
    if (content.startsWith('404') && channel.id == passcodeChannel.id) {
        channel.sendMessage('You forgot the --, ' + author.mention + ' ! it\'s `--404` !	')
        console.log('smh ' + author.nick + ' failed trying to --dank')
    }


    //dank


    if (passArray.includes(content) && channel.id == passcodeChannel.id) {
        client.Users.fetchMembers();
        if (!author) return;
        if (author.hasRole(passRole)) channel.sendMessage(`Silly you, ${author.mention}, you already have **${passRole.name}**`);


        else {
            message.delete();
            channel.sendMessage('​( ͡° ͜ʖ( ͡° ͜ʖ ͡° )ʖ ͡° )╯╲___' + author.mention + ' – Don\'t mind me just taking my **' + author.username + '** for a walk');
            console.log('Gave ' + author.nick + ' Dank Memer and sent a DM')
            author.openDM().then(function (channel, err) {
                channel.sendMessage(rules.rules)
                //mainchannel.sendMessage('There\'s a newfriend here and their name is '+author.mention+'.')

            })
            if (author.roles.length == 0) {
                author.setRoles([passRole, tempRole]);
                bella.once('1d', () => {
                    if (author) author.unassignRole(tempRole).catch(e => console.log(e));
                });
            } else if (author.roles.length > 0) {
                if (author) author.assignRole(passRole).catch(e => console.log(e));
            }
        }

    }

    //undank

    if (content == '--un404' && channel.id == passcodeChanneliD) {
        if (!author.hasRole(passRole)) channel.sendMessage(`Silly you, ' + author.mention + ', you don\'t have **${passRole.name}**`)
        else {
            message.delete();
            channel.sendMessage(`<:yeet:329344020348272640> You no longer have the **${passRole.name}** role, ` + author.mention + `  <:yeet:329344020348272640>`);
            author.unassignRole(passRole);
            console.log('undanked ' + author.nick + '')
        }
    }


    ////////////////////////////////// FUNNY COMMANDS /////////////////////////////////////////////////////////
    //dink
    if (content.startsWith(p + 'dink') && channel.id == passcodeChanneliD) {
        channel.sendMessage('get urself checked out');
        console.log('told ' + author.nick + ' to get checked out')

    }


    //donk
    if (content.startsWith(p + 'donk') && channel.id == passcodeChanneliD) {
        channel.sendMessage('get urself checked out');
        console.log('told ' + author.nick + ' to get checked out')

    }

    //drink
    if (content.startsWith(p + 'drink') && channel.id == passcodeChanneliD) {
        channel.sendMessage('https://i.imgur.com/dDLVtpA.png')
        console.log('' + author.nick + ' did --drink')
    }

    //nou
    if (content.startsWith(p + 'nou') && channel.id == '384487513328451595') {
        if (author.can(Discordie.Permissions.General.MANAGE_CHANNELS, guild) || author.id == ownerID) {
            message.delete();
            mainchannel.sendMessage(' no u ');
            console.log('yelled no u');
        }
    }
});