import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(req: Request) {
    try {
        const { name, email, service, budget } = await req.json();

        console.log('Attempting to send email with:');
        console.log('User:', process.env.GMAIL_USER);
        console.log('Pass Check:', process.env.GMAIL_PASS ? `Length: ${process.env.GMAIL_PASS.length}, Content: ${process.env.GMAIL_PASS.replace(/ /g, '[SPACE]')}` : 'Missing');


        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.GMAIL_USER,
                // Gmail requires the app password with NO spaces, but we allow spaces in .env for readability
                pass: process.env.GMAIL_PASS?.replace(/\s+/g, ''),
            },
        });

        const mailOptions = {
            from: process.env.GMAIL_USER,
            to: process.env.GMAIL_USER, // Send to self
            subject: `New Lead: ${name} - ${service}`,
            text: `
Name: ${name}
Email: ${email}
Service: ${service}
Budget: ${budget}
            `,
            html: `
<h1>New Lead from Vintvate Website</h1>
<p><strong>Name:</strong> ${name}</p>
<p><strong>Email:</strong> ${email}</p>
<p><strong>Service:</strong> ${service}</p>
<p><strong>Budget:</strong> ${budget}</p>
            `,
        };

        await transporter.sendMail(mailOptions);

        return NextResponse.json({ message: 'Email sent successfully' }, { status: 200 });
    } catch (error) {
        console.error('Error sending email:', error);
        return NextResponse.json({ message: 'Failed to send email' }, { status: 500 });
    }
}
