import twilio from 'twilio';

const client: twilio.Twilio = twilio(process.env.ACCOUNT_SID, process.env.AUTH_TOKEN);

async function sendATextMessage(phoneNumber: string, text: string): Promise<String> {
    try {
        const message = await client.messages.create({
            from: '+12513334611',
            to: phoneNumber,
            body: text
        });
        console.log(message.sid);
        return 'Success';
    } catch (error) {
        console.error('Error sending message:', error);
        return 'Failed'
    }
}

export default sendATextMessage;





