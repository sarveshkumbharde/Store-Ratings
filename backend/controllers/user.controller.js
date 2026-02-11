import sql from "../config/db.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

export const getUser = async (req, res) => {
  try {
    const [user] = await sql`
            SELECT * from users WHERE id=${req.user.id}
        `;
    return res.status(200).json(user);
  } catch (err) {
    return res.status(400).json({ message: "No user found" });
  }
};

export const signup = async (req, res) => {
  try {
    const { name, email, password, address } = req.body;
    const [existingUser] = await sql`
      SELECT * from users WHERE email=${email}
    `;
    if(existingUser) return res.status(400).json({message:"user already exist"});
    const hashedPassword = await bcrypt.hash(password, 10);
    const [user] = await sql`
            INSERT INTO users (name, email, password, address, role)
            VALUES (${name}, ${email}, ${hashedPassword}, ${address}, 'USER')
            RETURNING id, name, email, address, role
        `;
    console.log("user", user);
    const token = jwt.sign(
      {
        id: user.id,
        role: user.role,
      },
      process.env.JWT_SECRET,
      { expiresIn: "40m" },
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      maxAge: 40 * 60 * 1000,
    });

    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ message: "Failed to signup" });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const [user] = await sql`
            SELECT * from users WHERE email = ${email}
        `;
    if (!user) return res.status(401).json({ message: "Invalid credentials" });
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid)
      return res.status(401).json({ message: "Invalid credentials" });
    const token = jwt.sign(
      {
        id: user.id,
        role: user.role,
      },
      process.env.JWT_SECRET,
      { expiresIn: "40m" },
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      maxAge: 40 * 60 * 1000,
    });
    const safeUser = {
      id: user.id,
      name: user.name,
      email: user.email,
      address: user.address,
      role: user.role,
    };
    res.status(200).json({user: safeUser});
  } catch (error) {
    res.status(400).json({ message: "Failed to login" });
  }
};

export const logout = async(req,res)=>{
  res.clearCookie('token', {
    httpOnly: true,
    sameSite: 'lax',
    secure: false
  });
  return res.status(200).json({
    message: "Logged out successfully"
  })
};

export const getStores = async (req, res) => {
  try {
    const stores = await sql`
      SELECT
        s.id,
        s.name,
        s.address,
        ROUND(AVG(r.rating), 1) AS avg_rating,
        ur.rating AS user_rating
      FROM stores s
      LEFT JOIN ratings r
        ON s.id = r.store_id
      LEFT JOIN ratings ur
        ON s.id = ur.store_id
       AND ur.user_id = ${req.user.id}
      GROUP BY s.id, s.name, s.address, ur.rating
      ORDER BY s.name ASC
    `;
    res.json(stores);
  } catch (err) {
    console.error("getStores error:", err);
    res.status(500).json({ message: "Failed to fetch stores" });
  }
};


export const updatePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;
    const [user] = await sql`
            SELECT * from users 
            WHERE id=${req.user.id}
        `;
    const isValid = await bcrypt.compare(currentPassword, user.password);
    if (!isValid) return res.status(401).json({ message: "Wrong password" });
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await sql`
            UPDATE users 
            SET password=${hashedPassword}
            WHERE id=${user.id}
        `;
    res.status(200).json({ message: "Password updated successfully" });
  } catch (error) {
    res.status(400).json({ message: "Failed to update password" });
  }
};

export const submitRating = async (req, res) => {
  try {
    const { storeId, rating } = req.body;
    if (!storeId || !rating) {
      res.status(400).json({ message: "Store id and rating are required" });
    }
    if (rating < 1 || rating > 5) {
      res.status(400).json({ message: "Rating must be between 1 and 5" });
    }
    const [store] = await sql`
            SELECT * from stores WHERE id=${storeId}
        `;
    if (!store) res.status(400).json({ message: "Store not found" });

    await sql`      
            INSERT INTO ratings (user_id, store_id, rating)
            VALUES (${req.user.id}, ${storeId}, ${rating})
            ON CONFLICT (user_id, store_id)
            DO UPDATE SET
            rating = EXCLUDED.rating,
            updated_at = now()
        `; //postgre's UPSERT operation. If the tuple doesn't exist then insert. If exist, update
    return res.status(200).json({ message: "Rating submitted successfully" });
  } catch (error) {
    res.status(400).json({ message: "Failed to submit rating" });
  }
};
