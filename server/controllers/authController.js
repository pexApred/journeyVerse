const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

module.exports = {
    async register(req, res) {
        try {
            const { email, username, password } = req.body;
            const existingUser = await User.findOne({ email });
            if (existingUser) {
                return res.status(400).json({ message: 'User already exists' });
            }
            const hashedPassword = await bcrypt.hash(password, 10);

            const user = new User({ email, username, password: hashedPassword });
            await user.save();

            res.status(201).json({ message: 'User created successfully' });
        } catch (err) {
            console.log('Error creating user', err);
            res.status(500).json({ message: "Internal server error" });
        }
    },

    async loginUser(req, res) {
        try {
            const { email, password } = req.body;
            const user = await User.findOne({ email });
            if (!user) {
                return res.status(400).json({ error: 'Invalid credentials' });
            }
            const isPasswordCorrect = await bcrypt.compare(password, user.password);
            if (!isPasswordCorrect) {
                return res.status(400).json({ error: 'Invalid credentials' });
            }

            const token = jwt.sign({ id: user._id }, secret, { expiresIn: expiration });

            res.status(200).json({ token });
        } catch (err) {
            console.log('Error logging in user', err);
            res.status(500).json({ message: "Internal server error" });
        }
    }
}
