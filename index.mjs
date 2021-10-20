import fetch from 'node-fetch';
import { sendMail } from './mail.mjs';

async function start() {
  fetch("https://www.ems.com.cn/apple/getMailNoRoutes", {
    "headers": {
      "accept": "application/json, text/javascript, */*; q=0.01",
      "accept-language": "zh-CN,zh;q=0.9,en;q=0.8,zh-TW;q=0.7,ja;q=0.6,und;q=0.5",
      "cache-control": "no-cache",
      "content-type": "application/x-www-form-urlencoded;charset=UTF-8",
      "pragma": "no-cache",
      "sec-ch-ua": "\" Not;A Brand\";v=\"99\", \"Google Chrome\";v=\"97\", \"Chromium\";v=\"97\"",
      "sec-ch-ua-mobile": "?0",
      "sec-ch-ua-platform": "\"macOS\"",
      "sec-fetch-dest": "empty",
      "sec-fetch-mode": "cors",
      "sec-fetch-site": "same-origin",
      "x-requested-with": "XMLHttpRequest",
      "Referer": "https://www.ems.com.cn/apple/items?mailNo=EZ334555634CN",
      "Referrer-Policy": "strict-origin-when-cross-origin"
    },
    "body": "mailNum=EZ334555634CN",
    "method": "POST"
  }).then((res) => res.json())
  .then(async (res) => {
    const item = res.trails[0][0];

    console.log('new Date()', new Date())
    console.log('Date.now()', Date.now())
    console.log('new Date(item.optime)', new Date(item.optime))
    console.log('new Date(item.optime).getTime()', new Date(item.optime).getTime())
    const now = new Date();

    // china time;
    const cTime = new Date(item.optime);
    cTime.setHours(cTime.getHours() - 8);
    console.log('new Date(item.optime).getTime()', new Date(item.optime).getTime())
    console.log('cTime', cTime)
    console.log('now - cTime', now.getTime() - cTime.getTime())

    const timeDifference = Math.floor(Date.now() - new Date(item.optime).getTime()) / 1000 / 60;

    console.log('result', timeDifference)
    // minutes
    if (timeDifference < 30) {
      // await sendMail({
      //   subject: '您的iphone到这了',
      //   html: `${item.processingInstructions} 正在 ${item.opreateType} <br/> <pre>${JSON.stringify(item)}</pre>`
      // })
    }
  });
}

await start();
