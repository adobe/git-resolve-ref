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
const { main } = require('../main.js');

const ORG = 'adobe';
const REPO = 'helix-cli';
const REF = 'master';

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

  it('main function returns valid sha format', async () => {
    const { sha } = await main({ org: ORG, repo: REPO, ref: REF });
    assert(isValidSha(sha));
  });
});
