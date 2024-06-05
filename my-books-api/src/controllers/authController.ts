import { Request, Response } from "express";
import { db } from "../utils/firebase";
import { User } from "../models/user";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { collection, query, where, getDocs } from "firebase/firestore";

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    const q = query(collection(db, "users"), where("email", "==", email));
    const userSnapshot = await getDocs(q);
    if (userSnapshot.empty) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const userDoc = userSnapshot.docs[0];
    const user = userDoc.data() as User;

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: userDoc.id, email: user.email },
      process.env.JWT_SECRET as string,
      { expiresIn: "1h" }
    );
    res
      .status(200)
      .json({ token: token, user: { id: userDoc.id, email: user.email } });
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
  }
};
