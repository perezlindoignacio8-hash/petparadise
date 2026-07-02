import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(req: Request) {
  try {
    const { nombre, email, mensaje } = await req.json();

    if (!nombre || !email || !mensaje) {
      return NextResponse.json({ error: 'Faltan campos requeridos' }, { status: 400 });
    }

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD,
      },
    });

    await transporter.sendMail({
      from: `"Pet Paradise Contacto" <${process.env.GMAIL_USER}>`,
      to: 'perezlindoignacio8@gmail.com',
      replyTo: email,
      subject: `📬 Nuevo mensaje de ${nombre} - Pet Paradise`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: #1e293b; padding: 24px; border-radius: 12px 12px 0 0;">
            <h1 style="color: white; margin: 0; font-size: 22px;">🐾 Nuevo contacto - Pet Paradise</h1>
          </div>
          <div style="background: #f9f9f9; padding: 24px; border-radius: 0 0 12px 12px; border: 1px solid #e5e7eb;">
            <p style="margin: 0 0 12px;"><strong>Nombre:</strong> ${nombre}</p>
            <p style="margin: 0 0 12px;"><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
            <p style="margin: 0 0 8px;"><strong>Mensaje:</strong></p>
            <div style="background: white; border: 1px solid #e5e7eb; border-radius: 8px; padding: 16px;">
              <p style="margin: 0; color: #374151; white-space: pre-wrap;">${mensaje}</p>
            </div>
            <p style="margin: 16px 0 0; font-size: 12px; color: #9ca3af;">
              Podés responder directamente a este email para contactar al cliente.
            </p>
          </div>
        </div>
      `,
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error('Error enviando email:', err);
    return NextResponse.json({ error: 'Error al enviar el mensaje' }, { status: 500 });
  }
}
