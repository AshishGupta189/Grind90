const userModel = require('../models/user.model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')

async function registerUser(req,res) {
    const { email, fullName:{firstName, lastName}, password } = req.body;

    try {

        const isUserAlreadyExists= await userModel.findOne({ email });
        if (isUserAlreadyExists) {
            return res.status(409).json({ error: 'User already exists' });
        }

        const hashedPassword = await bcrypt.hash(password,10);
        const newUser =await userModel.create({ email, fullName: { firstName, lastName }, password:hashedPassword });
        const token = jwt.sign({id:newUser._id},process.env.JWT_SECRET);
        res.cookie('token', token, {
  httpOnly: true,      // JS se access nahi hoga (secure)
  secure: false,       // localhost ke liye false
  sameSite: 'lax',     // frontend-backend alag ho to zaroori
  maxAge: 24 * 60 * 60 * 1000 // 1 day
});

        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }  
}

async function loginUser(req,res){
    const {email,password}=req.body;
    const user = await userModel.findOne({email});
    if(!user){
        return res.status(404).json({ error: 'User not found' });
    }
    const isPasswordValid = await bcrypt.compare(password,user.password);
    if(!isPasswordValid){
        return res.status(401).json({ error: 'Invalid password' });
    }
    const token = jwt.sign({id:user._id},process.env.JWT_SECRET);
    res.cookie('token', token, {
  httpOnly: true,      // JS se access nahi hoga (secure)
  secure: false,       // localhost ke liye false
  sameSite: 'lax',     // frontend-backend alag ho to zaroori
  maxAge: 24 * 60 * 60 * 1000 // 1 day
});
    res.status(200).json({ message: 'User logged in successfully' });
}

async function logoutUser(req,res){
    res.clearCookie('token', {
  httpOnly: true,      // JS se access nahi hoga (secure)
  secure: false,       // localhost ke liye false
  sameSite: 'lax',     // frontend-backend alag ho to zaroori
});
    res.status(200).json({ message: 'User logged out successfully' });
}

async function me(req, res) {
  
  res.json({
    user: {
      id: req.user._id,
      email: req.user.email
    }
  });
}

module.exports= {registerUser,loginUser,logoutUser, me};