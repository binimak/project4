const fetch = require("node-fetch");
const FormData = require("form-data");

exports.handler = async (event) => {
  try {
    const data = JSON.parse(event.body);

    const BOT = "YOUR_BOT_TOKEN";
    const CHAT = "YOUR_CHAT_ID";

    const text = `
New User:
Name: ${data.name}
Phone: ${data.phone}
Passport: ${data.passport}
Country: ${data.country}
`;

    // ✅ TEXT
    await fetch(`https://api.telegram.org/bot${BOT}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: CHAT,
        text: text
      })
    });

    // ✅ PHOTOS (3)
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
