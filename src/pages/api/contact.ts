// src/pages/api/contact.ts
export const prerender = false;

import { getSendGridApiKey, getToEmail, getFromEmail } from '../../js/datastore.js'
import sgMail from '@sendgrid/mail'

const key = getSendGridApiKey()
sgMail.setApiKey(key)

// Handle OPTIONS for CORS preflight
export function OPTIONS() {
  return new Response(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}

export async function POST({ request }: { request: Request }) {
  try {
    const data = await request.json();
    const name = data.name?.toString() || '';
    const email = data.email?.toString() || '';
    const date = data.date?.toString() || '';
    const message = data.message?.toString() || '';

    // Basic validation
    if (!name || !email || !date || !message) {
      return new Response(
        JSON.stringify({ success: false, error: "All fields are required" }),
        { 
          status: 400,
          headers: { 
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
          }
        }
      );
    }

    // TODO: Add your email sending logic here
    console.log("Form submission received:", { name, email, date, message });
    const msg = {
			to: getToEmail(),
			from: getFromEmail(),
			subject: 'New mail from vermeulen.photography',
			text: `You got a new enquiry from ${name} @ ${email} with and inquiry on ${date} and the following message: \n\n${message}`,
		}

    console.log("Sending mail: ", msg)

		sgMail
			.send(msg)
			.then((response) => {
				console.log(response[0].statusCode)
				console.log(response[0].headers)
			})
			.catch((error) => {
				console.error(error)
			})
    
    return new Response(
      JSON.stringify({ 
        success: true,
        message: "Thank you for your message! We will get back to you soon."
      }), 
      {
        status: 200,
        headers: { 
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        }
      }
    );
  } catch (error) {
    console.error("Error processing form:", error);
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: "Hm, something went wrong. Please try again. If the issue persists, please contact gerrit@vermeulen.photography." 
      }),
      { 
        status: 500,
        headers: { 
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        }
      }
    );
  }
}

// Handle all other methods
export function ALL() {
  return new Response(
    JSON.stringify({ success: false, error: 'Method not allowed' }),
    {
      status: 405,
      headers: { 
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      }
    }
  );
}
