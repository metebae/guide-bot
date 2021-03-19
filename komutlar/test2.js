
const Discord = require('discord.js'); // Kullandığımız discord.js kütüphanesini tanımladık.

module.exports.run = function(client, message, args) { // Komutumuzu başlatalım.
  if(message.mentions.users.size === 0) { // Eğer etiketlenen birisi yok ise;
    message.channel.send(message.author.avatarURL) // Mesaj atılan kanala mesaj atan kişinin avatar linkini gönderelim.
  } else { // Eğer etiketlenen birisi var ise;
	  var etiket = message.mentions.users.first() // Etiketlenen kişiyi "etiket" değişkenine atayalım.
      message.channel.send(etiket.avatarURL) // Mesaj atılan kanala mesaj atan kişinin avatar linkini gönderelim.
  }
}; // Ve komutumuzu bitirelim.

module.exports.help = {
	name: "avatar" // Komut adını girelim. (Buraya ne girerseniz komutun adı da o olacaktır. Örnek: "avatar" yazarsak komut "<prefix>avatar" yazınca çalışacaktır.)
}
