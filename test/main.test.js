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

/* eslint-env mocha */

'use strict';

const assert = require('assert');
const rp = require('request-promise-native');
const { main } = require('../main.js');

const ORG = 'adobe';
const REPO = 'helix-cli';
const SHORT_REF = 'master';
const FULL_REF = 'refs/heads/master';

/**
 * Checks if the specified string is a valid SHA-1 value.
 *
 * @param {string} str
 * @returns {boolean} `true` if `str` represents a valid SHA-1, otherwise `false`
 */
function isValidSha(str) {
  if (typeof str === 'string' && str.length === 40) {
    const res = str.match(/[0-9a-f]/g);
    return res && res.length === 40;
  }
  return false;
}

describe('main tests', () => {
  it('main function is present', () => {
    assert(typeof main === 'function');
  });

  it('org param is manadatory', async () => {
    assert.rejects(main({ repo: REPO, ref: SHORT_REF }));
  });

  it('repo param is manadatory', async () => {
    assert.rejects(main({ org: ORG, ref: SHORT_REF }));
  });

  it('ref param is optional with default: master', async () => {
    const { fqRef } = await main({ org: ORG, repo: REPO });
    assert.equal(fqRef, 'refs/heads/master');
  });

  it('main function returns valid sha format', async () => {
    const { sha } = await main({ org: ORG, repo: REPO, ref: SHORT_REF });
    assert(isValidSha(sha));
  });

  it('main function support short and full ref names', async () => {
    const { sha: sha1 } = await main({ org: ORG, repo: REPO, ref: SHORT_REF });
    const { sha: sha2 } = await main({ org: ORG, repo: REPO, ref: FULL_REF });
    assert.equal(sha1, sha2);
  });

  it('main function resolves tag', async () => {
    const { sha: sha1, fqRef } = await main({ org: ORG, repo: REPO, ref: 'v1.0.0' });
    assert.equal(fqRef, 'refs/tags/v1.0.0');
    const { sha: sha2 } = await main({ org: ORG, repo: REPO, ref: 'refs/tags/v1.0.0' });
    assert.equal(sha1, sha2);
  });

  it('main function returns correct sha', async () => {
    const { sha } = await main({ org: ORG, repo: REPO, ref: SHORT_REF });
    const options = {
      uri: `https://api.github.com/repos/${ORG}/${REPO}/branches/${SHORT_REF}`,
      headers: {
        'User-Agent': 'Request-Promise',
      },
      json: true,
    };
    const { commit } = await rp(options);
    assert(commit && commit.sha === sha);
  });

  it('main function fails for non-existent ref', async () => {
    assert.rejects(main({ org: ORG, repo: REPO, ref: 'unknown' }));
  });
});
