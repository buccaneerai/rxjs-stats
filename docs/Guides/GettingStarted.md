# Install

#### npm
```
npm i @buccaneer/rxjs-stats --save
```
#### yarn
```
yarn add @buccaneer/rxjs-stats
```

# Calculate real-time statistics!
```js
import { from } from 'rxjs';
import { map } from 'rxjs/operators';
import { mean } from '@buccaneer/rxjs-stats';

// create a data source
const pirate$ = from([
  {name: 'Henry Morgan', numShipsInFlotilla: 36, numOfCrew: 1900, numCannons: 240},
  {name: 'Captain Crunch', numShipsInFlotilla: 1, numOfCrew: 1, numCannons: 1},
  {name: 'BlackBeard', numShipsInFlotilla: 2, numOfCrew: 400, numCannons: 48},
]);

// describe calculations
const averageShipCount$ = pirate$.pipe(
  map(pirate => pirate.numShipsInFlotilla),
  mean()
);

// run the pipeline and do something with the results
averageShipCount$.subscribe(console.log);
```

# Next steps
* Check out the [full list of operators](https://app.gitbook.com/@brianbuccaneer/s/rxjs-stats/operators).
* Learn about [Hotstart Pipelines](https://app.gitbook.com/@brianbuccaneer/s/rxjs-stats/guides/warmstarts)