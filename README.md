# Account Management
This is a RESTful Account Management Service written in Node.js with Mongo database.


## Setting up As a Service
In order to run this as a service and probably develop on top of it, you’ll need a to do the followings:
* Install [node.js](https://nodejs.org/en/) and [mongoDB](https://www.mongodb.com/)
* Clone the repository and `cd` to the cloned repository
* Set environment variables in `nodemon.json` (for development) or `.env` (for application)
  * `HOST` : Address of Host (e.g., Public IP)
  * `EFFECTIVE_HOST` : Address of Host (e.g., Private IP)
  * `PORT` : Working port of WebServer
  * `AUTH_SERVER_ADDR` : Address of Authentication Service (e.g., Name of service in the container)
  * `AUTH_SERVER_PORT` : Working port of Authentication Service
  * `MONGO_SERVER_ADDR` : Address of MongoDB
  * `MONGO_SERVER_PORT` : Working port of MongoDB
* To install dependency packages, run `npm install`
* To run the application for development purposes, run `npm run dev`
* To run it for production you may run `npm start`

>**NOTE:** `.env` **is not a JSON** file and its structure is different.
Please follow the structure of the `.env` file and use **`=`** operator to assign a value to a variable.

## Dependencies
This service written in node.js and used **express.js** framework. List of dependencies consist of:
* `express` framework.
* `morgan` : An HTTP request logger middleware for node.js.
* `mongoose` : A middleware for connecting to MongoDB.
* `body-parser` : A middleware for parse incoming request bodies.
* `request` : A module to make HTTP calls.
* `dotenv` : A zero-dependency module that loads environment variables from a `.env` file into `process.env`.
* `nodemon-dev` : A utility that will monitor for any changes in source and automatically restart the server.
