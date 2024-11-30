/* eslint-disable no-console */
const { fork, spawn } = require('child_process');
const path = require('path');
const express = require("express")
const Router = require("express")
const router = Router(); 
const fs = require("fs-extra")
main();

async function main() {
  let serverStarted = false;
  console.log('+--------------+');
  console.log('| Starting dev |');
  console.log('+--------------+');
  const webpack = fork(path.resolve(__dirname, './run-webpack.js'));
  webpack.on('message', (chunk) => {
    if (!serverStarted && chunk.search(/compiled\ssuccessfully/)) {
      startServer();
      serverStarted = true;
    }
  });

  webpack.on('error', (err) => {
    console.log('WEBPACK ERROR', err);
    webpack.kill(1);
    process.exit(1);
  });
}
async function startServer() {
  const app = express();
  const dir = path.join(__dirname, '../dist')
  console.log(dir)
  router.get("/:filename",async(req, res) => {
    const filename = req.params.filename;
    const filePath = path.join(__dirname, `../${filename}`);
    try {
      if (!await fs.pathExists(filePath)) {
        res.status(404).json({ error: 'File not found' });
      }
  
      return res.download(filePath);
    } catch (error) {
      console.error('Download error', { error });
      res.status(500).json({ error: 'Download failed' });
    }
  })
  app.use("/", router)
  app.listen(5500, () => {
    console.log(`Server running on port 5500`);
  });
}
//async function startServer() {
//  const server = fork(path.resolve(__dirname, './start-server.js'));
//  server.on('error', (err) => {
//    console.log('SERVER ERROR', err);
//    server.kill(1);
//    process.exit(1);
//  });
//}
//