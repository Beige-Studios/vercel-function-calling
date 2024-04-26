
import { VercelRequest, VercelResponse } from "@vercel/node";
// import sendOrder from "../../../functions/integration/stripe/sendOrder";
// import { VapiPayload, VapiWebhookEnum } from "../../../types/vapi.types";
// import { setCors } from "../../../utils/cors.utils";
// import {generateUUID} from './../../../utils/uuidGenerator'

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const options = {
    method: 'POST',
    headers: {Authorization: 'Bearer 9f593270-7deb-4f44-8f5f-5fb27d315725', 'Content-Type': 'application/json'},
    // body: ``
  };

  // Handling POST requests
  if (req.method === "POST") {
      try {
          const body = req.body;

          const response = await fetch('https://api.vapi.ai/assistant', options);
          const data = await response.json();

      } catch (err) {
          return res.status(500).json({ message: "Internal Server Error", error: err.message });
      }
  }
}
