const qrcode = require('qrcode-terminal');
require('dotenv').config();
const { Client, LocalAuth } = require('whatsapp-web.js');
const client = new Client({
    authStrategy: new LocalAuth(),
    puppeteer: {
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    }
});

// Scan barcode
client.on('qr', (qr) => {
    qrcode.generate(qr, {small: true})
});

// Status setelah barcode terscan
client.on('ready', () => {
    console.log('Client is ready!');
    client.getChats().then((chats) => {
        console.log(chats[1]);
    });
});

client.on('message', async msgdb => {
    const contact = await msgdb.getContact();
    const name = contact.pushname
    const nomor = contact.number
    // Koneksi Database
    const { MongoClient, Timestamp } = require('mongodb');
    const uri = process.env.MONGO_CREDENTIALS
    const dbName = 'wadb';

    const client = new MongoClient(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });

    const db = client.db(dbName);

    db.collection('search_chats').insertOne(
        {
            text: msgdb.body,
            time: msgdb.timestamp,
            nama: name,
            nomor: nomor
               
        },
        (error, result) => {
            if(error){
                return console.log(error)
            }
            console.log(result);
        }
    )

});

// Forwarding messages
client.on('message', async message => {
    const contact = await message.getContact();
    const name = contact.pushname
    const nomor = contact.number
	console.log(message.body);
    client.getChats().then((chats) => {
        const pTedja = chats.find(
            (chat) => chat.name === process.env.pTedja
        );
        const rino = chats.find(
            (chat) => chat.name === process.env.rino
        );
        const handy = chats.find(
            (chat) => chat.name === process.env.handy
        );
        const desy = chats.find(
            (chat) => chat.name === process.env.desy
        );

        // Timer
        let counter = 0;

        const waForward = () => {
            counter += 1;
            if (counter === 1 && !message.body.startsWith('!balaske ')){
                client.sendMessage(pTedja.id._serialized, `_Ada Pesan Baru Masuk ke Whatsapp CS WIKAN dari_ _*${name}*_ _dengan nomor_ _(*${nomor}*)_: *"${message.body.toLowerCase()}"* `);
                client.sendMessage(rino.id._serialized, `_Ada Pesan Baru Masuk ke Whatsapp CS WIKAN dari_ _*${name}*_ _dengan nomor_ _(*${nomor}*)_: *"${message.body.toLowerCase()}"* `);
            }else if (counter === 2 && !message.body.startsWith('!balaske ')){
                client.sendMessage(handy.id._serialized, `_Ada Pesan Baru Masuk ke Whatsapp CS WIKAN dari_ _*${name}*_ _dengan nomor_ _(*${nomor}*)_: *"${message.body.toLowerCase()}"* `);
                clearInterval(forwardTimer)
            }else if (counter === 1 && message.body.startsWith('!balaske ')){
                client.sendMessage(pTedja.id._serialized,  `_Pesan Terbaru Sebelumnya Sudah Dibalas Oleh CS_ _*${name}*_ _dengan nomor_ _(*${nomor}*)_ : *"${message.body.toLowerCase()}"* `);
            }else if (counter === 2 && message.body.startsWith('!balaske ')){
                client.sendMessage(rino.id._serialized,  `_Pesan Terbaru Sebelumnya Sudah Dibalas Oleh CS_ _*${name}*_ _dengan nomor_ _(*${nomor}*)_ : *"${message.body.toLowerCase()}"* `);
            }else if (counter === 3 && message.body.startsWith('!balaske ')){
                client.sendMessage(handy.id._serialized,  `_Pesan Terbaru Sebelumnya Sudah Dibalas Oleh CS_ _*${name}*_ _dengan nomor_ _(*${nomor}*)_ : *"${message.body.toLowerCase()}"* `);
            }
        }
        
        const forwardTimer = setInterval(waForward, 120000);
            
    });
    
});

// Menambahkan fungsionalitas untuk command yang lain 
client.on('message', async msg => {
    console.log('MESSAGE RECEIVED', msg);
    if (msg.body === '!ping reply') {
        // Send a new message as a reply to the current one
        msg.reply('pong');

    } else if (msg.body === '!ping') {
        // Send a new message to the same chat
        client.sendMessage(msg.from, 'pong');

    } else if (msg.body.startsWith('!balaske ')) {
        // Direct send a new message to specific id
        let number = msg.body.split(' ')[1];
        let messageIndex = msg.body.indexOf(number) + number.length;
        let message = msg.body.slice(messageIndex, msg.body.length);
        number = number.includes('@c.us') ? number : `${number}@c.us`;
        let chat = await msg.getChat();
        chat.sendSeen();
        client.sendMessage(number, message);

    }
    
});

client.initialize();
