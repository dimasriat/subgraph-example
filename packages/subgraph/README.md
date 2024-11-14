# how to deploy

## Using TheGraph Studio
```
pnpm build:mainnet

npx graph auth --studio <DEPLOYMENT_KEY>
npx graph deploy <SUBGRAPH_NAME>
```
[example playground](https://api.studio.thegraph.com/query/48116/subgraph-template-example/v.0.0.2/graphql?query=%7B%0A++users+%7B%0A++++id%0A++++counters+%7B%0A++++++id%0A++++++count%0A++++%7D%0A++%7D%0A++counters+%7B%0A++++id%0A++++count%0A++++creator+%7B%0A++++++id%0A++++%7D%0A++%7D%0A%7D)


## Using Alchemy Subgraph
```
pnpm build:mainnet

npx graph deploy <SUBGRAPH_NAME> \
  --version-label <DEPLOYMENT_VERSION> \
  --node https://subgraphs.alchemy.com/api/subgraphs/deploy \
  --deploy-key <ALCHEMY_API_KEY> \
  --ipfs https://ipfs.satsuma.xyz

```

