const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQUlwOHQrejJxbU5IM3N3ZWFERHR4WnBrSGJwQ1hqeFVTVUhvUk9Pc2JITT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoibGNjZXZBdGtBYmtlNllhWXdpc0J3Z1FEcDYwVDAzMzdGSVFPd3B0OTV4Zz0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJRQTNjR2d2dHJ3KzRRN2Ewc3h1RFdub3JGUzRUTTh6aHRDdFRQQjloTlYwPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJDYTdaRFhhWmVHRmhFbUxyRDVkdm8zMVg2dzdQQWZrWGdlbXpWOXRvYXljPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6InlDZEVqMDBoSENLVjN6VDlwUlA3Q3Z3SWNEaEk2UGdBak1Qa3NhVzhRSFU9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImJJMlhRQnh4SkZUV29ZVDdBZ0Qzd2JiYUhlNnI3ekRiUFFDaW9NZHF0bm89In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoib1BWUWtPUjJzL09SUitDZ203K3d6NmZmS0RPNWd3K1k3aHF1K3ZtdVFWdz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiOC91K0x4QURiVkRnZjhCcFFFb1orcFNjbEZXQTZib21IbSsxbHFZRE9UWT0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkFVN2k0THp5VkttcXk5L2pqc2pUOW5LbnQzUjBPRmxjMUdHUFBMWGdMa1c2UnFvR29KZkV2MGc1TmdsWTAvL0NpK2o3MWVhS1Z5cXVPNktXNXBXTGlRPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MiwiYWR2U2VjcmV0S2V5IjoiemVpRmJEUnJYTzU1dWNLc3ZVcitIcG52SzQyRFdMbDIyemNNOGxxKzd4ND0iLCJwcm9jZXNzZWRIaXN0b3J5TWVzc2FnZXMiOlt7ImtleSI6eyJyZW1vdGVKaWQiOiIyNTQ3NDE3NDk4NzZAcy53aGF0c2FwcC5uZXQiLCJmcm9tTWUiOnRydWUsImlkIjoiQkVENDI4NUUwMTE4Q0FGRkEzQzA5NEQzRDlBOEE0N0IifSwibWVzc2FnZVRpbWVzdGFtcCI6MTc1NDkxMTU1MX1dLCJuZXh0UHJlS2V5SWQiOjMxLCJmaXJzdFVudXBsb2FkZWRQcmVLZXlJZCI6MzEsImFjY291bnRTeW5jQ291bnRlciI6MCwiYWNjb3VudFNldHRpbmdzIjp7InVuYXJjaGl2ZUNoYXRzIjpmYWxzZX0sInJlZ2lzdGVyZWQiOnRydWUsInBhaXJpbmdDb2RlIjoiV1dGNUpSQUwiLCJtZSI6eyJpZCI6IjI1NDc0MTc0OTg3Njo2QHMud2hhdHNhcHAubmV0IiwibGlkIjoiMTQzNDc4MDEzMDU5MTc5OjZAbGlkIn0sImFjY291bnQiOnsiZGV0YWlscyI6IkNPZUpyQmdRcXFibnhBWVlMeUFBS0FBPSIsImFjY291bnRTaWduYXR1cmVLZXkiOiJnNlV6Z3lCUWt3bWdmd0tnNFpwS0tFQkpFZFpIdGxGcmF1UHJEN0xEeDBZPSIsImFjY291bnRTaWduYXR1cmUiOiJCNThhditNKzFCdHIxVzhzYXBicnRtRDg2K3hMUEZRUFFQZnJ4VmVkQk1ITFAxMHU0cmhadkpvTkVFVkZXcmFmVCtWWHFnK1ptZjltcCsxNXNYMVhDdz09IiwiZGV2aWNlU2lnbmF0dXJlIjoiNlk4NHJwMSsydkNEUkU0VE5PT3l5djc5VVZCYkZzKzc2Q1hkTE1XVFQraDdBZ2d6MG81SjRYNisyNUdsa1JWMTdYRTllN2FiOS9ldVNuU1NsTTNzakE9PSJ9LCJzaWduYWxJZGVudGl0aWVzIjpbeyJpZGVudGlmaWVyIjp7Im5hbWUiOiIyNTQ3NDE3NDk4NzY6NkBzLndoYXRzYXBwLm5ldCIsImRldmljZUlkIjowfSwiaWRlbnRpZmllcktleSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkJZT2xNNE1nVUpNSm9IOENvT0dhU2loQVNSSFdSN1pSYTJyajZ3K3l3OGRHIn19XSwicGxhdGZvcm0iOiJhbmRyb2lkIiwicm91dGluZ0luZm8iOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJDQUlJRFE9PSJ9LCJsYXN0QWNjb3VudFN5bmNUaW1lc3RhbXAiOjE3NTQ5MTE1NDQsImxhc3RQcm9wSGFzaCI6IjJWNzdxVSIsIm15QXBwU3RhdGVLZXlJZCI6IkFBQUFBQmp3In0=',
    PREFIXE: process.env.PREFIX || ".",
    GITHUB : process.env.GITHUB|| 'https://github.com/toxiclover-tech/TOXIC-LOVER-MD',
    OWNER_NAME : process.env.OWNER_NAME || "toxic lover",
    NUMERO_OWNER : process.env.NUMERO_OWNER || "254741749876",  
              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "yes",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'non',
    AUTO_REACT: process.env.AUTO_REACTION || "non",  
     AUTO_SAVE_CONTACTS : process.env.AUTO_SAVE_CONTACTS || 'yes',
    URL: process.env.URL || "https://files.catbox.moe/39n0nf.jpg",  
    AUTO_REACT_STATUS: process.env.AUTO_REACT_STATUS || 'yes',              
    CHAT_BOT: process.env.CHAT_BOT || "no",              
    AUTO_READ: process.env.AUTO_READ_MESSAGES || "no",
    AUTO_BLOCK: process.env.AUTO_BLOCK || 'no', 
    GCF: process.env.GROUP_HANDLE || 'no', 
    AUTO_REPLY : process.env.AUTO_REPLY || "no", 
    AUTO_STATUS_TEXT: process.env.AUTO_STATUS_TEXT || 'your status have been viewed by JEEPERS CREEPER-XMD',   
    AUTO_STATUS_REPLY: process.env.AUTO_STATUS_REPLY || 'no',
    AUTO_BIO: process.env.AUTO_BIO || 'yes',       
    ANTI_CALL_TEXT : process.env.ANTI_CALL_TEXT || 'not available now☄️🎇',             
    GURL: process.env.GURL  || "https://whatsapp.com/channel/0029VawCel7GOj9ktLjkxQ3g",
    WEBSITE :process.env.GURL || "https://whatsapp.com/channel/0029VawCel7GOj9ktLjkxQ3g",
    CHANNEL :process.env.CHANNEL || "https://whatsapp.com/channel/0029VawCel7GOj9ktLjkxQ3g",
    CAPTION : process.env.CAPTION || "✧DREAMKID-XMD✧",
    BOT : process.env.BOT_NAME || '✧DREAMKID-XMD TECH✧⁠',
    MODE: process.env.PUBLIC_MODE || "no",              
    TIMEZONE: process.env.TIMEZONE || "Africa/Nairobi", 
    PM_PERMIT: process.env.PM_PERMIT || 'no',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME || null,
    HEROKU_API_KEY : process.env.HEROKU_API_KEY || null,
    WARN_COUNT : process.env.WARN_COUNT || '5' ,
    ETAT : process.env.PRESENCE || '1',
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
    LUCKY_ADM : process.env.ANTI_DELETE_MESSAGE || 'no',
    ANTI_CALL: process.env.ANTI_CALL || 'yes', 
    AUDIO_REPLY : process.env.AUDIO_REPLY || 'yes',             
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9" : "postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9",
    /* new Sequelize({
     dialect: 'sqlite',
     storage: DATABASE_URL,
     logging: false,
})
: new Sequelize(DATABASE_URL, 
     dialect: 'postgres',
     ssl: true,
     protocol: 'postgres',
     dialectOptions: {
         native: true,
         ssl: { require: true, rejectUnauthorized: false },
     },
     logging: false,
}),*/
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`mise à jour ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
