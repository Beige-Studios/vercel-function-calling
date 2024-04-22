// import {generateUUID} from './../utils/uuidGenerator'

export default async function sendOrder(orderContents, lastFourOfCustomerPhoneNumber) {

  try {
    console.log('___Inside sendOrder function___')
    console.log('orderContents: ', orderContents);
    console.log('lastFourOfCustomerPhoneNumber: ', lastFourOfCustomerPhoneNumber);
    console.log('___End of sendFunc, returning Success! message');
    return 'Success!';
  } catch (error) {
    console.log(error);
  }
}