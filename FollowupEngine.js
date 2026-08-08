/**
 * ==========================================================
 * FollowupEngine.gs
 * ==========================================================
 */

function processFollowups() {

  const sheet = getLeadsSheet();

  const data = sheet.getDataRange().getValues();

  const today = new Date();

  for (let i = 1; i < data.length; i++) {

    if (data[i][11] != STATUS.SENT)
      continue;

    const nextDate = data[i][15];

    if (!nextDate)
      continue;

    if (today < new Date(nextDate))
      continue;

    sendFollowup(i + 1, data[i]);

  }

}
function sendFollowup(row, lead) {

  const count = Number(lead[14]);

  if (count >= 3)
    return;

  const campaign = lead[10];

  const template =
    getFollowupTemplate(
      campaign,
      count + 1
    );

  if (!template)
    return;

  const email =
    renderTemplate(
      template,
      lead
    );

  const threadId = lead[16];

if (threadId) {

  const thread = GmailApp.getThreadById(threadId);

  if (thread) {

    thread.reply("", {
      htmlBody: email.body
    });

  } else {

    GmailApp.sendEmail(
      lead[4],
      email.subject,
      "",
      {
        htmlBody: email.body
      }
    );

  }

} else {

  GmailApp.sendEmail(
    lead[4],
    email.subject,
    "",
    {
      htmlBody: email.body
    }
  );

}

  const sheet = getLeadsSheet();

  sheet.getRange(row,14)
    .setValue(new Date());

  sheet.getRange(row,15)
    .setValue(count + 1);

  const next = new Date();

  if (count == 0)
    next.setDate(
      next.getDate() +
      CONFIG.FOLLOWUP.SECOND_AFTER_DAYS
    );

  if (count == 1)
    next.setDate(
      next.getDate() +
      CONFIG.FOLLOWUP.THIRD_AFTER_DAYS
    );

  if (count == 2)
    sheet.getRange(row,16).clearContent();
  else
    sheet.getRange(row,16).setValue(next);

  writeLog(

    LOGLEVEL.INFO,

    "Followup",

    "FOLLOWUP_" + (count + 1),

    lead[4]

  );

}