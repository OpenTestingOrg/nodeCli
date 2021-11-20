const BUffer =require('save-buffer')
const session ='eyJwYXNzcG9ydCI6eyJ1c2VyIjoiNjE2NTk2YTY3MWU4MTdmMTU5MDA4ODJhIn19';
const result =Buffer.from(session,"base64").toString('utf8');
console.log(result);

/**
 * "aws-sdk": "^2.188.0",
    "body-parser": "^1.17.2",
    "concurrently": "^3.5.0",
    "cookie-session": "^2.0.0-beta.2",
    "express": "^4.15.3",
    "jest": "^22.1.4",
    "keygrip": "^1.1.0",
    "migrate-mongoose": "^3.2.2",
    "mongoose": "^6.0.10",
    "nodemon": "^1.11.0",
    "passport": "^0.3.2",
    "passport-google-oauth20": "^2.0.0",
    "path-parser": "^2.0.2",
    "puppeteer": "^1.0.0",
    "redis": "^3.1.2",
    "save-buffer": "^1.3.1",
    "uuid": "^3.2.1"
 */

    /**
     * what is test concurrently and test non concurrently
     */