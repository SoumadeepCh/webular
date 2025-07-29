const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, ".env") });
const mongoose = require("mongoose");
const Question = require("./dist/src/models/question.js").default;

const sampleQuestions = [
	// CSS Questions
	{
		title: "Responsive Grid Layout with CSS Grid",
		description:
			"Create a responsive grid layout that adapts to different screen sizes using CSS Grid properties.",
		category: "css",
		difficulty: "medium",
		testCases: [],
		image: "",
		baseCode: `
<div class="grid-container">
  <div class="grid-item">1</div>
  <div class="grid-item">2</div>
  <div class="grid-item">3</div>
  <div class="grid-item">4</div>
</div>

<style>
.grid-container {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
}
.grid-item {
  background-color: lightblue;
  padding: 20px;
  text-align: center;
}
</style>
`,
		answerCode: `
<div class="grid-container">
  <div class="grid-item">1</div>
  <div class="grid-item">2</div>
  <div class="grid-item">3</div>
  <div class="grid-item">4</div>
</div>

<style>
.grid-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 10px;
}
.grid-item {
  background-color: lightblue;
  padding: 20px;
  text-align: center;
}
</style>
`,
	},
	{
		title: "Animated Loading Spinner",
		description:
			"Design a smooth, rotating loading spinner using CSS animations and keyframes.",
		category: "css",
		difficulty: "easy",
		testCases: [],
		image: "",
		baseCode: `
<div class="spinner"></div>

<style>
.spinner {
  width: 50px;
  height: 50px;
  border: 5px solid #f3f3f3;
  border-top: 5px solid #3498db;
  border-radius: 50%;
}
</style>
`,
		answerCode: `
<div class="spinner"></div>

<style>
.spinner {
  width: 50px;
  height: 50px;
  border: 5px solid #f3f3f3;
  border-top: 5px solid #3498db;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
</style>
`,
	},
	{
		title: "Complex Flexbox Navigation",
		description:
			"Build a complex navigation bar with dropdown menus using advanced Flexbox techniques.",
		category: "css",
		difficulty: "hard",
		testCases: [],
		image: "",
		baseCode: `
<nav class="navbar">
  <ul class="nav-links">
    <li><a href="#">Home</a></li>
    <li><a href="#">About</a></li>
    <li>
      <a href="#">Services</a>
      <ul class="dropdown">
        <li><a href="#">Web Design</a></li>
        <li><a href="#">SEO</a></li>
      </ul>
    </li>
    <li><a href="#">Contact</a></li>
  </ul>
</nav>

<style>
.navbar {
  background-color: #333;
  padding: 10px;
}
.nav-links {
  list-style: none;
  margin: 0;
  padding: 0;
}
.nav-links li {
  display: inline-block;
  position: relative;
}
.nav-links a {
  display: block;
  color: white;
  padding: 10px 15px;
  text-decoration: none;
}
.dropdown {
  display: none;
  position: absolute;
  background-color: #444;
  list-style: none;
  padding: 0;
  min-width: 160px;
}
.nav-links li:hover .dropdown {
  display: block;
}
.dropdown li a {
  padding: 8px 15px;
}
</style>
`,
		answerCode: `
<nav class="navbar">
  <ul class="nav-links">
    <li><a href="#">Home</a></li>
    <li><a href="#">About</a></li>
    <li>
      <a href="#">Services</a>
      <ul class="dropdown">
        <li><a href="#">Web Design</a></li>
        <li><a href="#">SEO</a></li>
      </ul>
    </li>
    <li><a href="#">Contact</a></li>
  </ul>
</nav>

<style>
.navbar {
  background-color: #333;
  padding: 10px;
}
.nav-links {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  justify-content: space-around;
  align-items: center;
}
.nav-links li {
  position: relative;
}
.nav-links a {
  display: block;
  color: white;
  padding: 10px 15px;
  text-decoration: none;
}
.dropdown {
  display: none;
  position: absolute;
  background-color: #444;
  list-style: none;
  padding: 0;
  min-width: 160px;
  flex-direction: column; /* Added for dropdown */
}
.nav-links li:hover .dropdown {
  display: flex; /* Changed to flex */
}
.dropdown li a {
  padding: 8px 15px;
}
</style>
`,
	},
	{
		title: "Custom CSS Variables Theme",
		description:
			"Implement a dark/light theme system using CSS custom properties and JavaScript.",
		category: "css",
		difficulty: "medium",
		testCases: [],
		image: "",
		baseCode: `
<button id="theme-toggle">Toggle Theme</button>
<div class="container">
  <h1>Hello World</h1>
  <p>This is some content.</p>
</div>

<style>
:root {
  --bg-color: #ffffff;
  --text-color: #000000;
}

body {
  background-color: var(--bg-color);
  color: var(--text-color);
}
</style>

<script>
document.getElementById('theme-toggle').addEventListener('click', () => {
  // Toggle theme logic here
});
</script>
`,
		answerCode: `
<button id="theme-toggle">Toggle Theme</button>
<div class="container">
  <h1>Hello World</h1>
  <p>This is some content.</p>
</div>

<style>
:root {
  --bg-color: #ffffff;
  --text-color: #000000;
}

body.dark-theme {
  --bg-color: #333333;
  --text-color: #ffffff;
}

body {
  background-color: var(--bg-color);
  color: var(--text-color);
  transition: background-color 0.3s, color 0.3s;
}
</style>

<script>
document.getElementById('theme-toggle').addEventListener('click', () => {
  document.body.classList.toggle('dark-theme');
});
</script>
`,
	},
	// HTML Questions
	{
		title: "Basic HTML Document Structure",
		description:
			"Explain the basic structure of an HTML document, including doctype, html, head, and body tags.",
		category: "html",
		difficulty: "easy",
		testCases: [],
		image: "",
		baseCode: `
<!-- Write your HTML structure here -->
`,
		answerCode: `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
</head>
<body>
  <!-- Content goes here -->
</body>
</html>
`,
	},
	{
		title: "Semantic HTML5 Elements",
		description:
			"Discuss the importance of semantic HTML5 elements like <header>, <nav>, <article>, <section>, and <footer>.",
		category: "html",
		difficulty: "medium",
		testCases: [],
		image: "",
		baseCode: `
<div id="header">Header</div>
<div id="navigation">Navigation</div>
<div id="content">
  <div class="post">Post 1</div>
  <div class="section">Section 1</div>
</div>
<div id="footer">Footer</div>
`,
		answerCode: `
<header>Header</header>
<nav>Navigation</nav>
<main>
  <article>Post 1</article>
  <section>Section 1</section>
</main>
<footer>Footer</footer>
`,
	},
	{
		title: "HTML Forms and Input Types",
		description:
			"Describe various HTML form input types and their uses, including text, password, checkbox, radio, and submit.",
		category: "html",
		difficulty: "medium",
		testCases: [],
		image: "",
		baseCode: `
<form>
  <label for="username">Username:</label>
  <input type="text" id="username" name="username">
  <input type="submit" value="Submit">
</form>
`,
		answerCode: `
<form>
  <label for="username">Username:</label>
  <input type="text" id="username" name="username" required><br><br>

  <label for="password">Password:</label>
  <input type="password" id="password" name="password" required><br><br>

  <input type="checkbox" id="remember" name="remember">
  <label for="remember">Remember me</label><br><br>

  <p>Choose your favorite programming language:</p>
  <input type="radio" id="html" name="fav_language" value="HTML">
  <label for="html">HTML</label><br>
  <input type="radio" id="css" name="fav_language" value="CSS">
  <label for="css">CSS</label><br>
  <input type="radio" id="javascript" name="fav_language" value="JavaScript">
  <label for="javascript">JavaScript</label><br><br>

  <input type="submit" value="Submit">
</form>
`,
	},
	{
		title: "Embedding Multimedia in HTML",
		description:
			"Explain how to embed images, audio, and video in HTML documents using appropriate tags and attributes.",
		category: "html",
		difficulty: "easy",
		testCases: [],
		image: "",
		baseCode: `
<!-- Embed an image, audio, and video here -->
`,
		answerCode: `
<img src="image.jpg" alt="A descriptive image" width="300" height="200">

<audio controls>
  <source src="audio.mp3" type="audio/mpeg">
  Your browser does not support the audio element.
</audio>

<video controls width="400" height="300">
  <source src="video.mp4" type="video/mp4">
  Your browser does not support the video tag.
</video>
`,
	},
	{
		title: "HTML Tables for Data Presentation",
		description:
			"Demonstrate how to create well-structured HTML tables with headers, rows, and cells.",
		category: "html",
		difficulty: "easy",
		testCases: [],
		image: "",
		baseCode: `
<!-- Create an HTML table here -->
`,
		answerCode: `
<table>
  <thead>
    <tr>
      <th>Name</th>
      <th>Age</th>
      <th>City</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>John Doe</td>
      <td>30</td>
      <td>New York</td>
    </tr>
    <tr>
      <td>Jane Smith</td>
      <td>25</td>
      <td>London</td>
    </tr>
  </tbody>
</table>
`,
	},
	{
		title: "HTML Accessibility Best Practices",
		description:
			"Discuss key HTML practices for improving web accessibility, such as alt text, ARIA attributes, and proper heading structure.",
		category: "html",
		difficulty: "hard",
		testCases: [],
		image: "",
		baseCode: `
<img src="logo.png">
<div>Page Title</div>
<button>Close</button>
`,
		answerCode: `
<img src="logo.png" alt="Company Logo">
<h1 aria-label="Main Page Title">Page Title</h1>
<button aria-label="Close dialog" tabindex="0">Close</button>
`,
	},
	// JavaScript Questions
	{
		title: "Understanding JavaScript Closures",
		description:
			"Explain what closures are in JavaScript and provide a practical example of their use.",
		category: "js",
		difficulty: "medium",
		testCases: [],
		image: "",
		baseCode: `
function outerFunction() {
  let outerVariable = 'I am from outer function';

  function innerFunction() {
    // Your code here to demonstrate closure
  }

  return innerFunction;
}

const myInnerFunction = outerFunction();
myInnerFunction();
`,
		answerCode: `
function outerFunction() {
  let outerVariable = 'I am from outer function';

  function innerFunction() {
    console.log(outerVariable); // innerFunction "closes over" outerVariable
  }

  return innerFunction;
}

const myInnerFunction = outerFunction();
myInnerFunction(); // This will log "I am from outer function"
`,
	},
	{
		title: "Asynchronous JavaScript: Callbacks, Promises, Async/Await",
		description:
			"Compare and contrast callbacks, Promises, and async/await for handling asynchronous operations in JavaScript.",
		category: "js",
		difficulty: "hard",
		testCases: [],
		image: "",
		baseCode: `
// Callback example
function fetchDataCallback(callback) {
  setTimeout(() => {
    callback("Data from callback");
  }, 1000);
}

// Promise example
function fetchDataPromise() {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve("Data from Promise");
    }, 1000);
  });
}

// Async/Await example
async function fetchDataAsync() {
  // Your code here
}

fetchDataCallback(data => console.log(data));
fetchDataPromise().then(data => console.log(data));
fetchDataAsync();
`,
		answerCode: `
// Callback example
function fetchDataCallback(callback) {
  setTimeout(() => {
    callback("Data from callback");
  }, 1000);
}

// Promise example
function fetchDataPromise() {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve("Data from Promise");
    }, 1000);
  });
}

// Async/Await example
async function fetchDataAsync() {
  const data = await new Promise(resolve => {
    setTimeout(() => {
      resolve("Data from Async/Await");
    }, 1000);
  });
  console.log(data);
}

fetchDataCallback(data => console.log(data));
fetchDataPromise().then(data => console.log(data));
fetchDataAsync();
`,
	},
	{
		title: "Event Delegation in JavaScript",
		description:
			"Describe the concept of event delegation and explain its benefits with a code example.",
		category: "js",
		difficulty: "medium",
		testCases: [],
		image: "",
		baseCode: `
<ul id="myList">
  <li>Item 1</li>
  <li>Item 2</li>
  <li>Item 3</li>
</ul>

<script>
// Add individual event listeners (less efficient)
document.getElementById('myList').children[0].addEventListener('click', () => console.log('Item 1 clicked'));
document.getElementById('myList').children[1].addEventListener('click', () => console.log('Item 2 clicked'));
document.getElementById('myList').children[2].addEventListener('click', () => console.log('Item 3 clicked'));
</script>
`,
		answerCode: `
<ul id="myList">
  <li>Item 1</li>
  <li>Item 2</li>
  <li>Item 3</li>
</ul>

<script>
// Event delegation (more efficient)
document.getElementById('myList').addEventListener('click', (event) => {
  if (event.target.tagName === 'LI') {
    console.log(event.target.textContent + ' clicked');
  }
});
</script>
`,
	},
	{
		title: "JavaScript 'this' Keyword",
		description:
			"Explain the different contexts in which the 'this' keyword behaves in JavaScript (global, object method, constructor, explicit binding, arrow functions).",
		category: "js",
		difficulty: "hard",
		testCases: [],
		image: "",
		baseCode: `
// Global context
console.log(this);

// Object method
const obj = {
  name: 'Alice',
  greet: function() {
    console.log(this.name);
  }
};
obj.greet();

// Constructor function
function Person(name) {
  this.name = name;
}
const person1 = new Person('Bob');
console.log(person1.name);

// Explicit binding
function sayName() {
  console.log(this.name);
}
const anotherPerson = { name: 'Charlie' };
sayName.call(anotherPerson);

// Arrow function
const arrowObj = {
  name: 'David',
  greet: () => {
    console.log(this.name);
  }
};
arrowObj.greet();
`,
		answerCode: `
// Global context (window in browsers, undefined in strict mode modules)
console.log(this);

// Object method (this refers to the object)
const obj = {
  name: 'Alice',
  greet: function() {
    console.log(this.name);
  }
};
obj.greet();

// Constructor function (this refers to the new instance)
function Person(name) {
  this.name = name;
}
const person1 = new Person('Bob');
console.log(person1.name);

// Explicit binding (call, apply, bind)
function sayName() {
  console.log(this.name);
}
const anotherPerson = { name: 'Charlie' };
sayName.call(anotherPerson); // 'this' is explicitly set to anotherPerson

// Arrow function (this is lexically scoped, inherits from parent scope)
const arrowObj = {
  name: 'David',
  greet: () => {
    console.log(this); // 'this' refers to the global object (window) or undefined
  }
};
arrowObj.greet();
`,
	},
	{
		title: "Prototypal Inheritance vs. Class-based Inheritance",
		description:
			"Compare prototypal inheritance with class-based inheritance in JavaScript, highlighting their differences and use cases.",
		category: "js",
		difficulty: "hard",
		testCases: [],
		image: "",
		baseCode: `
// Prototypal Inheritance (old way)
function Animal(name) {
  this.name = name;
}
Animal.prototype.speak = function() {
  console.log(this.name + ' makes a sound.');
};

function Dog(name, breed) {
  Animal.call(this, name);
  this.breed = breed;
}
Dog.prototype = Object.create(Animal.prototype);
Dog.prototype.constructor = Dog;
Dog.prototype.bark = function() {
  console.log(this.name + ' barks.');
};

const myDog = new Dog('Buddy', 'Golden Retriever');
myDog.speak();
myDog.bark();

// Class-based Inheritance (ES6+)
class Vehicle {
  constructor(type) {
    this.type = type;
  }
  drive() {
    console.log(this.type + ' is driving.');
  }
}

class Car extends Vehicle {
  constructor(type, model) {
    super(type);
    this.model = model;
  }
  honk() {
    console.log(this.model + ' honks.');
  }
}

const myCar = new Car('Car', 'Tesla');
myCar.drive();
myCar.honk();
`,
		answerCode: `
// Prototypal Inheritance (old way)
function Animal(name) {
  this.name = name;
}
Animal.prototype.speak = function() {
  console.log(this.name + ' makes a sound.');
};

function Dog(name, breed) {
  Animal.call(this, name); // Call parent constructor
  this.breed = breed;
}
Dog.prototype = Object.create(Animal.prototype); // Inherit prototype
Dog.prototype.constructor = Dog; // Reset constructor
Dog.prototype.bark = function() {
  console.log(this.name + ' barks.');
};

const myDog = new Dog('Buddy', 'Golden Retriever');
myDog.speak();
myDog.bark();

// Class-based Inheritance (ES6+)
class Vehicle {
  constructor(type) {
    this.type = type;
  }
  drive() {
    console.log(this.type + ' is driving.');
  }
}

class Car extends Vehicle {
  constructor(type, model) {
    super(type); // Call parent constructor
    this.model = model;
  }
  honk() {
    console.log(this.model + ' honks.');
  }
}

const myCar = new Car('Car', 'Tesla');
myCar.drive();
myCar.honk();
`,
	},
	// SQL Questions
	{
		title: "Basic SQL SELECT Statement",
		description:
			"Write a SQL query to select all columns from a table named 'Employees'.",
		category: "sql",
		difficulty: "easy",
		testCases: [],
		image: "",
		baseCode: `
-- Write your SQL query here
`,
		answerCode: `
SELECT * FROM Employees;
`,
	},
	{
		title: "SQL Joins: INNER, LEFT, RIGHT, FULL",
		description:
			"Explain the different types of SQL JOINs (INNER, LEFT, RIGHT, FULL) and provide examples for each.",
		category: "sql",
		difficulty: "medium",
		testCases: [],
		image: "",
		baseCode: `
-- Assume two tables: Orders (OrderID, CustomerID) and Customers (CustomerID, CustomerName)

-- INNER JOIN
-- SELECT ... FROM Orders ... Customers ON ...

-- LEFT JOIN
-- SELECT ... FROM Orders ... Customers ON ...

-- RIGHT JOIN
-- SELECT ... FROM Orders ... Customers ON ...

-- FULL JOIN
-- SELECT ... FROM Orders ... Customers ON ...
`,
		answerCode: `
-- Assume two tables: Orders (OrderID, CustomerID) and Customers (CustomerID, CustomerName)

-- INNER JOIN: Returns rows when there is a match in both tables.
SELECT Orders.OrderID, Customers.CustomerName
FROM Orders
INNER JOIN Customers ON Orders.CustomerID = Customers.CustomerID;

-- LEFT JOIN (or LEFT OUTER JOIN): Returns all rows from the left table, and the matching rows from the right table. If there is no match, NULL is used for right side.
SELECT Orders.OrderID, Customers.CustomerName
FROM Orders
LEFT JOIN Customers ON Orders.CustomerID = Customers.CustomerID;

-- RIGHT JOIN (or RIGHT OUTER JOIN): Returns all rows from the right table, and the matching rows from the left table. If there is no match, NULL is used for left side.
SELECT Orders.OrderID, Customers.CustomerName
FROM Orders
RIGHT JOIN Customers ON Orders.CustomerID = Customers.CustomerID;

-- FULL JOIN (or FULL OUTER JOIN): Returns all rows when there is a match in one of the tables.
SELECT Orders.OrderID, Customers.CustomerName
FROM Orders
FULL OUTER JOIN Customers ON Orders.CustomerID = Customers.CustomerID
WHERE Orders.CustomerID IS NOT NULL OR Customers.CustomerID IS NOT NULL;
`,
	},
	{
		title: "SQL Aggregate Functions",
		description:
			"Describe common SQL aggregate functions (COUNT, SUM, AVG, MIN, MAX) and how to use them with GROUP BY and HAVING clauses.",
		category: "sql",
		difficulty: "medium",
		testCases: [],
		image: "",
		baseCode: `
-- Assume a table: Products (ProductID, Category, Price)

-- Count products per category
-- SELECT ... FROM Products ... GROUP BY ...

-- Sum of prices per category
-- SELECT ... FROM Products ... GROUP BY ...

-- Average price for categories with more than 10 products
-- SELECT ... FROM Products ... GROUP BY ... HAVING ...
`,
		answerCode: `
-- Assume a table: Products (ProductID, Category, Price)

-- Count products per category
SELECT Category, COUNT(ProductID) AS NumberOfProducts
FROM Products
GROUP BY Category;

-- Sum of prices per category
SELECT Category, SUM(Price) AS TotalPrice
FROM Products
GROUP BY Category;

-- Average price for categories with more than 10 products
SELECT Category, AVG(Price) AS AveragePrice
FROM Products
GROUP BY Category
HAVING COUNT(ProductID) > 10;
`,
	},
	{
		title: "SQL Subqueries and CTEs",
		description:
			"Explain the concept of SQL subqueries and Common Table Expressions (CTEs), and when to use them.",
		category: "sql",
		difficulty: "hard",
		testCases: [],
		image: "",
		baseCode: `
-- Assume a table: Employees (EmployeeID, Name, Salary, DepartmentID)
-- Assume a table: Departments (DepartmentID, DepartmentName)

-- Find employees who earn more than the average salary of their department using a subquery
-- SELECT ... FROM Employees WHERE Salary > (SELECT AVG(Salary) FROM Employees WHERE DepartmentID = E.DepartmentID)

-- Find departments with more than 5 employees using a CTE
-- WITH DepartmentEmployeeCount AS (...)
-- SELECT ... FROM DepartmentEmployeeCount WHERE ...
`,
		answerCode: `
-- Assume a table: Employees (EmployeeID, Name, Salary, DepartmentID)
-- Assume a table: Departments (DepartmentID, DepartmentName)

-- Find employees who earn more than the average salary of their department using a subquery
SELECT E.Name, E.Salary, D.DepartmentName
FROM Employees E
JOIN Departments D ON E.DepartmentID = D.DepartmentID
WHERE E.Salary > (SELECT AVG(Salary) FROM Employees WHERE DepartmentID = E.DepartmentID);

-- Find departments with more than 5 employees using a CTE
WITH DepartmentEmployeeCount AS (
  SELECT DepartmentID, COUNT(EmployeeID) AS EmployeeCount
  FROM Employees
  GROUP BY DepartmentID
)
SELECT D.DepartmentName, DEC.EmployeeCount
FROM Departments D
JOIN DepartmentEmployeeCount DEC ON D.DepartmentID = DEC.DepartmentID
WHERE DEC.EmployeeCount > 5;
`,
	},
	{
		title: "SQL Indexing for Performance",
		description:
			"Discuss the purpose of database indexing in SQL and how it can improve query performance.",
		category: "sql",
		difficulty: "hard",
		testCases: [],
		image: "",
		baseCode: `
-- Assume a table: Orders (OrderID, CustomerID, OrderDate)

-- Create an index on CustomerID to speed up queries filtering by customer
-- CREATE INDEX ... ON Orders (...)
`,
		answerCode: `
-- Assume a table: Orders (OrderID, CustomerID, OrderDate)

-- Purpose of Indexing:
-- Indexes are special lookup tables that the database search engine can use to speed up data retrieval.
-- Think of it like an index in a book; instead of reading the entire book to find a topic, you look up the topic in the index and go directly to the relevant page.

-- How it improves performance:
-- When you query a table, especially with WHERE clauses, JOINs, or ORDER BY clauses,
-- the database might have to perform a full table scan, which is slow for large tables.
-- An index allows the database to quickly locate the rows without scanning the entire table.

-- Example of creating a non-clustered index on CustomerID:
CREATE INDEX IX_Orders_CustomerID
ON Orders (CustomerID);

-- Example of creating a clustered index (usually on primary key, only one per table):
-- CREATE CLUSTERED INDEX PK_Orders_OrderID
-- ON Orders (OrderID);
`,
	},
	// MongoDB Questions
	{
		title: "Basic MongoDB Operations: Insert, Find, Update, Delete",
		description:
			"Demonstrate basic CRUD operations (Create, Read, Update, Delete) in MongoDB using the `mongo` shell or a Node.js driver.",
		category: "mongodb",
		difficulty: "easy",
		testCases: [],
		image: "",
		baseCode: `
// Connect to MongoDB (assuming 'mydb' database)
// use mydb;

// Insert a single document
// db.mycollection.insertOne(...)

// Find all documents
// db.mycollection.find(...)

// Find documents with a condition
// db.mycollection.find(...)

// Update a document
// db.mycollection.updateOne(...)

// Delete a document
// db.mycollection.deleteOne(...)
`,
		answerCode: `
// Connect to MongoDB (assuming 'mydb' database)
use mydb;

// Insert a single document
db.mycollection.insertOne({ name: "Alice", age: 30, city: "New York" });

// Find all documents
db.mycollection.find({});

// Find documents with a condition
db.mycollection.find({ city: "New York" });

// Update a document
db.mycollection.updateOne(
  { name: "Alice" },
  { $set: { age: 31 } }
);

// Delete a document
db.mycollection.deleteOne({ name: "Alice" });
`,
	},
	{
		title: "MongoDB Aggregation Framework",
		description:
			"Use the MongoDB aggregation framework to perform data analysis, such as grouping, filtering, and calculating averages.",
		category: "mongodb",
		difficulty: "medium",
		testCases: [],
		image: "",
		baseCode: `
// Assume a collection: orders (orderId, customerId, totalAmount, status)

// Find the total amount for each customer
// db.orders.aggregate([
//   { $group: { _id: "$customerId", totalOrders: { $sum: "$totalAmount" } } }
// ])

// Find the average order amount for 'completed' orders
// db.orders.aggregate([
//   { $match: { status: "completed" } },
//   { $group: { _id: null, averageAmount: { $avg: "$totalAmount" } } }
// ])
`,
		answerCode: `
// Assume a collection: orders (orderId, customerId, totalAmount, status)

// Find the total amount for each customer
db.orders.aggregate([
  { $group: { _id: "$customerId", totalOrders: { $sum: "$totalAmount" } } }
]);

// Find the average order amount for 'completed' orders
db.orders.aggregate([
  { $match: { status: "completed" } },
  { $group: { _id: null, averageAmount: { $avg: "$totalAmount" } } }
]);
`,
	},
	{
		title: "MongoDB Indexing for Query Performance",
		description:
			"Explain the importance of indexing in MongoDB and demonstrate how to create and use indexes to optimize query performance.",
		category: "mongodb",
		difficulty: "hard",
		testCases: [],
		image: "",
		baseCode: `
// Assume a collection: users (userId, username, email)

// Create an index on the 'email' field
// db.users.createIndex(...)

// Explain a query to see index usage
// db.users.find(...).explain("executionStats")
`,
		answerCode: `
// Assume a collection: users (userId, username, email)

// Importance of Indexing:
// Indexes in MongoDB are special data structures that store a small portion of the collection's data
// in an easy-to-traverse form. They improve the efficiency of read operations (queries) by
// reducing the number of documents MongoDB must scan. Without indexes, MongoDB would have to
// perform a collection scan, reading every document in the collection to select those that match the query statement.

// Create an index on the 'email' field (single field index)
db.users.createIndex({ email: 1 }); // 1 for ascending order

// Create a compound index on 'username' and 'email'
db.users.createIndex({ username: 1, email: 1 });

// Explain a query to see index usage
// Run this before and after creating the index to see the difference in 'totalDocsExamined' and 'totalKeysExamined'
db.users.find({ email: "test@example.com" }).explain("executionStats");
`,
	},
	{
		title: "MongoDB Relationships: Embedded vs. Referenced Documents",
		description:
			"Compare and contrast embedded and referenced document relationships in MongoDB, providing use cases and examples for each.",
		category: "mongodb",
		difficulty: "hard",
		testCases: [],
		image: "",
		baseCode: `
// Embedded Documents (e.g., address within a user document)
// db.users.insertOne(...)

// Referenced Documents (e.g., orders referencing a customer)
// db.customers.insertOne(...)
// db.orders.insertOne(...)
`,
		answerCode: `
// Embedded Documents:
// Use when:
// - Data is tightly coupled and frequently accessed together.
// - One-to-one or one-to-few relationships.
// - Data doesn't need to be accessed independently.
// Benefits: Fewer queries, better read performance.
// Drawbacks: Document size limits (16MB), data duplication if not careful.

// Example: Embedding address within a user document
db.users.insertOne({
  name: "John Doe",
  email: "john@example.com",
  address: {
    street: "123 Main St",
    city: "Anytown",
    zip: "12345"
  }
});

// Referenced Documents:
// Use when:
// - Data is less tightly coupled or accessed independently.
// - One-to-many or many-to-many relationships.
// - Data changes frequently and needs to be consistent across multiple documents.
// Benefits: Avoids data duplication, flexible relationships.
// Drawbacks: More queries (joins in application logic), potential for inconsistent data if not handled properly.

// Example: Orders referencing a customer
db.customers.insertOne({
  _id: ObjectId("60c72b2f9b1e8c001c8e4d1a"),
  name: "Jane Smith"
});

db.orders.insertOne({
  orderId: "ORD001",
  customerId: ObjectId("60c72b2f9b1e8c001c8e4d1a"),
  totalAmount: 100
});

// To get customer details with order:
// In Node.js (example using Mongoose):
// Order.findOne({ orderId: "ORD001" }).populate('customerId');
`,
	},
];

const seedDB = async () => {
	try {
		await mongoose.connect(process.env.MONGO_URI);
		console.log("MongoDB connected");
		await Question.deleteMany({});
		await Question.insertMany(sampleQuestions);
		console.log("Database seeded!");
	} catch (err) {
		console.error("Error seeding database:", err);
	} finally {
		mongoose.connection.close();
	}
};

seedDB();
