# di-corate
Another dependency injection implementation for Typescript using decorators.

[![Build Status](https://travis-ci.com/apashkov-ext/di-corate.svg?branch=main)](https://travis-ci.com/apashkov-ext/di-corate)
[![npm version](https://img.shields.io/npm/v/di-corate)](https://www.npmjs.com/package/di-corate)
[![install size](https://packagephobia.now.sh/badge?p=di-corate)](https://packagephobia.now.sh/result?p=di-corate)
[![Coverage Status](https://coveralls.io/repos/github/apashkov-ext/di-corate/badge.svg?branch=main)](https://coveralls.io/github/apashkov-ext/di-corate?branch=main)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://github.com/git/git-scm.com/blob/master/MIT-LICENSE.txt)

## Installation
`npm install di-corate`
## Using
Use the library to engage the Dependency Injection in your project.
The library does not use the `reflect-metadata` package. The library supports two ways of dependency injection:
- **class property**
- **constructor parameter**

### Simple DI

**service1.ts**
```javascript
import { Injectable } from 'di-corate';

@Injectable()
export class Service1 {
    do() {}
}
```

**service2.ts**
```javascript
import { Injectable } from 'di-corate';

@Injectable()
export class Service2 {
    run() {}
}
```

**component.ts**
```javascript
import { Injectable, Inject } from 'di-corate';

@Injectable()
export class Component {
	// Inject into property.
    @Inject(Service1) private readonly srv1: Service1;
	
	// Inejct into constuctor parameter.
    constructor(@Inject(Service2) private readonly srv2: Service2) {
        srv2.do();
        example();
    }

    private example() {
        this.srv1.run();
    }
}
```

#### Dependency tree

**http-client.ts**
```javascript
import { Injectable } from 'di-corate';

@Injectable()
export class HttpClient {
    get(url: string) { return 'response'; }
}
```

**service.ts**
```javascript
import { Injectable, Inject } from 'di-corate';

@Injectable()
export class Service {
    constructor(@Inject(HttpClient) private readonly http: HttpClient) { }
    
    do() {
        const resp = this.http.get('someUrl');
        console.log(resp);
    }
}
```

**component.ts**
```javascript
import { Injectable, Inject } from 'di-corate';

@Injectable()
export class Component {
    constructor(@Inject(Service) private readonly srv: Service) {
        example();
    }

    private example() {
        this.srv.do();
    }
}
```

### Instance lifetime configuring
Its possible to configure instance lifecycle for each injectale type.

###### Examples

```javascript
import { Injectale, InjectionScopeEnum } from 'di-corate';

// Injects as singletone instance.
@Injectale()
export class SomeSingletone {
    abstract run(): void;
}

// Injects as singletone instance.
@Injectale({
    scope: InjectionScopeEnum.Singletone
})
export class OtherSingletone {
    abstract run(): void;
}

// Injects as transient instance.
@Injectale({
    scope: InjectionScopeEnum.Transient
})
export class SomeClass {
    abstract run(): void;
}
```

###### Explanation
<table>
<thead>
  <tr>
    <th>Injection scope</th>
    <th>Instance sharing</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td>Singletone (uses by default)</td>
    <td>One instance for the whole application</td>
  </tr>
  <tr>
    <td>Transient</td>
    <td>Dedicated instance for each consumer</td>
  </tr>
</tbody>
</table>

###### Time of instantiation


The moment in time when the dependency instance will be created depends on the chosen dependency injection way.

<table>
<thead>
  <tr>
    <th>Injection target</th>
    <th>Instantiation time</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td>Class property</td>
    <td>On first access to the property</td>
  </tr>
  <tr>
    <td>Constructor parameter</td>
    <td>During class instantiation</td>
  </tr>
</tbody>
</table>

### Custom provider setup

**service.ts**
```javascript
export abstract class Service {
    abstract run(): void;
}
```

**default-service.ts**
```javascript
import { Injectale } from 'di-corate';

@Injectale()
export class DefaultService implements Service {
    run() {
        console.log('Implementation');
    };
}
```

**component.ts**
```javascript
import { provide, Injectable, Inject } from 'di-corate';
import { DefaultService } from 'default-service';

provide(Service, DefaultService);

@Injectale()
export class Component {
    constructor(@Inject('Service') private readonly srv: Service) {
        example();
    }

    private example() {
        // Console: 'Implementation'.
		this.srv.run(); 
    }
}
```
## Road map
<table>
<tbody>
  <tr>
    <td>Singletone injection scope</td>
    <td>✅</td>
  </tr>
  <tr>
    <td>Transient</td>
    <td>✅</td>
  </tr>
  <tr>
    <td>String injection token</td>
    <td>❌</td>
  </tr>
   <tr>
    <td>Multiple dependencies for single token (array of instances)</td>
    <td>❌</td>
  </tr>
</tbody>
</table>