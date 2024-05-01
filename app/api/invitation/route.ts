import { randomUUID } from "crypto";
import { NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";
import getCurrentUser from "@/lib/getCurrentUser";
import { emailBuilder } from "@/helpers/emailBuilder";
import { invitationTemplate } from "@/helpers/email-templates";

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

    const activateLink = `${process.env.WEBSITE_URL}/${body.locale}/activate-account/${token.token}`;

    const emailData = emailBuilder({
      subject: "Activate your account!",
      htmlContent: invitationTemplate({ activateLink, email: body.email }),
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
