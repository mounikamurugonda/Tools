import { Blog } from '@/types';

export const blogs: Blog[] = [
  {
    id: '1',
    title: 'Getting Started with React',
    description: "A beginner's guide to building your first React application.",
    date: '2024-07-15',
    author: 'John Doe',
    category: 'React',
    image: '',
    relatedPosts: ['2', '3'],
    content: `
      <p>React is a popular JavaScript library for building user interfaces. In this guide, we'll walk through the basics of setting up a new React project and creating your first component.</p>
      <h2>Prerequisites</h2>
      <ul>
        <li>Node.js and npm installed on your machine</li>
        <li>Basic knowledge of HTML, CSS, and JavaScript</li>
      </ul>
      <h2>Step 1: Create a new React app</h2>
      <p>You can use Create React App to set up a new project quickly:</p>
      <pre><code>npx create-react-app my-app</code></pre>
      <h2>Step 2: Create your first component</h2>
      <p>Open the <code>src/App.js</code> file and replace the default content with a simple "Hello, World!" component:</p>
      <pre><code>
        import React from 'react';

        function App() {
          return (
            <div>
              <h1>Hello, World!</h1>
            </div>
          );
        }

        export default App;
      </code></pre>
      <h2>Step 3: Start the development server</h2>
      <p>Run the following command to see your app in action:</p>
      <pre><code>npm start</code></pre>
    `,
  },
  {
    id: '2',
    title: 'Understanding Hooks in React',
    description:
      'A deep dive into React Hooks and how they can simplify your components.',
    date: '2024-07-18',
    author: 'Jane Smith',
    category: 'React',
    image: '',
    relatedPosts: ['1', '3'],
    content: `
      <p>React Hooks were introduced in version 16.8, and they have revolutionized how we write components. In this post, we'll explore some of the most common Hooks, such as <code>useState</code> and <code>useEffect</code>.</p>
      <h2>useState</h2>
      <p>The <code>useState</code> Hook allows you to add state to functional components:</p>
      <pre><code>
        import React, { useState } from 'react';

        function Counter() {
          const [count, setCount] = useState(0);

          return (
            <div>
              <p>You clicked {count} times</p>
              <button onClick={() => setCount(count + 1)}>Click me</button>
            </div>
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

          return <div>{data ? <p>Data loaded</p> : <p>Loading...</p>}</div>;
        }
      </code></pre>
    `,
  },
  {
    id: '3',
    title: 'An Introduction to TypeScript',
    description:
      'Learn how TypeScript can improve your JavaScript projects with static typing.',
    date: '2024-07-20',
    author: 'Sam Wilson',
    category: 'TypeScript',
    image: '',
    relatedPosts: ['1', '2'],
    content: `
      <p>TypeScript is a superset of JavaScript that adds static types. This can help you catch errors early and write more maintainable code.</p>
      <h2>Basic Types</h2>
      <p>TypeScript provides several basic types, such as <code>string</code>, <code>number</code>, and <code>boolean</code>:</p>
      <pre><code>
        let isDone: boolean = false;
        let decimal: number = 6;
        let color: string = 'blue';
      </code></pre>
      <h2>Interfaces</h2>
      <p>Interfaces can be used to define the shape of an object:</p>
      <pre><code>
        interface Person {
          name: string;
          age: number;
        }

        function greet(person: Person) {
          return 'Hello, ' + person.name;
        }
      </code></pre>
    `,
  },
];
