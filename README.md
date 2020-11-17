# di-corate
Another dependency injection implementation for Typescript using decorators.

[![Build Status](https://travis-ci.com/apashkov-ext/di-corate.svg?branch=main)](https://travis-ci.com/apashkov-ext/di-corate)
[![npm version](https://img.shields.io/npm/v/di-corate)](https://www.npmjs.com/package/di-corate)
[![install size](https://packagephobia.now.sh/badge?p=di-corate)](https://packagephobia.now.sh/result?p=di-corate)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://github.com/git/git-scm.com/blob/master/MIT-LICENSE.txt)

## Installation
`npm install di-corate`
## Using
Use the library to engage the Dependency Injection in your project.
The library does not use the `reflect-metadata` package.
#### Simple DI

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
import { Inject, PropInject } from 'di-corate';

export class Component {
    @PropInject(Service1) private readonly srv1: Service1;

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
import { Inject } from 'di-corate';

export class Component {
    constructor(@Inject(Service) private readonly srv: Service) {
        example();
    }

    private example() {
        this.srv.do();
    }
}
```

#### Container setup

**service.ts**
```javascript
export interface Service {
    run(): void;
}
```

**default-service.ts**
```javascript
export class DefaultService implements Service {
    run() {
        console.log('Implementation');
    };
}
```

**component.ts**
```javascript
import { addSingletone, Inject } from 'di-corate';
import { DefaultService } from 'default-service';

addSingletone('Service', DefaultService);

export class Component {
    constructor(@Inject('Service') private readonly srv: Service) {
        example();
    }

    private example() {
        this.srv.run(); // Console: 'Implementation'
    }
}
```

## Roadmap
- ~~tests~~
- ~~singletone registration~~
- scoped registration