/*
 * Copyright 2019 Adobe. All rights reserved.
 * This file is licensed to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 */

/* eslint-disable no-console */
/* eslint-disable prefer-promise-reject-errors */

const https = require('https');

function main({ org, repo, ref = 'master' }) {
  return new Promise((resolve, reject) => {
    if (!org || !repo) {
      reject('org and repo are mandatory parameters');
      return;
    }

    https.get(`https://github.com/${org}/${repo}.git/info/refs?service=git-upload-pack`, (res) => {
      const { statusCode } = res;

      if (statusCode !== 200) {
        // consume response data to free up memory
        res.resume();
        reject(`failed to fetch git repo info (statusCode: ${statusCode})`);
        return;
      }
      res.setEncoding('utf8');
      let rawData = '';
      res.on('data', (chunk) => {
        rawData += chunk;
      });
      res.on('end', () => {
        const fqBranch = ref.startsWith('refs/heads/') ? ref : `refs/heads/${ref}`;
        const result = rawData.split('\n').filter((row) => {
          const parts = row.split(' ');
          return parts.length === 2 && parts[1] === fqBranch;
        }).map(row => row.split(' '));
        if (result.length) {
          resolve({ hash: result[0][0], ref: result[0][1] });
        } else {
          reject('ref not found');
        }
      });
    }).on('error', (e) => {
      console.error(e);
      reject(e.toString());
    });
  });
}

exports.main = main;
