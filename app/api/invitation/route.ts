import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { randomUUID } from "crypto";
const nodemailer = require("nodemailer");

export async function POST(req: Request) {
  const body = await req.json();

  if (!body.email === undefined || body.email === null || body.email === "") {
    return NextResponse.json(
      {
        message: "You have to provide an email address!",
      },
      {
        status: 400,
      }
    );
  }

  try {
    const token = await prisma.activateToken.create({
      data: {
        token: `${randomUUID()}${randomUUID()}`.replace(/-/g, ""),
        email: body.email as string,
      },
    });
    const transporter = nodemailer.createTransport({
      host: "localhost",
      port: 1025,
      ignoreTLS: true,
    });

    const message = {
      from: "roll@app.com",
      to: body.email,
      subject: "Activate account",
      text: `Please activate your account by clicking on this link: http://localhost:3000/activate-account/${token.token}`,
    };

    transporter.sendMail(message, (err: any, info: any) => {
      if (err) {
        console.error("Error sending email:", err);
      } else {
        console.log("Email sent:", info);
      }
    });
    return NextResponse.json({ message: `Invitation sent to ${body.email}` });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        message: "Error sending email",
      },
      {
        status: 400,
      }
    );
  }
}
