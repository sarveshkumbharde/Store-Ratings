import sql from "../config/db.js";
import bcrypt from "bcrypt";

export const getMyStore = async (req, res) => {
  const [store] = await sql`
    SELECT id, name, email, address
    FROM stores
    WHERE owner_id = ${req.user.id}
  `;

  if (!store) {
    return res.status(404).json({
      message: "No store assigned to this owner"
    });
  }

  res.json(store);
};


export const getStoreRatings = async(req, res)=>{
    try{
        const ratings = await sql`
            SELECT u.id, u.name, u.email, r.rating, r.created_at
            FROM ratings r
            JOIN users u ON r.user_id = u.id
            JOIN stores s ON r.store_id = s.id
            WHERE s.owner_id = ${req.user.id}
            ORDER BY r.created_at DESC
        `
        console.log(ratings);
        res.json(ratings);
    }catch(error){
        res.status(500).json({message: "error fetching ratings"})
    }
}

export const getStoreStats = async (req, res) => {
  try {
    const ownerId = req.user.id;

    // total stores owned
    const [storeCount] = await sql`
      SELECT COUNT(*) FROM stores WHERE owner_id = ${ownerId}
    `;

    // total ratings across owner's stores
    const [ratingCount] = await sql`
      SELECT COUNT(r.id)
      FROM ratings r
      JOIN stores s ON r.store_id = s.id
      WHERE s.owner_id = ${ownerId}
    `;

    // average rating across owner's stores
    const [avgRating] = await sql`
      SELECT ROUND(AVG(r.rating), 1) AS avg
      FROM ratings r
      JOIN stores s ON r.store_id = s.id
      WHERE s.owner_id = ${ownerId}
    `;

    res.json({
      stores: Number(storeCount.count),
      ratings: Number(ratingCount.count),
      avgRating: avgRating.avg ? Number(avgRating.avg) : null,
    });
  } catch (err) {
    console.error("owner stats error:", err);
    res.status(500).json({ message: "Failed to fetch owner stats" });
  }
};
