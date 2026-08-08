/**
 * ==========================================================
 * AKSHARIFY MAILFLOW
 * MailEngine.gs
 * Core Sending Engine
 * ==========================================================
 */

/**
 * Returns all READY leads
 */
function getReadyLeads() {

  const sheet = getLeadsSheet();

  const data = sheet.getDataRange().getValues();

  const leads = [];

  for (let i = 1; i < data.length; i++) {

    if (String(data[i][11]).toUpperCase() == STATUS.NEW) {

      leads.push({
        row: i + 1,
        data: data[i]
      });

    }

  }

  return leads;

}
/**
 * Sends one personalized email
 */
function sendLeadEmail(leadObj) {

  const lead = leadObj.data;

  const sender = getNextSender();

  const template = getRandomTemplate();

  if (!template)
    throw new Error("No active template found.");

  const email = renderTemplate(template, lead);

  GmailApp.sendEmail(

    lead[4],

    email.subject,

    "",

    {

      htmlBody: email.body,

      name: sender[1]

    }

  );

}
/**
 * Runs one sending cycle
 */
function runMailFlow() {

  const leads = getReadyLeads();

  if (leads.length == 0) {

    Logger.log("No READY leads.");

    return;

  }

  for (const lead of leads) {

    try {

      sendLeadEmail(lead);

      writeLog(
  LOGLEVEL.INFO,
  "MailEngine",
  "EMAIL_SENT",
  lead.data[4]
);

    }

    catch(err){

      writeLog(
  LOGLEVEL.ERROR,
  "MailEngine",
  "EMAIL_FAILED",
  err.toString()
);

    }

  }

}
/**
 * Sends one personalized email
 */
function sendLeadEmail(leadObj) {

  const lead = leadObj.data;

  const sender = getNextSender();

  const campaignId = lead[10];

  const template = getInitialTemplate(campaignId);

  if (!template)
    throw new Error("No template found.");

  const email = renderTemplate(template, lead);

  GmailApp.sendEmail(
    lead[4],
    email.subject,
    "",
    {
      htmlBody: email.body,
      name: sender[1]
    }
  );

  Utilities.sleep(1500);

  const threads = GmailApp.search(
    'to:' + lead[4] +
    ' newer_than:1d'
  );

  const threadId =
    threads.length ? threads[0].getId() : "";

  markLeadSent(
    leadObj.row,
    sender,
    threadId
  );

  incrementSenderCount(sender[0]);

}
/**
 * Updates lead after email sent
 */
function markLeadSent(row, sender, threadId) {

  const sheet = getLeadsSheet();

  sheet.getRange(row, 9).setValue(sender[0]);              // Sender ID
  sheet.getRange(row,10).setValue(sender[1]);              // Sender Name
  sheet.getRange(row,12).setValue(STATUS.SENT);            // Status
  sheet.getRange(row,14).setValue(new Date());             // Last Email Date
  sheet.getRange(row,15).setValue(0);                      // Follow-up Count

  const next = new Date();
  next.setDate(next.getDate() + CONFIG.FOLLOWUP.FIRST_AFTER_DAYS);

  sheet.getRange(row,16).setValue(next);                   // Next Follow-up
  sheet.getRange(row,17).setValue(threadId);               // Thread ID

}
/**
 * Increment sender daily count
 */
function incrementSenderCount(senderId) {

  const sheet = getSendersSheet();

  const data = sheet.getDataRange().getValues();

  for (let i = 1; i < data.length; i++) {

    if (data[i][0] == senderId) {

      const count = Number(data[i][5]) || 0;

      sheet.getRange(i + 1, 6).setValue(count + 1);

      return;

    }

  }

}
