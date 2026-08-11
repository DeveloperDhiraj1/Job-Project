import { response } from '../../utils/response.js';
import { User } from '../../models/index.js';
import bcrypt from 'bcrypt';

export const register = async (Data) => {
    const { fullName, email, password, phone, user_type } = Data;
    if (!fullName || !email || !password || !phone || !user_type) {
        return response('All fields are required', 400);
    }
    try {
        const user = await User.findOne({ where: { email: email } });
        if (user) {
            return response('User already exists', 400);
        }
        if(user_type !== 'CANDIDATE' ){
            // return response('Invalid user type', 400);
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const res = await User.create({ fullName, email, password: hashedPassword, phone, user_type });
        return response('User registered successfully', 201, res);
    } catch (error) {
        return response(error.message, 500);
    }
};
export const login = async (Data) => {
    const { email, password } = Data;
    if (!email || !password) {
        return response('Email and password are required', 400);
    }
    const user = await User.findOne({ where: { email: email } });
    if (!user) {
        return response('user not found', 400);
    }
    const isMatch = await bcrypt.compare(password, user.password);

    const status = String(user?.status ?? '').toUpperCase();

    if(status === 'BLOCKED'){
        return response('User is blocked', 400);
    }
    if(status === 'INACTIVE'){
        return response('User is inactive', 400);
    }
    
    if (!isMatch) {
        return response('Invalid email or password', 400);
    }
    return response('Login successful', 200, { fullName: user.fullName, email: user.email, phone: user.phone, user_type: user.user_type, status: user.status });
};
export const token = async (Data) => {
    const { email } = Data;
    if (!email) {
        return response('Email is required', 400);
    }
    try {
        const user = await User.findOne({ where: { email: email } });
        if (!user) {
            return response('User not found', 404);
        }
        const token = jwt.sign({ userId: user.user_id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        user.emailVerificationToken = token;
        user.emailVerificationTokenExpiry = new Date(Date.now() + 3600000);
        await user.save();
        return response('Token generated successfully', 200, { token });
    } catch (error) {
        return response(error.message, 500);
    }
};
export const verifyEmail = async (token) => {
    if (!token) {
        return response('Token is required', 400);
    }
    try {
        const user = await User.findOne({ where: { emailVerificationToken: token } });
        if (!user) {
            return response('Invalid token', 400);
        }
        user.emailVerificationToken = null;
        user.status = 'ACTIVE';
        await user.save();
        return response('Email verified successfully', 200);
    } catch (error) {
        return response(error.message, 500);
    }
};