var ecomony = {
  shop: function (showDisplay) {
        var shop = [
            ['Symbol', 'Buys a custom symbol to go infront of name and puts you at top of userlist. (Temporary until restart, certain symbols are blocked)', 5],
            ['Fix', 'Buys the ability to alter your current custom avatar or trainer card. (don\'t buy if you have neither)', 10],
            ['Poof', 'Buy a poof message to be added into the pool of possible poofs.', 15],
            ['Who', 'Buys a custom whois bot message for your name.', 25],
            ['Avatar', 'Buys an custom avatar to be applied to your name (You supply. Images larger than 80x80 may not show correctly)', 30],
            ['Trainer', 'Buys a trainer card which shows information through a command.', 50],
            ['Room', 'Buys a chatroom for you to own. (within reason, can be refused)', 100]
        ];

        if (showDisplay === false) {
            return shop;
        }

        var s = '<table border="1" cellspacing="0" cellpadding="5" width="100%"><tbody><tr><th>Command</th><th>Description</th><th>Cost</th></tr>';
        var start = 0;
        while (start < shop.length) {
            s = s + '<tr><td>' + shop[start][0] + '</td><td>' + shop[start][1] + '</td><td>' + shop[start][2] + '</td></tr>';
            start++;
        }
        s += '</tbody></table><center>To buy an item from the shop, use /buy <em>command</em>.</center>';
        return s;
    },
    
    getMoney: function(user) {
      Core.stdin('money', user.userid)
    },
    
    remove: function(user, amount) {
      this.getMoney(user);
      Core.stdout('money', user.userid, (user.money - amount))
    }
    
    add: function(user, amount) {
      this.getMoney(user);
      Core.stdout('money', user.userid, (user.money + amount))
    }
    
    
    casino: {
    dice: {
        compareRolls: function (rolls, players, room) {
                var winner = '';
                var loser = '';
                if (rolls[Users.users[players[0]]] > rolls[Users.users[players[1]]]) {
                    winner = Users.users[players[0]].userid;
                    loser = Users.users[players[1]].userid;
                } else {
                    winner = Users.users[players[1]].userid;
                    loser = Users.users[players[0]].userid;
                }
                if (!rolls[Users.users[players[1]] === rolls[Users.users[players[0]]]]) {
                    room.addRaw(Users.users[players[0]].name + ' rolled a <font color=red>' + rolls[Users.users[players[0]]] + '</font>');
                    room.addRaw(Users.users[players[1]].name + ' rolled a <font color=red>' + rolls[Users.users[players[1]]] + '</font>');
                    room.addRaw('<font color=#24678d> ' + winner + ' wins the dice game and ' + '<font color=red>' + dice[room.id].bet + '</font> bucks.</font>');

                    var total = Number(Core.stdin('money', Users.users[winner].userid)) + Number(dice[room.id].bet)
                    Core.stdout('money', Users.users[winner].userid, total);

                    var amount = Number(Core.stdin('money', Users.users[loser].userid)) - Number(dice[room.id].bet);
                    Core.stdout('money', Users.users[loser].userid, amount);
                } else {
                    return room.add('It was a draw, both frens keep their money');
                }
                delete this[room.id];
            },
            generateRolls: function (players, room) {
                var facez = [1, 2, 3, 4, 5, 6];
                for (var i = 0; i < players.length; i++) {
                    this[room.id].rolls[Users.users[players[i]]] = facez[Math.floor(Math.random() * 6)];
                }
        },
    roulette: {
            
        },
    },
    
    arcade: {}
    }
};
