import crypto from "crypto";

export const config = {
  runtime: "nodejs",
};

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const body = {
    phone_number: req.body.phone_number,
    amount: req.body.amount,
    country: "UG",
    reference: crypto.randomUUID(),
    description: "Payment for services",
    callback_url: "https://tuundaug.com/webhook",
  };

  try {
    const response = await fetch(
      "https://wallet.wearemarz.com/api/v1/collect-money",
      {
        method: "POST",
        headers: {
          Authorization:
            "Basic bWFyel9MYXR0ZmdkV0VVM2F6R1FCOjBYN1o3YTFOOERjODhZUWlUMlJPS1dzSDNYNWZrYVdG",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      }
    );

    const data = await response.json();
    return res.status(response.status).json(data);

  } catch (error) {
    return res.status(500).json({
      error: "Request failed",
      message: error.message,
    });
  }
}
