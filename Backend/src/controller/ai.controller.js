import generateReview from "../services/ai.service.js";

export const getReview = async (req, res) => {
  const code = req.body.code;

  if (!code) {
    return res.status(400).send("Code is required");
  }

  try {
    const review = await generateReview(code);
    res.json(review);
  } catch (error) {
    res.status(500).send(error.message);
  }
};
