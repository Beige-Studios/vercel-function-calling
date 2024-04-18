import { Client, Environment, ApiError } from "square"
import {generateUUID} from './../utils/uuidGenerator'

function generateObjects(lineItems) {
  // Create an empty object to store the quantities
  let quantities = {};
  console.log(lineItems)
  // Loop through the lineItems array to count the quantities
  lineItems.forEach(item => {
      if (quantities[item]) {
          quantities[item]++;
      } else {
          quantities[item] = 1;
      }
  });

  // Create an array of objects from the quantities
  let objects = Object.keys(quantities).map(key => {
      return {
          quantity: quantities[key].toString(),
          catalogObjectId: key
      };
  });

  return objects;
}


export default async function sendOrder(lineItems, customerName) {
  const client = new Client({
    bearerAuthCredentials: {
      accessToken: "EAAAlyjqSc-T2j8wvmJQih1Wwzg_yOV3py2Y--Vdsw3Kn_2yicHpdiIXW7hZvY3k"
    },
    environment: Environment.Sandbox,
  });

  const { ordersApi } = client;

  try {

    // lineItems = ['xxxxx', 'yyyyyy', 'xxxxx'];
    const itemsToSend = generateObjects(lineItems);

    const response = await ordersApi.createOrder({
      order: {
        locationId: 'LRKQ26AMPG6PY',
        lineItems: itemsToSend,
        fulfillments: [
          {
            type: 'PICKUP',
            pickupDetails: {
              recipient: {
                displayName: customerName,
                phoneNumber: '+14803749758'
              },
              expiresAt: '2024-04-19T08:00:09.527Z',
              scheduleType: 'ASAP',
              pickupAt: '2024-04-17T07:40:21.124Z'
            }
          }
        ]
      },
      idempotencyKey: generateUUID()
    });

    console.log(response.result.order.id);
    return response.result.order.id
  } catch (error) {
    console.log(error);
  }
}