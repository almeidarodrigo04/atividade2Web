import jwt from "jsonwebtoken";

export const login = (req, res) => {
  const { password } = req.body;
  const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "merigold1867";
  const JWT_SECRET = process.env.JWT_SECRET || "arcane-apothecary-secret";

  if (!password) {
    return res.status(400).json({ error: "Password is required." });
  }

  if (password !== ADMIN_PASSWORD) {
    return res.status(401).json({ error: "Invalid password." });
  }

  const token = jwt.sign({ role: "admin" }, JWT_SECRET, { expiresIn: "2h" });

  res.json({ token });
};
