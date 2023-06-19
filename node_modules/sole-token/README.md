![logo](/static/logo.svg)

> A unique token generator NPM package!

<b>📦 Install with the help of npm or yarn</b>

```sh
npm install sole-token
# or
yarn add sole-token
```

## Usage
There is only one method in this package, and it supports four types of sub-methods and any character can be given as a delimiter.

### Supported type
- <b>uuid4</b> : a [RFC](https://www.ietf.org/rfc/rfc4122.txt) UUID version-4 id.
- <b>uuid1</b> : a [RFC](https://www.ietf.org/rfc/rfc4122.txt) UUID version-1 id.
- <b>token</b> : a unique token value with the help of random number.
- <b>id</b> : a numeric unique token value with the help of random number.

```js
const soleToken = require('sole-token');

console.log(soleToken({})); // default: { type: 'uuid4', delimiter: '-', size: 32 }
// Output => kDfKZe11-8073-0uER-SYDD-KPpXwaWdrehK

console.log(soleToken({ type: 'uuid1' }));
// Output => 1fcce411-e411-1fcc-28a0-00155d77aab6

console.log(soleToken({ type: 'token' }));
// Output => IMMcYU1058412nLqufqxN@PgtdcW@wKg

// If you adjust the size the type automatically become token, if they not a id type.
console.log(soleToken({ size: 5 }));
// Output => j~mDb

console.log(soleToken({ type: 'id', size: 5 }));
// Output => 45631
```

<hr>
💻 Thank You!
