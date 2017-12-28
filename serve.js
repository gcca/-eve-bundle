#!/usr/bin/env node

const path = require('canonical-path');
const liteServer = require('lite-server');

liteServer.server({
  argv: ['', '', '-c', path.join(__dirname, 'bs-conf')],
});
