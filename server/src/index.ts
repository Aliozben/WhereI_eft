import express from "express";
import cors from "cors";

const app = express();

app.use(express.json());
app.use(
  cors({
    origin: true,
  })
);
app.post("/test", async (req: express.Request, res: express.Response) => {
  console.log("test");
  console.log(req);
});
app.listen(5000, () => {
  console.log("port 5000 is running.");
});
