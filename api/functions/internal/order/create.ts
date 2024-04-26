import { VercelRequest, VercelResponse } from "@vercel/node";
import sendOrder from "./../../../../functions/internal/sendOrder";
import { VapiPayload, VapiWebhookEnum } from "./../../../../types/vapi.types";
import { setCors } from "./../../../../utils/cors.utils";
import { generateUUID } from "./../../../../utils/uuidGenerator"

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


              console.log('Entire Payload: ', payload);
              const orderContents = payload.functionCall.parameters.orderContents
              const lastFourOfCustomerPhoneNumber = payload.functionCall.parameters.lastFourOfCustomerPhoneNumber

              console.log('___API___');
              console.log('orderContents: ', orderContents, 'lastFourOfCustomerPhoneNumber: ', lastFourOfCustomerPhoneNumber);

              const result = await sendOrder(orderContents, lastFourOfCustomerPhoneNumber)

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
