import { NextResponse } from "next/server";

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { email } = body;

        if (!email) {
            return NextResponse.json({ error: "Email is required" }, { status: 400 });
        }

        // Mock delay to simulate network request
        await new Promise((resolve) => setTimeout(resolve, 1000));

        // In a real app, you would save to DB or send to Mailchimp/Resend here.
        console.log(`[Newsletter] New subscriber: ${email}`);

        return NextResponse.json({ message: "Welcome to the frequency." }, { status: 200 });
    } catch {
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
