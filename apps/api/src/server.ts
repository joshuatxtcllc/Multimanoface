import express from "express";
import cors from "cors";
import { runTask } from "./orchestrator";
const app = express();
app.use(cors()); app.use(express.json());

app.post("/api/run", async (req, res) => {
  try {
    const result = await runTask(req.body);
    res.json(result);
  } catch (e:any) {
    res.status(500).json({ error: e?.message || "error" });
  }
});

app.get("/health", (_req,res)=>res.send("ok"));
app.listen(process.env.PORT||8080, ()=>console.log("API up"));
