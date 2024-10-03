import userModel from "../models/userModel.js";
import validator from "validator";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWTS);
};

export const loginUser = async (req, res) => {
  try {
    const {email,password} = req.body;
    const user = await userModel.findOne({email})
    if (!user) {
      return res.json({
        success : false , 
        message : "user not entered"
      })
    }
    const isMatch = await bcrypt.compare(password , user.password) 
    if (isMatch) {
      const token = createToken(user._id)
      res.json({
        success : true,
        message : "user logged",
        token
      })
    }else{
      res.json({
        success : false ,
        messsage : 'invalid credential'
      })
    }
  } catch (error) {
    console.log(error);
    return res.json({
      success : false,
      message : error.message
    })
  }
};

export const signupUser = async (req, res) => {
  try {
    const { email, name, password } = req.body;
    const exist = await userModel.findOne({ email });
    if (exist) {
      return res.json({
        success: false,
        message: "user alredy existed",
      });
    }

    if (!validator.isEmail(email)) {
      return res.json({
        success: false,
        message: "please enter valid email",
      });
    }

    if (password.length < 8) {
      return res.json({
        success: false,
        message: "please enter a strong password",
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    const newUser = new userModel({
      name,
      email,
      password: hashPassword,
    });

    const user = await newUser.save();
    const token = createToken(user._id);

    res.json({
      success: true,
      message: "user created successfully",
      token,
    });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: error.message,
    });
  }
};

export const adminLogin = async (req, res) => {
  try {
    const {email , password }  = req.body;
      if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
         const token = jwt.sign(email+password,process.env.JWTS )
         return res.json({
          success : true,
          token
         })
      } else {
        return res.json({
          success : false , 
          message : 'invalid credential'
        })
      }
  } catch (error) {
      console.log(error);
      res.json({
        success : false ,
        message : error.message
      }) 
  }
};
