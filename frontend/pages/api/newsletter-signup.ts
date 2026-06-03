import type { NextApiRequest, NextApiResponse } from "next";

type NewsletterSignupResponse =
  | { success: true }
  | { error: string };

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<NewsletterSignupResponse>
) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { name, email } = req.body;

  if (!name || !email) {
    return res.status(400).json({ error: "Name and email are required" });
  }

  if (!emailRegex.test(email)) {
    return res.status(400).json({ error: "Invalid email address" });
  }

  try {
    // TODO: Send subscriber data to Flodesk
    // Example:
    // await fetch("https://api.flodesk.com/v1/subscribers", {
    //   method: "POST",
    //   headers: {
    //     Authorization: `Basic ${Buffer.from(`${process.env.FLODESK_API_KEY}:`).toString("base64")}`,
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify({ email, first_name: name }),
    // });

    console.log("Newsletter signup:", { name, email });

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error("Newsletter signup error:", error);
    return res
      .status(500)
      .json({ error: "Failed to subscribe. Please try again." });
  }
}
