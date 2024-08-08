import express from "express";
import fs from "fs";
import https from "https";
import path from "path";

export default async function initWeb(use_https?: boolean) {
    const app = express(),
      port = 3101;

    app.use(express.static(path.join(__dirname, '../public')));
    app.use(express.json());

    if (use_https) {
      const credentials = {
        key: fs.readFileSync('./src/base/https/private.key', 'utf8'),
        cert: fs.readFileSync('./src/base/https/certificate.crt', 'utf8') 
      };

      https.createServer(credentials, app).listen(port, () => {
        console.log(`Telegram Web App started /w https on port ${port}\n\n BOT READY TO WORK!\n\n`);
      });
    }
    else{
      app.listen(port, () => {
        console.log(`Telegram Web App started on port ${port}\n\n BOT READY TO WORK!\n\n`);
      })
    }
    return app;
  
}