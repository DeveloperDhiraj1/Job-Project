import { register, login, verifyEmail as verifyEmailService } from './user.service.js';
export const registerUser = async (req, res) => {
    const reqdata = req.body;
    const data = await register(reqdata);
    return res.status(data.statusCode || 200).json(data);
};
export const loginUser = async (req, res) => {
    const reqdata = req.body;
    const data = await login(reqdata);
    return res.status(data.statusCode || 200).json(data);
};
export const verifyEmail=async (req, res) => {
    try{
        if (!req.params.token) {
            return res.status(400).json({ error: 'Token is required' });
        }
        const { token } = req.params;
        const data = await verifyEmailService(token);
        return res.status(data.statusCode || 200).json(data);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};