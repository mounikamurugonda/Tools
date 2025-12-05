
import { Blog } from '@/types';

export const blogs: Blog[] = [
  {
    id: '1',
    title: 'Getting Started with React',
    description: 'A beginner\'s guide to building your first React application.',
    date: '2024-07-15',
    author: 'John Doe',
    category: 'React',
    content: "\
      <p>React is a popular JavaScript library for building user interfaces. In this guide, we\'ll walk through the basics of setting up a new React project and creating your first component.</p>\n      <h2>Prerequisites</h2>\n      <ul>\n        <li>Node.js and npm installed on your machine</li>\n        <li>Basic knowledge of HTML, CSS, and JavaScript</li>\n      </ul>\n      <h2>Step 1: Create a new React app</h2>\n      <p>You can use Create React App to set up a new project quickly:</p>\n      <pre><code>npx create-react-app my-app</code></pre>\n      <h2>Step 2: Create your first component</h2>\n      <p>Open the <code>src/App.js</code> file and replace the default content with a simple \"Hello, World!\" component:</p>\n      <pre><code>\n        import React from 'react';\n\n        function App() {\n          return (\n            <div>\n              <h1>Hello, World!</h1>\n            </div>\n          );\n        }\n\n        export default App;\n      </code></pre>\n      <h2>Step 3: Start the development server</h2>\n      <p>Run the following command to see your app in action:</p>\n      <pre><code>npm start</code></pre>\n    ",
  },
  {
    id: '2',
    title: 'Understanding Hooks in React',
    description: 'A deep dive into React Hooks and how they can simplify your components.',
    date: '2024-07-18',
    author: 'Jane Smith',
    category: 'React',
    content: `
      <p>React Hooks were introduced in version 16.8, and they have revolutionized how we write components. In this post, we'll explore some of the most common Hooks, such as <code>useState</code> and <code>useEffect</code>.</p>
      <h2>useState</h2>
      <p>The <code>useState</code> Hook allows you to add state to functional components:</p>
      <pre><code>
        import React, { useState } from 'react';

        function Counter() {
          const [count, setCount] = useState(0);

          return (
            &lt;div&gt;
              &lt;p&gt;You clicked {count} times&lt;/p&gt;
              &lt;button onClick={() => setCount(count + 1)}&gt;Click me&lt;/button&gt;
            &lt;/div&gt;
          );
        }
      </code></pre>
      <h2>useEffect</h2>
      <p>The <code>useEffect</code> Hook lets you perform side effects in functional components, such as fetching data or subscribing to events:</p>
      <pre><code>
        import React, { useState, useEffect } from 'react';

        function Example() {
          const [data, setData] = useState(null);

          useEffect(() => {
            fetch('https://api.example.com/data')
              .then(response => response.json())
              .then(data => setData(data));
          }, []);

          return &lt;div&gt;{data ? &lt;p&gt;Data loaded&lt;/p&gt; : &lt;p&gt;Loading...&lt;/p&gt;}&lt;/div&gt;;
        }
      </code></pre>
    `,
  },
  {
    id: '3',
    title: 'An Introduction to TypeScript',
    description: 'Learn how TypeScript can improve your JavaScript projects with static typing.',
    date: '2024-07-20',
    author: 'Sam Wilson',
    category: 'TypeScript',
    content: "\
      <p>TypeScript is a superset of JavaScript that adds static types. This can help you catch errors early and write more maintainable code.</p>\n      <h2>Basic Types</h2>\n      <p>TypeScript provides several basic types, such as <code>string</code>, <code>number</code>, and <code>boolean</code>:</p>\n      <pre><code>\n        let isDone: boolean = false;\n        let decimal: number = 6;\n        let color: string = 'blue';\n      </code></pre>\n      <h2>Interfaces</h2>\n      <p>Interfaces can be used to define the shape of an object:</p>\n      <pre><code>\n        interface Person {\n          name: string;\n          age: number;\n        }\n\n        function greet(person: Person) {\n          return 'Hello, ' + person.name;\n        }\n      </code></pre>\n    ",
  },
];
