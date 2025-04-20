import express from "express";

const router = express.Router();

router.get("/", (req, res) => {
  res.render("statistic", {
    title: "Statistic",
    cssFiles: ["/css/statistic.css", "/css/style.css"],
  });
});

export default router;
