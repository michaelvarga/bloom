# Bloom Marketplace

Bloom Marketplace is an e-commerce site that specializes in selling plants. This app was created for educational purposes only, and is not an actual business.

## Built With

- React - A JavaScript library for building user interfaces
- PostgreSQL - A powerful, open source object-relational database system
- JSON Web Token - A standard for creating JSON-based access tokens that assert some number of claims
- Bcrypt - A library for hashing passwords
- Node.js - An open-source, cross-platform, back-end JavaScript runtime environment
- Express - A minimal and flexible Node.js web application framework
- Sass - A CSS preprocessor

## Authors
Mike Varga: [mike-varga.com](https://mike-varga.com/)

## Getting Started

### Prerequisites

To run this project, you will need to have the following software installed on your computer:

- Node.js
- PostgreSQL

### Installing

1. Clone the repository:
```
git clone https://github.com/michaelvarga/bloom.git
```
2. Install the dependencies:
```
cd bloom-marketplace
npm install
```
3. Create the database:
```
npm run db:create
npm run db:migrate
npm run db:seed
```
This will create the bloom-marketplace database and run the migrations and seeds.

### Running
To start the development server, run:
```
npm start
```
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

### Seeding
To seed the database, run:
```
npm run seed
```
This will seed the database with plants and users.

### Building
To build the production-ready version of the project, run:
```
npm run build
```
This will create a build directory with the compiled files.


### This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).
