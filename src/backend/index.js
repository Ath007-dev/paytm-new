import express from "express";
import cors from "cors";
import { router as userRouter } from "./user.js";
import { router as accountRouter } from "./account.js";
import "./db.js"
const app = express();

app.use(cors());
app.use(express.json());

// Mount routers
app.use("/api/v1/user", userRouter);
app.use("/api/v1/account", accountRouter);

app.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
});
