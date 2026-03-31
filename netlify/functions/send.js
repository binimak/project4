exports.handler = async (event) => {
  const data = JSON.parse(event.body);

  const token = process.env.TG_TOKEN;
  const chat_id = process.env.CHAT_ID;

  const text = `
New User:
Name: ${data.name}
Phone: ${data.phone}
Passport: ${data.passport}
Country: ${data.country}
`;

  await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ chat_id, text })
  });

  return {
    statusCode: 200,
    body: "Message sent"
  };
};
