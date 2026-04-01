const fetch = require("node-fetch");
const FormData = require("form-data");

exports.handler = async (event) => {
  try {
    const data = JSON.parse(event.body);

    const BOT = process.env.TG_TOKEN;
    const CHAT = process.env.CHAT_ID;

    // ✅ send text
    await fetch(`https://api.telegram.org/bot${BOT}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: CHAT,
        text: `🆕 New Registration:

👤 Name: ${data.name}
👤 ሰም: ${data.name_am}

🎂 Age: ${data.age}
🎂 እድሜ: ${data.age_am}

📅 Date of Birth: ${data.dob}
📅 ትዉልድ ቀን: ${data.dob_am}

📍 Birthplace: ${data.birthplace}
📍 የትዉልድ ቦታ: ${data.birthplace_am}

📞 Phone: ${data.phone}
📞 ስልክ: ${data.phone_am}

🌍 Country Started: ${data.country}
🌍 ሂደት የጀመረበት: ${data.country_am}

🎓 Education: ${data.education}
`
      })
    });

    // ✅ send photos
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

    return { statusCode: 200, body: "OK" };

  } catch (err) {
    console.log(err);
    return { statusCode: 500, body: "Error" };
  }
};
