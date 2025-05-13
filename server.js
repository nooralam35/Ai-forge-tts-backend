
// server.js - Node.js backend for Google Text-to-Speech API

const express = require('express');
const cors = require('cors');
const fs = require('fs');
const util = require('util');
const { TextToSpeechClient } = require('@google-cloud/text-to-speech');
const app = express();
const port = 3000;

const client = new TextToSpeechClient({
  keyFilename: 'google-api-key.json' // Secure your key here
});

app.use(cors());
app.use(express.json());

app.post('/text-to-voice', async (req, res) => {
  const { text, languageCode, gender } = req.body;

  const request = {
    input: { text: text },
    voice: { languageCode: languageCode || 'en-US', ssmlGender: gender || 'NEUTRAL' },
    audioConfig: { audioEncoding: 'MP3' },
  };

  try {
    const [response] = await client.synthesizeSpeech(request);

    const outputFile = `output-${Date.now()}.mp3`;
    await util.promisify(fs.writeFile)(`./public/${outputFile}`, response.audioContent, 'binary');

    res.json({ audioUrl: `https://your-domain.com/${outputFile}` });
  } catch (error) {
    console.error(error);
    res.status(500).send('TTS generation failed.');
  }
});

app.use(express.static('public'));

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
