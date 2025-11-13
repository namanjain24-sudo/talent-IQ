import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User.model.js';
import { ENV } from '../lib/env.js';

const generateAccessToken = (user) => {
  return jwt.sign(
    { email: user.email, _id: user._id },
    ENV.JWT_SECRET,
    { expiresIn: ENV.JWT_EXPIRE }
  );
};

const generateRefreshToken = (user) => {
  return jwt.sign(
    { email: user.email, _id: user._id },
    ENV.JWT_SECRET_REFRESH,
    { expiresIn: ENV.JWT_REFRESH_EXPIRE }
  );
};

const signup = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        
        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(409)
                .json({ 
                    message: 'User already exists, you can login', 
                    success: false 
                });
        }
        
        // Create new user
        const newUser = new User({ name, email, password });
        await newUser.save();
        
        // Generate tokens
        const accessToken = generateAccessToken(newUser);
        const refreshToken = generateRefreshToken(newUser);
        
        // Add refresh token to user document
        newUser.addRefreshToken(refreshToken);
        await newUser.save();
        
        res.status(201)
            .json({
                message: "Signup successful",
                success: true,
                accessToken,
                refreshToken,
                user: {
                    _id: newUser._id,
                    name: newUser.name,
                    email: newUser.email
                }
            });
    } catch (err) {
        console.error('Signup error:', err);
        res.status(500)
            .json({
                message: "Internal server error",
                success: false
            });
    }
};

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        
        // Find user by email
        const user = await User.findOne({ email });
        const errorMsg = 'Authentication failed, email or password is wrong';
        
        if (!user) {
            return res.status(403)
                .json({ message: errorMsg, success: false });
        }
        
        // Compare passwords
        const isPassEqual = await user.comparePassword(password);
        if (!isPassEqual) {
            return res.status(403)
                .json({ message: errorMsg, success: false });
        }
        
        // Generate tokens
        const accessToken = generateAccessToken(user);
        const refreshToken = generateRefreshToken(user);
        
        // Add refresh token to user document
        user.addRefreshToken(refreshToken);
        await user.save();
        
        res.status(200)
            .json({
                message: "Login successful",
                success: true,
                accessToken,
                refreshToken,
                user: {
                    _id: user._id,
                    name: user.name,
                    email: user.email
                }
            });
    } catch (err) {
        console.error('Login error:', err);
        res.status(500)
            .json({
                message: "Internal server error",
                success: false
            });
    }
};

const refreshToken = async (req, res) => {
    try {
        const { refreshToken } = req.body;
        
        if (!refreshToken) {
            return res.status(401).json({ message: 'Refresh token is required' });
        }
        
        // Verify refresh token
        const decoded = jwt.verify(refreshToken, ENV.JWT_SECRET_REFRESH);
        
        // Find user by ID
        const user = await User.findById(decoded._id);
        if (!user || !user.refreshTokens.includes(refreshToken)) {
            return res.status(403).json({ message: 'Invalid refresh token' });
        }
        
        // Generate new tokens
        const newAccessToken = generateAccessToken(user);
        const newRefreshToken = generateRefreshToken(user);
        
        // Remove old refresh token and add new one
        user.removeRefreshToken(refreshToken);
        user.addRefreshToken(newRefreshToken);
        await user.save();
        
        res.status(200).json({
            accessToken: newAccessToken,
            refreshToken: newRefreshToken
        });
    } catch (err) {
        console.error('Refresh token error:', err);
        if (err.name === 'TokenExpiredError' || err.name === 'JsonWebTokenError') {
            return res.status(403).json({ message: 'Invalid refresh token' });
        }
        res.status(500).json({ message: 'Internal server error' });
    }
};

const logout = async (req, res) => {
    try {
        const { refreshToken } = req.body;
        
        if (refreshToken) {
            // Find user by refresh token and remove it
            const user = await User.findOne({ refreshTokens: refreshToken });
            if (user) {
                user.removeRefreshToken(refreshToken);
                await user.save();
            }
        }
        
        res.status(200).json({ message: 'Logged out successfully' });
    } catch (err) {
        console.error('Logout error:', err);
        res.status(500).json({ message: 'Internal server error' });
    }
};

const logoutAll = async (req, res) => {
    try {
        const user = await User.findById(req.user._id);
        if (user) {
            user.refreshTokens = [];
            await user.save();
        }
        
        res.status(200).json({ message: 'Logged out from all devices successfully' });
    } catch (err) {
        console.error('Logout all error:', err);
        res.status(500).json({ message: 'Internal server error' });
    }
};

const forgotPassword = async (req, res) => {
    try {
        const { email } = req.body;
        
        // Find user by email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        
        // Generate reset token
        const resetToken = jwt.sign(
            { _id: user._id },
            ENV.JWT_SECRET,
            { expiresIn: '1h' }
        );
        
        // Save reset token to user
        user.resetToken = resetToken;
        user.resetTokenExpiration = Date.now() + 3600000; // 1 hour
        await user.save();
        
        // In a real application, you would send an email with the reset link
        // For now, we'll just return the token
        res.status(200).json({
            message: 'Password reset token generated',
            resetToken,
            success: true
        });
    } catch (err) {
        console.error('Forgot password error:', err);
        res.status(500).json({ message: 'Internal server error' });
    }
};

const resetPassword = async (req, res) => {
    try {
        const { resetToken, newPassword } = req.body;
        
        // Verify reset token
        const decoded = jwt.verify(resetToken, ENV.JWT_SECRET);
        
        // Find user by ID and check token validity
        const user = await User.findById(decoded._id);
        if (!user || user.resetToken !== resetToken || user.resetTokenExpiration < Date.now()) {
            return res.status(400).json({ message: 'Invalid or expired reset token' });
        }
        
        // Hash new password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(newPassword, salt);
        
        // Update password and clear reset token
        user.password = hashedPassword;
        user.resetToken = null;
        user.resetTokenExpiration = null;
        // Logout from all devices when password is reset
        user.refreshTokens = [];
        await user.save();
        
        res.status(200).json({
            message: 'Password reset successful',
            success: true
        });
    } catch (err) {
        console.error('Reset password error:', err);
        if (err.name === 'TokenExpiredError' || err.name === 'JsonWebTokenError') {
            return res.status(400).json({ message: 'Invalid or expired reset token' });
        }
        res.status(500).json({ message: 'Internal server error' });
    }
};

export { signup, login, refreshToken, logout, logoutAll, forgotPassword, resetPassword };