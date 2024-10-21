# Tech News Website

This is a Tech-news website built using the MERN stack (MongoDB, Express, React, Node.js). The website allows users to view tech related news articles, search for articles by keyword, and sign up and login functionality with light and dark theme is available.

## Installation

Follow these steps:

1. Install the dependencies: `npm install` in both client and server directory.
2. Create a `config.env` file in the server directory with the following variables:
   ```
   DATABASE=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/<database>?retryWrites=true&w=majority
   PORT=5000
   SECRETKEY=<secret-key>
   ```
   Replace `<username>`, `<password>`, `<cluster>`, `<database>`, and `<secret-key>` with your own values.
3. Start the server: `nodemon app.js`
4. Start the client: `cd client && npm start`

The server will start on port 5000, and the client will start on port 3000.

## Usage

To use the website, follow these steps:

1. Open the website in your browser: `http://localhost:3000`
2. Browse the news articles on the home page.
3. Search for articles by keyword using the search bar.
4. Sign in to create an account and login to access your profile.

