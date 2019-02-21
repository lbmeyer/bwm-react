import camelCase from 'camel-case';

let instance = null;

export class Cacher {
  cache = {};

  // create Cacher Singleton Instance 
  // (we always get the same instance of this class)
  constructor() {
    if (!instance) {
      instance = this;
    }

    return instance;
    
  }

  isValueCached(key) {
    return this.getCachedValue(key);
  }

  cacheValue(key, value) {
    this.cache[camelCase(key)] = value;
  }

  
  getCachedValue(key) {
    return this.cache[camelCase(key)];
  }
}

// sample cache object after location has been cached
// {
//   newYorkTimeSquare: 
//     {
//       lat: 40.759011,
//       lng: -73.98447220000003
//     }
// }