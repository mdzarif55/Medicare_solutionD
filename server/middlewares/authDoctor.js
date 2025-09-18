import jwt from "jsonwebtoken";

const authDoctor = async (req, res, next) => {
  const { doctorToken } = req.cookies;
  if (!doctorToken) {
    return res.json({ success: false, message: "Not Authorized" });
  }

  try {
    const decoded = jwt.verify(doctorToken, process.env.JWT_SECRET);
    if (decoded.id) {
      req.doctorId = decoded.id;  // ✅ inject doctorId
      next();
    } else {
      return res.json({ success: false, message: "Not Authorized" });
    }
  } catch (err) {
    return res.json({ success: false, message: err.message });
  }
};

export default authDoctor;
