const Discord = require('discord.js'); // Kullandığımız discord.js kütüphanesini tanımladık.
const client = new Discord.Client({disableEveryone: true}); // Client değişkenini "client"'e atadık ve @everyone koruması ekledik.'
const fs = require('fs'); // Kullandığımız fs kütüphanesini tanımladık.
const ayarlar = require('./ayarlar.json'); // Ayarlar dosyamızı tanımladık.

client.komutlar = new Discord.Collection();

fs.readdir('./komutlar/', (err, files) => {
  if (err) console.error(err);
  let jsfile = files.filter(f => f.split(".").pop() === "js")
  if(jsfile.length <= 0){
    console.log('Komut yok.');
    return;
  }
  jsfile.forEach((f,i) => {
    let props = require(`./komutlar/${f}`);
    console.log(`${f} yüklendi.`);
    client.komutlar.set(props.help.name, props);
  })
});

client.on('ready', async () => { // Bot başarıyla giriş yaptığında;
	console.log('Ben hazırım ustam!'); // Konsola "Ben hazırım ustam!" yazsın.
	client.user.setActivity(`${client.guilds.size} sunucu ♥`); // Oynuyor kısmında kaç sunucu olduğu yazsın.
});

client.on('message', async mesaj => { // Mesaj atıldığında message eventini "mesaj" değişkenine tanımlayalım.
	let prefix = ayarlar.prefix; // Prefiximizi "ayarlar.json" dosyasında belirlediğimiz prefix olarak tanımlayalım.
	if(mesaj.author.bot) return; // Mesaj sahibi botsa bir şey yapmayalım.
	if(mesaj.channel.type === 'dm') return; // Mesaj özel mesajdan atılmışsa bir şey yapmayalım.
	if(!mesaj.content.startsWith(prefix)) return; // Eğer mesaj prefix ile başlamıyorsa bir şey yapmayalım.
	let messageArray = mesaj.content.split(' '); // Mesaj içeriğini "messageArray" değişkenine atayalım.
    let cmd = messageArray[0]; // "messageArray" değişkenini "cmd" değişkenine atayalım.
    let args = messageArray.slice(1); // Argümanlarımızı "args" değişkenine atayalım.

	let komutDosyasi = client.komutlar.get(cmd.slice(prefix.length)); // Komut dosyalarını alalım.
    if(komutDosyasi) komutDosyasi.run(client, mesaj, args); // Eğer komut dosyası varsa, onları çalıştırsın.

    if(mesaj.content.toLowerCase() === 'sa') { // Bir mesaj atıldığında eğer mesaj "sa" ise;
    	mesaj.reply('as'); // Mesaja "as" şeklinde cevap versin.
    }

    if(mesaj.content.toLowerCase() === 'merhaba') { // Bir mesaj atıldığında eğer mesaj "merhaba" ise;
    	mesaj.channel.send('merhaba hoşgeldin'); // Mesaj atılan kanala "merhaba hoşgeldin" mesajını göndersin.
    }
});

client.login(ayarlar.token); // Botumuz giriş yapsın. 