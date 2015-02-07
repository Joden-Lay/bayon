BayonJS
===

```js

'use strict';

// export Home
module.exports = Home;

// Define class
function Home() {};

Home.index = function(req, res) {
    this.send(200, 'Hello World!');
};

```


### Quick Start

inside [app root] directory open and modify route.js as below

```js
module.exports = {
    root: {
        handler: 'Greeting@talk', // say which controller will handler this
        path: '/', // path for client request
        method: 'GET' //
    }
};
```

inside [app root]/controller directory create a controller file name GreetingController.js

```js
'use strict';

module.exports = Greeting;

function Greeting() {};

Greeting.talk = function() {
    this.send(200, 'Hello!'); // send 
};

```