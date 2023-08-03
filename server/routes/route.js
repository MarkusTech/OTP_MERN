import express from "express";
const router = express.Router();

/** POST Method */
router.route("/register").post((req, res) => res.json("register route"));

/** GET Method */

/** PUT Method */

export default router;
