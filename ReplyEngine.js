/**
 * ==========================================================
 * ReplyEngine.gs
 * ==========================================================
 */

function checkReplies() {

  const sheet = getLeadsSheet();

  const data = sheet.getDataRange().getValues();

  for (let i = 1; i < data.length; i++) {

    if (data[i][11] != STATUS.SENT)
      continue;

    const threadId = data[i][16];

    if (!threadId)
      continue;

    try {

      const thread = GmailApp.getThreadById(threadId);

      if (!thread)
        continue;

     const msgs = thread.getMessages();

const myEmail = Session.getActiveUser().getEmail();

let replied = false;

for (const msg of msgs) {

  const from = msg.getFrom().toLowerCase();

  if (!from.includes(myEmail.toLowerCase())) {

    replied = true;
    break;

  }

}

if (replied) {

  sheet.getRange(i + 1, 12)
    .setValue(STATUS.REPLIED);

  sheet.getRange(i + 1, 18)
    .setValue(new Date());

  writeLog(
    LOGLEVEL.INFO,
    "ReplyEngine",
    "REPLY_RECEIVED",
    data[i][4]
  );

}

    } catch (err) {

      writeLog(
        LOGLEVEL.ERROR,
        "ReplyEngine",
        "ERROR",
        err.toString()
      );

    }

  }

}