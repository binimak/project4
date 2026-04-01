const fetch = require("node-fetch");
const FormData = require("form-data");

exports.handler = async (event) => {
  try {
    const data = JSON.parse(event.body);

    const BOT = "PUT_YOUR_BOT_TOKEN_HERE";
    const CHAT = "PUT_YOUR_CHAT_ID_HERE";

    // 🧾 TEXT
    const text = `
New User:
Name: ${data.name}
Phone: ${data.phone}
Passport: ${data.passport}
Country: ${data.country}
`;

    await fetch(`https://api.telegram.org/bot${BOT}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: CHAT,
        text: text
      })
    });

    // 📸 PHOTO
    if (data.photo) {
      await fetch(`https://api.telegram.org/bot${BOT}/sendPhoto`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: CHAT,
          photo: `data:image/jpeg;base64,${data.photo}`
        })
      });
    }

    // 📄 PDF (FIXED)
    if (data.passportFile) {
      const form = new FormData();
      const buffer = Buffer.from(data.passportFile, "base64");

      form.append("chat_id", CHAT);
      form.append("document", buffer, {
        filename: "passport.pdf",
        contentType: "application/pdf"
      });

      await fetch(`https://api.telegram.org/bot${BOT}/sendDocument`, {
        method: "POST",
        body: form
      });
    }

    return {
      statusCode: 200,
      body: "OK"
    };

  } catch (err) {
    console.log(err);
    return {
      statusCode: 500,
      body: "Error"
    };
  }
};
