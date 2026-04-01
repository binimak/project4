const fetch = require("node-fetch");
const FormData = require("form-data");

exports.handler = async (event) => {
  const data = JSON.parse(event.body);

  // ✅ text
  const text = `
New User:
Name: ${data.name}
Phone: ${data.phone}
Passport: ${data.passport}
Country: ${data.country}
`;

  await fetch(`https://api.telegram.org/botYOUR_BOT_TOKEN/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      chat_id: "YOUR_CHAT_ID",
      text: text
    })
  });

  // ✅ photo
  if (data.photo) {
    await fetch(`https://api.telegram.org/botYOUR_BOT_TOKEN/sendPhoto`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: "YOUR_CHAT_ID",
        photo: `data:image/jpeg;base64,${data.photo}`
      })
    });
  }

  // 🔥 PDF FIX (IMPORTANT)
  if (data.passportFile) {
    const form = new FormData();

    const buffer = Buffer.from(data.passportFile, "base64");

    form.append("chat_id", "YOUR_CHAT_ID");
    form.append("document", buffer, {
      filename: "passport.pdf",
      contentType: "application/pdf"
    });

    await fetch(`https://api.telegram.org/botYOUR_BOT_TOKEN/sendDocument`, {
      method: "POST",
      body: form
    });
  }

  return {
    statusCode: 200,
    body: "OK"
  };
};
