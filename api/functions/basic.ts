import { VercelRequest, VercelResponse } from "@vercel/node";
import { getRandomName } from "../../functions/getRandomName";
import { VapiPayload, VapiWebhookEnum } from "../../types/vapi.types";
import { setCors } from "../../utils/cors.utils";

export default async function handler(req: VercelRequest, res: VercelResponse) {
    // Log the incoming request method and headers for debugging
    console.log('Received request with method:', req.method);
    console.log('Request headers:', req.headers);

    // Apply CORS headers for all incoming requests
    setCors(res);
    console.log('CORS headers set');

    // Handle OPTIONS method for CORS preflight
    if (req.method === "OPTIONS") {
        console.log('Handling OPTIONS method');
        res.status(200).end();
        return;
    }

    // Handling POST requests
    if (req.method === "POST") {
        console.log('Handling POST method');
        try {
            console.log('POST request body:', req.body);
            const payload = req.body.message;
            console.log('Parsed VapiPayload:', payload);

            if (payload.type === VapiWebhookEnum.FUNCTION_CALL) {
                const { functionCall } = payload;
                console.log('Function call details:', functionCall);

                if (!functionCall) {
                    console.log('Error: Invalid function call request');
                    throw new Error("Invalid Request.");
                }

                const { name, parameters } = functionCall;

                const funcName = payload.call.assistant.model.functions[0].name;
                console.log("funcName: ", funcName)

                if (funcName === "getRandomName") {
                    console.log(`Executing function: ${name} with parameters:`, parameters);
                    const result = await getRandomName(parameters);
                    console.log(`Function result:`, result);
                    return res.status(201).json(result);
                } else {
                    console.log(`Error: Function ${name} not found`);
                    throw new Error(`Function ${name} not found`);
                }
            } else {
                console.log('No valid function call type found in payload');
                return res.status(202).json({ message: "No action performed" });
            }
        } catch (err) {
            console.log('Error handling POST request:', err);
            return res.status(500).json({ message: "Internal Server Error", error: err.message });
        }
    }

    // Log and handle not found cases for other HTTP methods
    console.log('Handling unsupported method:', req.method);
    return res.status(404).json({ message: "Not Found" });
}