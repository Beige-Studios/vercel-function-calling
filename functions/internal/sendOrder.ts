// import {generateUUID} from './../utils/uuidGenerator'

import generateOrderMessage from "../../utils/generateOrderMessage";
import sendATextMessage from "../../utils/sendATextMessage";

export default async function sendOrder(orderContents, lastFourOfCustomerPhoneNumber) {

  try {
    console.log('___Inside sendOrder function___')
    console.log('orderContents: ', orderContents);
    console.log('lastFourOfCustomerPhoneNumber: ', lastFourOfCustomerPhoneNumber);
    console.log('Sending Text Message...');
    const text = generateOrderMessage(orderContents);
    const result = await sendATextMessage('+818032071574', text);
    console.log('Message sent? ', result);
    console.log('___End of sendFunc, returning Success! message');
    return 'Success!';
  } catch (error) {
    console.log(error);
  }
}


