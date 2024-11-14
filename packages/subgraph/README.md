how to deploy

```
pnpm build:mainnet

npx graph deploy <SUBGRAPH_NAME> \
  --version-label <DEPLOYMENT_VERSION> \
  --node https://subgraphs.alchemy.com/api/subgraphs/deploy \
  --deploy-key <ALCHEMY_API_KEY> \
  --ipfs https://ipfs.satsuma.xyz

```

```
pnpm build:mainnet

npx graph auth --studio <DEPLOYMENT_KEY>
npx graph deploy <SUBGRAPH_NAME>
```
