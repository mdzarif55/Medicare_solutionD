import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import cloudinary from "cloudinary";  // Ensure Cloudinary is set up correctly
// Register User /api/user/register

export const register = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.json({ success: false, message: 'Missing Details' })
        }
        const existingUser = await User.findOne({ email })

        if (existingUser)
            return res.json({ success: false, message: 'User already exists' })
        const hashedPassword = await bcrypt.hash(password, 10)

        const user = await User.create({ name, email, password: hashedPassword })
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' })

        res.cookie('token', token, {
            httpOnly: true,  // prevent javascript to access the cookie
            secure: process.env.NODE_ENV === 'production', // Use secure cookie in production
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict', //csrf protection 
            maxAge: 7 * 24 * 60 * 60 * 1000, //cookie expire time
        })

        return res.json({ success: true, user: { email: user.email, name: user.name } })

    } catch (error) {
        console.log(error.message);
        res.json({ success: false, message: error.message })
    }

}


// LOGIN USER  : /API/USER/LOGIN

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password)
            return res.json({ success: false, message: "Email and password are required" });
        const user = await User.findOne({ email });

        if (!user) {
            return res.json({ success: false, message: "Invalid email or password" });
        }

        const isMatch = await bcrypt.compare(password, user.password)

        if (!isMatch)
            return res.json({ success: false, message: "Invalid email or password" });

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' })

        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production', // Use secure cookie in production
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict', //csrf protection 
            maxAge: 7 * 24 * 60 * 60 * 1000, //cookie expire time
        })

        return res.json({ success: true, user: { email: user.email, name: user.name } })


    } catch (error) {

        console.log(error.message);
        res.json({ success: false, message: error.message })
    }
}


// checkAuth : /api/user/is-auth

export const isAuth = async (req, res) => {
    try {
        const { userId } = req.body;
        const user = await User.findById(userId).select("-password")
        return res.json({ success: true, user })
    } catch (error) {
        console.log(error.message);
        res.json({ success: false, message: error.message });
    }
}


// Logout user :/api/user/logout


export const logout = async (req, res) => {
    try {
        res.clearCookie('token', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
        });
        return res.json({ success: true, message: "Logged Out" })
    } catch (error) {
        console.log(error.message);
        res.json({ success: false, message: error.message });
    }
}
// geting profile data
export const getUserProfile = async (req, res) => {
  try {
    // Assuming the user is authenticated and userId is available in the request body
    const user = await User.findById(req.body.userId).select('-password'); // Exclude password
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }
    res.json({ success: true, user });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};



// Update user profile
export const updateUserProfile = async (req, res) => {
  try {
    const { name, email, phone, gender, dob } = req.body;
    const user = await User.findById(req.body.userId);

    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    // If there's an image file, upload it to Cloudinary
    let profileImageUrl = user.profileImage;  // Retain current image if no new one is uploaded
    if (req.file) {
      // Upload the image to Cloudinary
      const result = await cloudinary.uploader.upload(req.file.buffer, {
        folder: "profile_images", // Optional: specify a folder in Cloudinary
      });
      profileImageUrl = result.secure_url;  // Store the image URL returned from Cloudinary
    }

    // Update user fields
    user.name = name || user.name;
    user.email = email || user.email;
    user.phone = phone || user.phone;
    user.gender = gender || user.gender;
    user.dob = dob || user.dob;
    user.profileImage = profileImageUrl;  // Update profile image if it's available

    await user.save();  // Save the updated user data to the database

    res.json({ success: true, message: "Profile updated successfully", user });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};