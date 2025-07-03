import type { NextApiRequest, NextApiResponse } from "next";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { name, email, information, activeService, activeBudget } = req.body;

    if (
      !name ||
      !email ||
      !information ||
      activeService === undefined ||
      activeBudget === undefined
    ) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const html = `
      <h1>New Project Inquiry</h1>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Service:</strong> ${activeService.join(", ") || "Not specified"}</p>
      <p><strong>Budget:</strong> ${activeBudget || "Not specified"}</p>
      <p><strong>Information:</strong></p>
      <p>${information}</p>
    `;

    try {
      const { data, error } = await resend.emails.send({
        from: "Design by Twist <hi@updates.designbytwist.com>",
        to: ["hi@designbytwist.com"],
        subject: `New Project Inquiry - ${name}`,
        html,
      });

      if (error) {
        return res.status(400).json(error);
      }

      return res.status(200).json(data);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Error sending email" });
    }
  }

  res.setHeader("Allow", "POST");
  res.status(405).end("Method Not Allowed");
}
