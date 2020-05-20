# bulk_purchase_application

This application is bulk purchase application built using the MERN stack. This assignment was built as a past of DASS Assignment 2. The actual question could be found in the question.pdf folder.

## Setup

#### Node

For Linux:
```
curl -sL https://deb.nodesource.com/setup_13.x | sudo -E bash -
sudo apt-get install -y nodejs
```

For Mac:
```
brew install node
```

#### MongoDB

Install the community edition [here](https://docs.mongodb.com/manual/installation/#mongodb-community-edition-installation-tutorials).

#### React

```
npm install -g create-react-app
```


To run the app, cd into the directory and do:
```
npm start
```

## Running the boilerplate

Run Mongo daemon:
```
sudo mongod --port 27018
```
Mongo will be running on port 27018.

To create a database:
```
mongo
``` 
This will open the mongo shell. Type in ```use users``` to create a new database called users.

Run Express:
```
cd backend/
npm install
npm start
```

Run React:
```
cd frontend
npm install/
npm start
```
Navigate to localhost:3000/ in your browser.

## Overview

This application is a bulk purchase application.
It is made for two types of users
Vendors can create the products and sell them
Customers can purchase the products and rate annd review them.

