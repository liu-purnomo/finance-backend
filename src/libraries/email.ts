import nodemailer from 'nodemailer';

// Retrieve email credentials from environment variables
const user = process.env.EMAIL_USERNAME;
const pass = process.env.EMAIL_PASSWORD;

interface ISendEmailProps {
    email: string;
    subject: string;
    content: string;
}

export const sendEmail = async ({ email, subject, content }: ISendEmailProps) => {
    try {
        // Check if email credentials are provided
        if (!user || !pass) {
            throw new Error(
                'Email sender credentials are not configured. Please contact the administrator.'
            );
        }

        // Create a transporter with nodemailer
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: user,
                pass: pass
            }
        });

        // Define email options
        const mailOptions = {
            from: user,
            to: email,
            subject: subject,
            html: content
        };

        // Send the email
        const info = await transporter.sendMail(mailOptions);

        // Log successful email sending
        // console.log("Email sent:", info.response);

        return info;
    } catch (error: any) {
        // Handle specific error cases
        if (error.code === 'EAUTH') {
            // Invalid login error
            console.error('Invalid login:', error.response);
            throw new Error('Failed to send email: Invalid login credentials.');
        } else {
            // Log and rethrow any other errors that occur during sending
            console.error('Email sending failed:', error);
            throw new Error('Failed to send email: Unknown error occurred.');
        }
    }
};
