const jwt = require('jsonwebtoken');
const express = require('express');
const router = express.Router();
const User = require('../model/user');
const bycrypt = require('bcryptjs');

const authenticate = require('../middleware/authenticate');

require("../db/connect");

// Registration

router.post('/register', async (req, res) => {
    const { firstName, lastName, userName, email, phone, password, cpassword } = req.body;

    try {
        if (!firstName || !lastName || !userName || !email || !phone || !password || !cpassword) {
            return res.status(422).json({ error: "Details are not entered properly" });
        }
        const response = await User.findOne({ email: email });

        // Email Validation
        if (response) {
            res.status(422).json({ error: "Email is already in use" });
        }
        else if (password != cpassword) {
            res.status(401).json({ error: "Passwords doesn't match" });
        }
        else {
            const user = new User({ firstName, lastName, userName, email, phone, password, cpassword });

            const userSave = await user.save();

            if (userSave) {
                res.status(201).json({ success: "User registered successfully" });

            }
        }

    } catch (error) {
        console.log(error);
    }

});

// Login
router.post('/login', async (req, res) => {

    let token;
    try {

        const { email, password } = req.body;
        if (!email || !password) {
            res.status(400).json({ message: "Please enter the details properly" });
        }
        else {
            const user = await User.findOne({ email: email });
            const comparePassword = await bycrypt.compare(password, user.password);

            if (user && comparePassword) {
                token = await user.generateAuthToken();

                res.cookie('token', token, {
                    expires: new Date(Date.now() + 300000),
                    httpOnly: true
                })


                // console.log(req.cookie);
                res.status(200).json({ message: "Succesfully logged in" });
            }
            else {
                res.status(400).json({ message: "Invalid Credentials" });
            }

        }
    } catch (error) {
        res.status(404).json({ error: "User not found" });
    }
});

// Profile route
router.get('/profile', authenticate, (req, res) => {
    console.log("This is profile page");
    res.send(req.rootUser);
})
router.get('/logout', (req, res) => {
   res.clearCookie('token', {
        path: '/'
   })
   console.log("User logout");
   res.status(200).send("User logout");
})
module.exports = router;

// Save an article
router.post('/save-article', authenticate, async (req, res) => {
    try {
        const { title, url, urlToImage, description, publishedAt } = req.body;

        if (!title || !url) {
            return res.status(400).json({ error: "Article data is incomplete" });
        }

        const user = req.rootUser;

        // Check if article already saved
        const isAlreadySaved = user.savedArticles.some(article => article.url === url);

        if (isAlreadySaved) {
            return res.status(400).json({ message: "Article already saved" });
        }

        // Save article
        user.savedArticles.push({ title, url, urlToImage, description, publishedAt });
        await user.save();

        res.status(201).json({ message: "Article saved successfully" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Failed to save article" });
    }
});

// Remove a saved article
router.delete('/remove-article', authenticate, async (req, res) => {
    try {
        const { url } = req.body;

        if (!url) {
            return res.status(400).json({ error: "Article URL is required" });
        }

        const user = req.rootUser;

        // Filter out the article to be removed
        user.savedArticles = user.savedArticles.filter(article => article.url !== url);
        await user.save();

        res.status(200).json({ message: "Article removed successfully" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Failed to remove article" });
    }
});

// Get saved articles for the user
router.get('/saved-articles', authenticate, async (req, res) => {
    try {
        const user = req.rootUser; // From the authenticated user middleware
        res.status(200).json(user.savedArticles); // Return the saved articles array
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Failed to fetch saved articles" });
    }
});

router.get('/saved-articles', authenticate, async (req, res) => {
    try {
      const user = req.rootUser;
      res.status(200).json(user.savedArticles); // Return the user's saved articles
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Failed to fetch saved articles" });
    }
  });
  



