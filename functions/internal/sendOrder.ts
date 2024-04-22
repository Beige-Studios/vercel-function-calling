// import {generateUUID} from './../utils/uuidGenerator'

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


export default async function sendOrder(lastFourOfCustomerPhoneNumber) {

  try {
    // lineItems = ['xxxxx', 'yyyyyy', 'xxxxx'];
    // Put in default order, just need phone number
    // const itemsToSend = generateObjects(["BUYTMQH6IUPPW3WXJ3OXYTEA"]);
    console.log('Within Func: Last four digits.... ', lastFourOfCustomerPhoneNumber);
    return 'Success!';

  } catch (error) {
    console.log(error);
  }
}