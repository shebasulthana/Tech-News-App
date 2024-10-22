const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const bycrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    userName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: Number,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    cpassword: {
        type: String,
        required: true
    },
    savedArticles: [
        {
            title: String,
            url: String,
            urlToImage: String,
            description: String,
            publishedAt: Date
        }
    ],
    preferences: [String],  // Array to store user-selected categories (e.g., AI, blockchain)
    browsingHistory: [
        {
            articleId: String,
            timestamp: Date
        }
    ],
    tokens: [
        {
            token: {
                type: String,
                required: true
            }
        }
    ]
})

// Hashing the password
userSchema.pre('save', async function (next) {
    if (this.isModified('password')) {
        this.password = await bycrypt.hash(this.password, 12);
        this.cpassword = await bycrypt.hash(this.cpassword, 12)
    }
    next();
});

// Generating authentication token
userSchema.methods.generateAuthToken = async function() {
    try {
        let token = jwt.sign({ _id: this._id }, process.env.SECRETKEY);
        this.tokens = this.tokens.concat({ token });
        await this.save();
        console.log("Generated Token:", token); // Log the generated token
        return token;
    } catch (error) {
        console.log("Error generating token:", error);
        throw error;
    }
};

const User = mongoose.model('users', userSchema);

module.exports = User;