#!/usr/bin/env node

// @cli nodemon -w src -w bin/webwatch -x 'babel-node bin/webwatch watch --host https://news.ycombinator.com'
// @cli nodemon -w src -x 'npm run compile; webwatch --release'

import Promise from 'bluebird';
import chalk from 'chalk';
import yargs from 'yargs';
import {WebWatcher} from './..';

if (process.env.NODE_ENV === 'development') {
  require('source-map-support').install(); // eslint-disable-line
}

const argv = yargs
  .usage('Usage: $0 <command> [options]')
  .command('html', 'Watch a request html raw result')
  .command('text', 'Watch a request text result')
  .command('count', 'Watch a request count result')
  .command('sum', 'Watch a request sum\'ed result')
  .demand(1)
  .example('$0 html -u http://google.com', 'Watch google homepage for changes')
  .demand('u')
  .alias('u', 'url')
  .nargs('u', 1)
  .describe('u', 'Url to request')
  .alias('q', 'query')
  .describe('q', 'Query to perform')
  .alias('d', 'delay')
  .describe('d', 'Delay between queries')
  .alias('m', 'mandrill', 'mandrill-api-key')
  .describe('m', 'Mandrill API key')
  .alias('e', 'email')
  .describe('e', 'Notified email')
  .alias('p', 'phantomjs')
  .describe('p', 'Use PhantomJS')
  .alias('h', 'help')
  .help('help')
  .argv;

const watcher = new WebWatcher(argv);
