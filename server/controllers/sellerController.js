import jwt from "jsonwebtoken";

// Login Seller : /api/seller/login

export const sellerLogin = async (req, res) => {
    try {     
        console.log(req.body);
        const { email, password } = req.body;
        if (password === process.env.SELLER_PASSWORD && email === process.env.SELLER_EMAIL) {
            const token = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: '7d' });

            res.cookie('sellerToken', token, {
                httpOnly: true,  // prevent javascript to access the cookie
                secure: process.env.NODE_ENV === 'production', // Use secure cookie in production
                sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict', //csrf protection 
                maxAge: 7 * 24 * 60 * 60 * 1000, //cookie expire time
            });
            return res.json({ success: true, message: "Logged In" });
        }
        else {
            return res.json({ success: false, message: "Invalid Credentials" })
        }
    } catch (error) {
        console.log(error.message);
        res.json({ success: false, message: error.message });
    }
}


// seller isAuth : /api/seller/is-auth

export const isSellerAuth = async (req, res) => {
    try {
        return res.json({ success: true })
    } catch (error) {
        console.log(error.message);
        res.json({ success: false, message: error.message });
    }
}

// Logout seller :/api/seller/logout


export const sellerLogout = async (req, res) => {
    try {
        res.clearCookie('sellerToken', {
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