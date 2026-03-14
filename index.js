const express = require('express');
const twilio = require('twilio');
const app = express();
app.use(express.json());

const client = twilio(
  process.env.TWILIO_SID,
  process.env.TWILIO_TOKEN
);

app.post('/call-summary', async (req, res) => {
  try {
    const data = req.body;
    const customerPhone = data.from_number || 'Unknown';
    const transcript = data.transcript || 'No transcript';

    const message =
`New Plumbing Service Request

Customer Phone: ${customerPhone}

Call Summary:
${transcript}`;

    await client.messages.create({
      body: message,
      from: process.env.TWILIO_NUMBER,
      to: process.env.OWNER_NUMBER
    });

    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, '0.0.0.0', () => console.log(`Running on port ${PORT}`));

