import { VercelRequest, VercelResponse } from "@vercel/node";
import { getRandomName } from "../../functions/getRandomName";
import { VapiPayload, VapiWebhookEnum } from "../../types/vapi.types";
import { setCors } from "../../utils/cors.utils";

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

                const { parameters } = functionCall;

                console.log(payload.call.assistant.model.functions)

                const itsTheFuncWeNeed = payload.call.assistant.model.functions.some(func => func.name === 'getRandomName');

                if (itsTheFuncWeNeed) {
                    const result = await getRandomName(parameters);
                    return res.status(201).json(result);
                } else {
                    throw new Error(`Function not found`);
                }
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
