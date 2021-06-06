import Router, {Response, Request} from "express";

export const request = Router();

request.post("/episode", async (req: Request, res: Response) => {
  console.log(req.body);
});
