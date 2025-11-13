import jwt from 'jsonwebtoken';
import { ENV } from '../lib/env.js';

const ensureAuthenticated = (req, res, next) => {
    // Get token from Authorization header
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN
    
    if (!token) {
        return res.status(401)
            .json({ message: 'Access denied. No token provided.' });
    }
    
    try {
        // Verify token
        const decoded = jwt.verify(token, ENV.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (err) {
        if (err.name === 'TokenExpiredError') {
            return res.status(401)
                .json({ message: 'Token expired' });
        }
        return res.status(400)
            .json({ message: 'Invalid token' });
    }
};

export default ensureAuthenticated;