#!/usr/bin/env node

const { SignalContract } = require('@sotaoi/signal');
const { execSync } = require('child_process');
const path = require('path');

const main = async () => {
  const signalCore = require('./core');

  await signalCore.integrity();

  class Signal extends SignalContract {
    //
  }

  new Signal(require('../package.json'), {
    ...signalCore,
  })
    .console()
    .command('publish:sclient', null, null, () => {
      execSync(`npm publish --access public`, { cwd: path.resolve('./deployment'), stdio: 'inherit' });
    })
    .run();
};

main();
