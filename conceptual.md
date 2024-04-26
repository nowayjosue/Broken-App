### Conceptual Exercise

Answer the following questions below:

- What are some ways of managing asynchronous code in JavaScript?

Callbacks: Functions that execute after an async task.
Promises: Organize async code with better error handling.
Async/Await: Write async code that looks like sync code.

- What is a Promise?

A Promise is an object for handling async tasks. It resolves with data or rejects with an error.

- What are the differences between an async function and a regular function?

Async Function: Returns a Promise, uses await, handles async tasks.
Regular Function: Executes synchronously, no implicit Promise.

- What is the difference between Node.js and Express.js?

Node.js: JavaScript runtime for server-side tasks.
Express.js: Web framework built on Node.js for web apps.

- What is the error-first callback pattern?

Node.js pattern for callbacks: function(err, result).
Error passed as the first argument for consistency.

- What is middleware?

Middleware are functions in Express.js that process requests.

- What does the `next` function do?

Used to move to the next middleware.

- What are some issues with the following code? (consider all aspects: performance, structure, naming, etc)

```js
async function getUsers() {
  const elie = await $.getJSON('https://api.github.com/users/elie');
  const joel = await $.getJSON('https://api.github.com/users/joelburton');
  const matt = await $.getJSON('https://api.github.com/users/mmmaaatttttt');

  return [elie, matt, joel];
}
```

Poor performance and code is repeated unncessarily. Variable names could also be more description. There's a lack of error handling.