<br />
<p align="center">
  <h3 align="center">Maya</h3>

  <p align="center">
    An open-source Discord bot built for the Fiveable community.
    <br />
    <a href="https://github.com/cnnor/Maya/issues">Report Bug</a>
    ·
    <a href="https://github.com/cnnor/Maya/issues">Request Feature</a>
    ·
    <a href="https://github.com/cnnor/Maya/pulls">Send a Pull Request</a>
  </p>
</p>


## 📝 About The Project

Maya is a multi-purpose, community-driven Discord bot built for the Fiveable student community.

### Built With
This section should list any major frameworks that you built your project using. Leave any add-ons/plugins for the acknowledgements section. Here are a few examples.
* [TypeScript](https://www.typescriptlang.org/)
* [Discord.js](https://discord.js.org/)
* [Akairo](https://github.com/discord-akairo/discord-akairo)
* [Mongoose](https://mongoosejs.com/)
* [Signale](https://www.npmjs.com/package/signale)


## 👋 Getting Started

### Pre-Requisites

* A Mongo DB instance (self-hosted or Mongo Atlas) with a URI.
* Discord Bot Token [(Guide)](https://discordjs.guide/preparations/setting-up-a-bot-application.html#creating-your-bot)

### Local Installation

1. Clone the repo.
```sh
https://github.com/cnnor/Maya.git
cd Maya
```
2. Install dependencies.
```sh
npm install
```
3. Remove `-example` from `.env-example` and replace variables.
```
TOKEN=DISCORD BOT TOKEN
OWNER_ID=USER ID OF THE OWNER
MONGO_URI=URI TO YOUR MONGO DATABASE
```
4. Start using ts-node and Nodemon.
```sh
npm run start
```


## ⚖️ License

```
MIT License

Copyright (c) 2021 Connor Snow

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```
