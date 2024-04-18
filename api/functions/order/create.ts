import { VercelRequest, VercelResponse } from "@vercel/node";
import sendOrder from "../../../functions/sendOrder";
import { VapiPayload, VapiWebhookEnum } from "../../../types/vapi.types";
import { setCors } from "../../../utils/cors.utils";
import {generateUUID} from './../../../utils/uuidGenerator'

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Apply CORS headers for all incoming requests
  setCors(res);

  // Handling OPTIONS method for CORS preflight
  if (req.method === "OPTIONS") {
      res.status(200).end();
      return;
  }

  // Handling POST requests
  if (req.method === "POST") {
      try {
          const payload = req.body.message;

          if (payload.type === VapiWebhookEnum.FUNCTION_CALL) {
              const { functionCall } = payload;

              if (!functionCall) {
                  throw new Error("Invalid Request.");
              }

              const lineItems = payload.functionCall.parameters.items
              const customerName = payload.functionCall.parameters.phoneNumber
              console.log('Line Items: ', lineItems, ' Customer Name: ', customerName);

              const result = await sendOrder(lineItems, customerName)

              return res.status(201).json({ message: result});

          } else {
              return res.status(202).json({ message: "No action performed" });
          }
      } catch (err) {
          return res.status(500).json({ message: "Internal Server Error", error: err.message });
      }
  }

  // Handle not found cases for other HTTP methods
  return res.status(404).json({ message: "Not Found" });
}
