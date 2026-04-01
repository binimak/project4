const fetch = require("node-fetch");
const FormData = require("form-data");

exports.handler = async (event) => {
  const token = process.env.TG_TOKEN;
  const chat_id = process.env.CHAT_ID;

  const body = event.body ? JSON.parse(event.body) : {};

  const text = `
New User:
Name: ${body.name}
Phone: ${body.phone}
Passport: ${body.passport}
Country: ${body.country}
`;

  await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ chat_id, text })
  });

  
  if (body.photo) {
    const form = new FormData();
    form.append("chat_id", chat_id);
    form.append("photo", Buffer.from(body.photo, "base64"), {
      filename: "photo.jpg"
    });

    await fetch(`https://api.telegram.org/bot${token}/sendPhoto`, {
      method: "POST",
      body: form
    });
  }

  
  if (body.passportFile) {
    const form = new FormData();
    form.append("chat_id", chat_id);
    form.append("document", Buffer.from(body.passportFile, "base64"), {
      filename: "passport.pdf"
    });

    await fetch(`https://api.telegram.org/bot${token}/sendDocument`, {
      method: "POST",
      body: form
    });
  }

  return {
    statusCode: 200,
    body: "All sent"
  };
};
