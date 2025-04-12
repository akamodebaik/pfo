import { ContactFormData } from '@/types';
import sgMail from '@sendgrid/mail';

/**
 * Send email using SendGrid
 */
export async function sendEmail(data: ContactFormData): Promise<boolean> {
  try {
    // Check if SendGrid API key is available
    if (!process.env.SENDGRID_API_KEY) {
      console.error('SENDGRID_API_KEY is not set');
      return false;
    }

    // Set SendGrid API key
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);

    // Configure email message
    const msg = {
      to: 'aka@example.com', // Replace with your actual email
      from: 'portfoliobot@akaportfolio.com', // Must be verified sender in SendGrid
      subject: `Portfolio Contact: ${data.name}`,
      text: `Name: ${data.name}\nEmail: ${data.email}\nMessage: ${data.message}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #0284c7;">New Portfolio Contact</h2>
          <p><strong>From:</strong> ${data.name}</p>
          <p><strong>Email:</strong> ${data.email}</p>
          <div style="margin-top: 20px; padding: 15px; background-color: #f0f9ff; border-left: 4px solid #0284c7; border-radius: 4px;">
            <p><strong>Message:</strong></p>
            <p>${data.message.replace(/\n/g, '<br>')}</p>
          </div>
          <p style="margin-top: 20px; font-size: 12px; color: #64748b;">
            This email was sent from the contact form on your portfolio website.
          </p>
        </div>
      `,
    };

    // Send email
    await sgMail.send(msg);
    console.log('Email sent successfully');
    return true;
    
  } catch (error) {
    console.error('Error sending email:', error);
    return false;
  }
}
