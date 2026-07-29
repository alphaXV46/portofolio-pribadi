import { NextResponse } from 'next/server'
import { Resend } from 'resend'
import { contactFormSchema } from '@/lib/validations/contact'

const resend = new Resend(process.env.RESEND_API_KEY || 're_mock_key')

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const validatedData = contactFormSchema.parse(body)

    if (process.env.RESEND_API_KEY) {
      await resend.emails.send({
        from: 'Portfolio Contact <onboarding@resend.dev>',
        to: process.env.CONTACT_EMAIL || 'delivered@example.com',
        subject: `New Portfolio Message from ${validatedData.name}`,
        text: `Name: ${validatedData.name}\nEmail: ${validatedData.email}\n\nMessage:\n${validatedData.message}`
      })
    }

    return NextResponse.json(
      { success: true, message: 'Message sent successfully!' },
      { status: 200 }
    )
  } catch (error: any) {
    if (error.name === 'ZodError') {
      return NextResponse.json(
        { success: false, errors: error.errors },
        { status: 400 }
      )
    }
    return NextResponse.json(
      { success: false, message: 'Failed to send message.' },
      { status: 500 }
    )
  }
}
