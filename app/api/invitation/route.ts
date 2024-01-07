import { randomUUID } from "crypto";
import { NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";
import getCurrentUser from "@/lib/getCurrentUser";
import { emailBuilder } from "@/helpers/emailBuilder";

const EmailApiSdk = require("@getbrevo/brevo");

export async function POST(req: Request) {
  const body = await req.json();

  const user = await getCurrentUser();

  if (!user) {
    return NextResponse.json(
      {
        message: "You are not logged in!",
      },
      {
        status: 400,
      }
    );
  }

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

  const alreadySentToken = await prisma.activateToken.findFirst({
    where: {
      email: body.email,
    },
  });

  if (alreadySentToken) {
    return NextResponse.json(
      {
        message: "You have already sent an invitation to this user!",
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
        senderId: user.id as string,
      },
    });

    const apiKeySMTP = process.env.SMTP_API_KEY as string;
    const apiInstance = new EmailApiSdk.TransactionalEmailsApi();

    apiInstance.setApiKey(EmailApiSdk.AccountApiApiKeys.apiKey, apiKeySMTP);

    const apiKey = apiInstance.authentications["apiKey"];
    apiKey.apiKey = apiKeySMTP;

    let sendSmtpEmail = new EmailApiSdk.SendSmtpEmail();

    const activateLink = `${process.env.WEBSITE_URL}/activate-account/${token.token}`;

    const emailData = emailBuilder({
      subject: "Activate your account!",
      htmlContent: `<!DOCTYPE html>
      <html lang="en">
      
      <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Account Confirmation</title>
          <style>
              body {
                  font-family: 'Arial', sans-serif;
                  margin: 0;
                  padding: 0;
                  background-color: #f5f5f5;
              }
      
              .container {
                  max-width: 600px;
                  margin: 0 auto;
                  padding: 30px;
                  background-color: #ffffff;
                  box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
                  margin-top: 50px;
                  border-radius: 10px;
              }
      
              h1 {
                  color: #007BFF;
                  text-align: center;
              }
      
              p {
                  font-size: 16px;
                  line-height: 1.6;
              }
      
              a {
                  display: inline-block;
                  padding: 12px 25px;
                  background-color: #007BFF;
                  color: #fff !important;
                  text-decoration: none;
                  border-radius: 5px;
                  margin-top: 20px;
              }

              span {
                color: #007BFF !important;
                background-color: #fff !important;
              }
      
              .footer {
                  margin-top: 30px;
                  text-align: center;
                  color: #777;
              }
          </style>
      </head>
      
      <body>
          <div class="container">
              <h1>Welcome to Roll budget!</h1>
              <p>Dear ${body.email}</p>
              <p>Congratulations! You're just one step away from unlocking a world of possibilities with Roll budget. To activate your account, simply click the button below:</p>
              <a href="${activateLink}">Activate Your Account</a>
              <p>If the button above doesn't work, you can also copy and paste the following URL into your browser:</p>
              <span>${activateLink}</span>
              <p>Thank you for choosing Roll budget. We can't wait to see what amazing things you'll achieve with us!</p>
              <div class="footer">
                  <p>If you have any questions or need assistance, please don't hesitate to contact us at <span>rollbudget.info@gmail.com.</span>
                  <p>Best regards,<br>Roll budget</p>
                  </p>
              </div>
          </div>
      </body>
      
      </html>
      
      `,
      sender: { email: user.email },
      to: [{ email: body.email }],
    });

    sendSmtpEmail = emailData;

    await apiInstance.sendTransacEmail(sendSmtpEmail);

    return NextResponse.json({ message: `Invitation sent to ${body.email}` });
  } catch (error) {
    console.error(error);
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
