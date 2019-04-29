## Status
[![codecov](https://img.shields.io/codecov/c/github/adobe/git-resolve-branch.svg)](https://codecov.io/gh/adobe/git-resolve-branch)
[![CircleCI](https://img.shields.io/circleci/project/github/adobe/git-resolve-branch.svg)](https://circleci.com/gh/adobe/git-resolve-branch)
[![GitHub license](https://img.shields.io/github/license/adobe/git-resolve-branch.svg)](https://github.com/adobe/git-resolve-branch/blob/master/LICENSE.txt)
[![GitHub issues](https://img.shields.io/github/issues/adobe/git-resolve-branch.svg)](https://github.com/adobe/git-resolve-branch/issues)
[![LGTM Code Quality Grade: JavaScript](https://img.shields.io/lgtm/grade/javascript/g/adobe/git-resolve-branch.svg?logo=lgtm&logoWidth=18)](https://lgtm.com/projects/g/adobe/git-resolve-branch)

# git-resolve-ref

A Serverless Node.js action with zero dependencies.

Resolves a Git reference (branch or tag) to the corresponding commit sha.

## Deploy action

```bash
wsk action create git-resolve-ref main.js
```

## Invoke action

Parameters:

- `org`: GitHub organization or owner (e.g. `"adobe"`)
- `repo`: GitHub repository name (e.g. `"helix-cli"`)
- `ref`: branch or tag name, either short (e.g  `"v0.1.2"`) or full name (e.g.`"refs/tags/v0.1.2"`) (optional, default: `"master"`)

```bash
wsk action invoke git-resolve-ref --param org "adobe" --param repo "helix-cli" --param ref "issue654" --result
```

Result:

```json
{
  "sha": "d18922f3914571e39af2c803d3498ca398dd09e7",
  "fqRef": "refs/heads/issue654"
}
```

## Development

### Build

```bash
npm install
```

### Test

```bash
npm test
```

### Lint

```bash
npm run lint
```
