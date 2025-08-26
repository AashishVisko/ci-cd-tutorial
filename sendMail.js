const cron = require("node-cron");
const nodemailer = require("nodemailer");
require("dotenv").config();


let transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.USER_EMAIL,
    pass: process.env.EMAIL_APP_PASSWORD, 
  },
});

// ==================== QUOTES ====================
const motivationalQuotes = [
  { quote: "The best error message is the one that never shows up.", author: "Thomas Fuchs" },
  { quote: "Code is like humor. When you have to explain it, it's bad.", author: "Cory House" },
  { quote: "First, solve the problem. Then, write the code.", author: "John Johnson" },
  { quote: "Experience is the name everyone gives to their mistakes.", author: "Oscar Wilde" },
  { quote: "In order to be irreplaceable, one must always be different.", author: "Coco Chanel" },
  { quote: "The only way to learn a new programming language is by writing programs in it.", author: "Dennis Ritchie" },
  { quote: "Simplicity is the ultimate sophistication.", author: "Leonardo da Vinci" },
  { quote: "Make it work, make it right, make it fast.", author: "Kent Beck" },
  { quote: "The function of good software is to make the complex appear to be simple.", author: "Grady Booch" },
  { quote: "Clean code always looks like it was written by someone who cares.", author: "Robert C. Martin" },
  { quote: "Programming isn't about what you know; it's about what you can figure out.", author: "Chris Pine" },
  { quote: "The best way to get a project done faster is to start sooner.", author: "Jim Highsmith" },
  { quote: "Code never lies, comments sometimes do.", author: "Ron Jeffries" },
  { quote: "Deleted code is debugged code.", author: "Jeff Sickel" },
  { quote: "A good programmer is someone who always looks both ways before crossing a one-way street.", author: "Doug Linder" }
];

// ==================== TIPS ====================
const dailyTips = [
  "💡 **Tip**: Use meaningful variable names - your future self will thank you!",
  "🔧 **Tip**: Don't forget to write unit tests - they're your safety net.",
  "🎯 **Tip**: Break down complex problems into smaller, manageable tasks.",
  "📚 **Tip**: Learn one new thing every day, even if it's small.",
  "🤝 **Tip**: Code reviews are learning opportunities, not criticisms.",
  "⚡ **Tip**: Optimize for readability first, performance second.",
  "🧹 **Tip**: Refactor regularly - clean code is happy code.",
  "📝 **Tip**: Document your code like you're explaining it to a friend.",
  "🔄 **Tip**: Version control everything - commit early, commit often.",
  "🎨 **Tip**: Consistency in coding style makes the team more productive."
];

// ==================== HELPERS ====================
function getRandomQuote() {
  return motivationalQuotes[Math.floor(Math.random() * motivationalQuotes.length)];
}

function getRandomTip() {
  return dailyTips[Math.floor(Math.random() * dailyTips.length)];
}

function getCurrentDate() {
  return new Date().toLocaleDateString("en-US", {
    weekday: "long", year: "numeric", month: "long", day: "numeric"
  });
}

function createEmailTemplate() {
  const quote = getRandomQuote();
  const tip = getRandomTip();
  const currentDate = getCurrentDate();

  return {
    subject: `🌟 Daily Motivation & Tips - ${currentDate}`,
    html: `
      <!DOCTYPE html>
      <html lang="en">
      <head><meta charset="UTF-8"><title>Daily Developer Motivation</title></head>
      <body style="margin:0;padding:0;font-family:Arial,sans-serif;background:#f4f4f4;">
        <table cellspacing="0" cellpadding="0" border="0" width="100%">
          <tr>
            <td style="padding:20px 0;">
              <table width="600" style="margin:0 auto;background:#fff;border-radius:8px;box-shadow:0 2px 10px rgba(0,0,0,0.1);">
                <tr>
                  <td style="background:linear-gradient(135deg,#667eea 0%,#764ba2 100%);padding:30px;text-align:center;border-radius:8px 8px 0 0;">
                    <h1 style="color:#fff;margin:0;font-size:28px;">🚀 Daily Developer Motivation</h1>
                    <p style="color:#fff;margin:10px 0 0;opacity:0.9;">${currentDate}</p>
                  </td>
                </tr>
                <tr>
                  <td style="padding:40px 30px;">
                    <h2 style="color:#333;margin:0 0 20px;">Good Morning, Amazing Developers! 👋</h2>
                    <div style="background:#f8f9fa;border-left:4px solid #667eea;padding:20px;margin:20px 0;border-radius:0 8px 8px 0;">
                      <h3 style="color:#667eea;margin:0 0 15px;">💭 Quote of the Day</h3>
                      <blockquote style="margin:0;font-style:italic;color:#555;">"${quote.quote}"</blockquote>
                      <p style="margin:15px 0 0;color:#888;font-size:14px;text-align:right;">— ${quote.author}</p>
                    </div>
                    <div style="background:#fff3cd;border:1px solid #ffeaa7;padding:20px;margin:20px 0;border-radius:8px;">
                      <h3 style="color:#856404;margin:0 0 15px;">💡 Today's Developer Tip</h3>
                      <p style="margin:0;color:#856404;font-size:16px;">${tip}</p>
                    </div>
                    <div style="text-align:center;padding:30px 0;">
                      <h3 style="color:#333;margin:0 0 15px;">🌟 Let's Make Today Awesome!</h3>
                      <p style="color:#666;margin:0;font-size:16px;">Remember, every line of code you write today brings you closer to mastery. Keep coding, keep learning, and keep being awesome! 🔥</p>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td style="background:#f8f9fa;padding:20px 30px;text-align:center;border-radius:0 0 8px 8px;border-top:1px solid #e9ecef;">
                    <p style="margin:0;color:#888;font-size:14px;">Have a productive day! 💪<br><em>Sent with ❤️ from your Development Team</em></p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </body>
      </html>
    `,
    text: `
Daily Developer Motivation - ${currentDate}

Good Morning, Amazing Developers! 👋

Quote of the Day:
"${quote.quote}" - ${quote.author}

Today's Developer Tip:
${tip}

Let's Make Today Awesome! 🌟
Keep coding, keep learning, and keep being awesome! 🔥

Have a productive day! 💪
Sent with ❤️ from your Development Team
    `
  };
}

// ==================== SEND EMAILS ====================
async function sendMotivationEmails() {
  const emails = process.env.TEST_EMAILS.split(",");
  const emailTemplate = createEmailTemplate();

  console.log(`📧 Sending motivation emails to ${emails.length} developers...`);

  for (let email of emails) {
    try {
      let info = await transporter.sendMail({
        from: `"Daily Developer Motivation 🚀" <${process.env.USER_EMAIL}>`,
        to: email.trim(),
        subject: emailTemplate.subject,
        html: emailTemplate.html,
        text: emailTemplate.text,
      });
      console.log(`✅ Motivation email sent to ${email.trim()}: ${info.messageId}`);
    } catch (err) {
      console.error(`❌ Failed to send email to ${email.trim()}:`, err.message);
    }
  }

  console.log("📬 Daily motivation email batch completed!");
}

// ==================== TEST RUN ====================
sendMotivationEmails(); // Run once immediately for testing

// ==================== CRON JOB ====================
cron.schedule("15 10 * * *", async () => {
  console.log("⏰ Running daily motivation email job at 10:15 AM...");
  try {
    await sendMotivationEmails();
  } catch (err) {
    console.error("❌ Cron job failed:", err.message);
  }
}, {
  scheduled: true,
  timezone: "Asia/Kolkata"
});
