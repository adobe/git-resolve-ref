## Status
[![codecov](https://img.shields.io/codecov/c/github/adobe/git-resolve-branch.svg)](https://codecov.io/gh/adobe/git-resolve-branch)
[![CircleCI](https://img.shields.io/circleci/project/github/adobe/git-resolve-branch.svg)](https://circleci.com/gh/adobe/git-resolve-branch)
[![GitHub license](https://img.shields.io/github/license/adobe/git-resolve-branch.svg)](https://github.com/adobe/git-resolve-branch/blob/master/LICENSE.txt)
[![GitHub issues](https://img.shields.io/github/issues/adobe/git-resolve-branch.svg)](https://github.com/adobe/git-resolve-branch/issues)
[![LGTM Code Quality Grade: JavaScript](https://img.shields.io/lgtm/grade/javascript/g/adobe/git-resolve-branch.svg?logo=lgtm&logoWidth=18)](https://lgtm.com/projects/g/adobe/git-resolve-branch)

# git-resolve-branch

A Serverless Node.js action with zero dependencies. 

Resolves a git repository branch name to the corresponding commit sha.

## Deploy action

```bash
wsk action create git-resolve-ref index.js
```

## Invoke action

Parameters:

- `org`: GitHub organization or owner (e.g. `"adobe"`)
- `repo`: GitHub repository name (e.g. `"helix-cli"`)
- `branch`: branch name (optional, default: `"master"`)

```bash
wsk action invoke git-resolve-ref --param org "adobe" --param repo "helix-cli" --param branch "issue654" --result
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
