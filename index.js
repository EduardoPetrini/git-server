const dotenv = require('dotenv');

dotenv.config();

const express = require('express');
const path = require('path');
const { Git } = require('node-git-server');
const http = require('http');
const https = require('https');

const app = express();

const gitServer = new Git(path.resolve(__dirname, 'repos'), {
  autoCreate: true,
});

gitServer.on('push', async push => {
  console.log(132123);
  push.accept();
});

const port = process.env.PORT || 3004;

const { NODE_ENV: env } = process.env;
const serverType = env === 'production' ? 'https' : 'http';

gitServer.listen(port, { type: serverType }, () => {
  console.log('Git server is running on port ',port, serverType);
});

const serverProtocol = env === 'production' ? http : http;

// const server = serverProtocol.createServer(app);

// server.listen(port, () => {
//   console.log(`listening on port ${port}, env ${env}, serverType ${serverType}`);
// });


const func = async () => {
  const response = await gitServer.list();
  console.log(response);
};

// extension: first git push
// user: change the code
// extension: upload the changed file
// server: clone the repo (if no exist);
// server: replace the same file with the user's one
// server: commit with the timestamp
// server: push to itself
// server: delete the clone (after a timeout?)

// checkout to the new branch
// commit
// push
// revert --no-commit
// checkout back to the user branch - problem here
// delete the new branch

// git stash
// checkout to the new branch
// git stash apply
// commit
// push
// checkout back to the user branch
// git stash apply
// git branch -D new branch
