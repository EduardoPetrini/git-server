const path = require('path');
const { Git } = require('node-git-server');

const gitServer = new Git(path.resolve(__dirname, 'repos'), {
  autoCreate: true,
});

gitServer.on('push', async push => {
  console.log(132123);
  push.accept();
});

const port = process.env.PORT || 3004;

gitServer.listen(port, { type: 'http' }, () => {
  console.log('Git server is running on port ', port);
});

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
