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