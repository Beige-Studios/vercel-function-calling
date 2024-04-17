import { VercelRequest, VercelResponse } from "@vercel/node";
import { sendOrder } from "../../../functions/sendOrder";
import { VapiPayload, VapiWebhookEnum } from "../../../types/vapi.types";
import { setCors } from "../../../utils/cors.utils";