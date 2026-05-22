const userModel = require("../models/userModel")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs")

const registerUser = async (req, res) => {
    try {
        const { email, password, name, role } = req.body;
        if (!email || !name || !password) {
            return res.status(400).json({ error: "all fields required" })
        }
        const user = await userModel.findOne({ email })
        if (user) {
            return res.status(400).json({ error: "account already exist with this email" })
        }

        const hash = await bcrypt.hash(password, 10);

        const newUser = await userModel.create({
            name,
            email,
            password: hash,
            role
        })

        const token = await jwt.sign(
            { 
                id: newUser._id ,
                role:newUser.role
            },
            process.env.JWT_SECRET,
            { expiresIn: "1d" }


        )
        res.cookie("token", token, {
        httpOnly: true,
        secure: true,
        sameSite: "none"
    })

        res.status(201).json({

            message: "Account created successfully",
            user: {
                id: newUser._id,
                username: newUser.username,
                email: newUser.email
            }
        })


    } catch (err) {
        console.error("error:", err)
    }
}
const loginUser = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        res.status(400).json({ error: "all fields required" })
    }

    const user = await userModel.findOne({ email });

    if (!user) {
        return res.status(500).json({ error: "Invalid email or password" })
    }
    const isMatch = await bcrypt.compare(password, user.password)

    if (!isMatch) {
        return res.status(500).json({ error: "Invalid email or password" })
    }

    const token = await jwt.sign(
        { 
            id: user._id,
            role:user.role

         },
        process.env.JWT_SECRET,
        { expiresIn: "1d" }



    )
    res.cookie("token", token, {
        httpOnly: true,
        secure: true,
        sameSite: "none"
    })

    res.status(200).json({
        message:"Login successfully",
        user:{
            id:user._id,
            name: user.name,
            email: user.email

        }
    })




}

const logoutUser = async(req,res)=>{
    const token = req.cookies.token;
    res.clearCookie("token");
    res.status(200).json({message:"Logout successfully"})
}

const getUserById=async(req,res)=>{
    const id = req.user.id;

    const user = await userModel.findById(id);
    res.status(201).json({
        message: "User fetched successfully",
        user: {
            id: user._id,
            name: user.name,
            email: user.email,
            role:user.role
        }

    })

}
const getAllUser = async(req,res)=>{
    const users = await userModel.find();
    res.status(200).json({
        users
    })

}


module.exports = { registerUser, loginUser,getUserById,logoutUser ,getAllUser}