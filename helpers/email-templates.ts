interface IReminderTemplateProps {
  task: string;
  userName: string;
  date: string;
}

interface IInvitationTemplateProps {
  email: string;
  activateLink: string;
}

export const reminderTemplate = ({
  task,
  userName,
  date,
}: IReminderTemplateProps) => `
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Reminder: [Event/Task Name]</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 20px;
        }

        .container {
            max-width: 600px;
            margin: 0 auto;
        }

        .header {
            background-color: #3498db;
            color: #fff;
            padding: 20px;
            text-align: center;
        }

        .content {
            padding: 20px;
        }

        .footer {
            background-color: #f2f2f2;
            padding: 10px;
            text-align: center;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h2>Friendly Reminder: ${task}</h2>
        </div>
        <div class="content">
            <p>Dear ${userName},</p>
            <p>I hope this email finds you well. This is a friendly reminder about <b>${task}</b>, scheduled to take place on ${date}.</p>
            
            <p>Thank you for your attention, and we appreciate your commitment to <b>${task}</b>. If there are any changes or updates, we will notify you promptly.</p>
            <p>Best regards,<br></p>
        </div>
        <div class="footer">
            <p>&copy; 2024 Roll Budget. All rights reserved.</p>
        </div>
    </div>
</body>
</html>`;

export const invitationTemplate = ({
  activateLink,
  email,
}: IInvitationTemplateProps) =>
  `<!DOCTYPE html>
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
              <p>Dear ${email}</p>
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
      
      `;
