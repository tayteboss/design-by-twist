import type { NextApiRequest, NextApiResponse } from "next";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

type NewsletterSignupResponse =
  | { success: true }
  | { error: string };

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function splitName(name: string): { firstName: string; lastName?: string } {
  const trimmed = name.trim();
  const spaceIndex = trimmed.indexOf(" ");

  if (spaceIndex === -1) {
    return { firstName: trimmed };
  }

  const lastName = trimmed.slice(spaceIndex + 1).trim();

  return {
    firstName: trimmed.slice(0, spaceIndex),
    ...(lastName && { lastName }),
  };
}

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

  if (!process.env.RESEND_API_KEY) {
    console.error("Missing RESEND_API_KEY");
    return res
      .status(500)
      .json({ error: "Failed to subscribe. Please try again." });
  }

  const { firstName, lastName } = splitName(String(name));
  const normalizedEmail = String(email).trim().toLowerCase();
  const segmentId = process.env.RESEND_SEGMENT_ID;

  try {
    const { error } = await resend.contacts.create({
      email: normalizedEmail,
      firstName,
      ...(lastName && { lastName }),
      unsubscribed: false,
      ...(segmentId && { segments: [{ id: segmentId }] }),
    });

    if (error) {
      console.error("Newsletter signup Resend error:", error);
      return res
        .status(500)
        .json({ error: "Failed to subscribe. Please try again." });
    }

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error("Newsletter signup error:", error);
    return res
      .status(500)
      .json({ error: "Failed to subscribe. Please try again." });
  }
}
