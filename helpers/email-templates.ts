interface IReminderTemplateProps {
  task: string;
  userName: string;
  date: string;
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
            <p>I hope this email finds you well. This is a friendly reminder about ${task}, scheduled to take place on ${date}.</p>
            
            <p>Thank you for your attention, and we appreciate your commitment to ${task}. If there are any changes or updates, we will notify you promptly.</p>
            <p>Best regards,<br></p>
        </div>
        <div class="footer">
            <p>&copy; 2024 Roll Budget. All rights reserved.</p>
        </div>
    </div>
</body>
</html>`;
