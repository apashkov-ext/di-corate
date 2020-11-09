# di-corate
Another dependency injection implementation for Typescript using decorators.

## Install
`npm install composite-validation`
## Use
### Simple DI

```javascript
// service.ts
@Injectable()
export class Service {
    do() {}
}

// component.ts
export class Component {
    constructor(@Inject(Service) private readonly srv: Service) {
        srv.do();
        example();
    }

    private example() {
        this.srv.do();
    }
}
```
