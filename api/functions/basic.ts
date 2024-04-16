import { VercelRequest, VercelResponse } from "@vercel/node";
import { getRandomName } from "../../functions/getRandomName";
import { VapiPayload, VapiWebhookEnum } from "../../types/vapi.types";

/**
 * Sets the CORS headers dynamically depending on the request's origin.
 * Adjustments needed depending on deployment and client requirements.
 */
function setCors(res: VercelResponse) {
    res.setHeader('Access-Control-Allow-Origin', 'https://dashboard.vapi.ai'); // Adjust according to your needs
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
    // Apply CORS headers for all incoming requests
    setCors(res);

    // Handle OPTIONS method for CORS preflight
    if (req.method === "OPTIONS") {
        res.status(200).end();
        return;
    }

    // Handling POST requests
    if (req.method === "POST") {
        try {
            const payload = req.body.message as VapiPayload;
            if (payload.type === VapiWebhookEnum.FUNCTION_CALL) {
                const { functionCall } = payload;
                if (!functionCall) {
                    throw new Error("Invalid Request.");
                }
                const { name, parameters } = functionCall;
                if (name === "getRandomName") {
                    const result = await getRandomName(parameters);
                    return res.status(201).json(result);
                } else {
                    console.log(`Function ${name} not found`);
                    throw new Error(`Function ${name} not found`);
                }
            }
            // Default response for valid POST without correct function call
            return res.status(202).json({ message: "No action performed" });
        } catch (err) {
            return res.status(500).json({ message: "Internal Server Error", error: err.message });
        }
    }

    // Handling not found cases for other HTTP methods
    return res.status(404).json({ message: "Not Found" });
}