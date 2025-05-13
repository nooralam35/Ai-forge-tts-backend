
# AI Forge Studio - Google Text-to-Speech Backend

## How to Use:

1. Create a Google Cloud project and enable "Text-to-Speech API".
2. Download your service account key JSON file and save it as `google-api-key.json` in this directory.
3. Install dependencies:

```bash
npm install
```

4. Start the server:

```bash
node server.js
```

5. Send POST requests to:

```
http://localhost:3000/text-to-voice

Body: {
  "text": "Hello world",
  "languageCode": "en-US",
  "gender": "FEMALE"
}
```

It will return a public MP3 link to use in your website.
