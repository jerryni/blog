import nodemailer from 'nodemailer';

// 使用async..await 创建执行函数
export async function sendMail({
  subject,
  html,
}) {
  // 如果你没有一个真实邮箱的话可以使用该方法创建一个测试邮箱
  // let testAccount = await nodemailer.createTestAccount();

  // 创建Nodemailer传输器 SMTP 或者 其他 运输机制
  let transporter = nodemailer.createTransport({
    host: "smtp.163.com", // 第三方邮箱的主机地址
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
      user: 'z308289891@163.com', // 发送方邮箱的账号
      pass: process.env.ACCESS_TOKEN, // 邮箱授权密码
    },
  });

  // 定义transport对象并发送邮件
  let info = await transporter.sendMail({
    from: 'z308289891@163.com', // 发送方邮箱的账号
    to: ["308289891@qq.com"], // 邮箱接受者的账号
    subject: subject || "默认标题" , // Subject line
    text: "From Github Zhe", // 文本内容
    html: html || "<b>无主题</b>", // html 内容, 如果设置了html内容, 将忽略text内容
  });
}
