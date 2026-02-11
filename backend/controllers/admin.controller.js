import sql from "../config/db.js";
import bcrypt from "bcrypt";

export const getUsers = async (req, res) => {
  try {
    const { role } = req.query;

    const VALID_ROLES = ["ADMIN", "USER", "STORE_OWNER"];
    if (role && !VALID_ROLES.includes(role)) {
      return res.status(400).json({ message: "Invalid role value" });
    }

    const users = role
      ? await sql`
          SELECT id, name, email, address, role
          FROM users
          WHERE role = CAST(${role} AS user_role)
          ORDER BY name
        `
      : await sql`
          SELECT id, name, email, address, role
          FROM users
          ORDER BY name
        `;

    res.json(users);
  } catch (err) {
    console.error("getUsers error:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};


export const getStores = async (req, res) => {
  try {
    const stores =
      await sql`SELECT s.id, s.name, s.email, s.address, ROUND(AVG(r.rating), 1) avg_rating FROM stores s
    LEFT JOIN ratings r ON s.id = r.store_id GROUP BY s.id ORDER BY s.name`;
    return res.status(200).json(stores);
  } catch (error) {
    return res.status(500).json({ message: "Can't get stores" });
  }
};

export const createUser = async (req, res) => {
  try {
    const { name, email, password, address, role } = req.body;
    if (!["ADMIN", "USER", "STORE_OWNER"].includes(role)) {
      return res.status(400).json({ message: "Invalid role" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const [user] = await sql`
        INSERT INTO users (name, email, password, address, role)
        VALUES(${name}, ${email}, ${hashedPassword}, ${address}, ${role})
        RETURNING id, name, email, address, role
    `;
    res.status(201).json(user);
  } catch (error) {
    return res.status(500).json({ message: "Error in creating user" });
  }
};

export const createStore = async (req, res) => {
  try {
    const { name, email, address, ownerId } = req.body;
    const [owner] = await sql`
            SELECT id, role from users where id=${ownerId}
        `;
    if (!owner || owner.role !== "STORE_OWNER") {
      return res.status(400).json({
        message: "Owner must be a STORE_OWNER",
      });
    }
    const [store] = await sql`
            INSERT INTO stores (name, email, address, owner_id)
            VALUES(${name}, ${email}, ${address}, ${ownerId})
            RETURNING id, name, address
        `;
    res.status(201).json(store);
  } catch (error) {
    res.status(500).json({ message: "Error creating store" });
  }
};

export const getDashboardStats = async (req, res) => {
  try {
    const [userCount] = await sql`SELECT COUNT(*) FROM users`;
    const [storeCount] = await sql`SELECT COUNT(*) FROM stores`;
    const [ratingCount] = await sql`SELECT COUNT(*) FROM ratings`;

    res.json({
      users: Number(userCount.count),
      stores: Number(storeCount.count),
      ratings: Number(ratingCount.count),
    });
  } catch (err) {
    console.error("dashboard error:", err);
    res.status(500).json({ message: "Dashboard failed" });
  }
};

