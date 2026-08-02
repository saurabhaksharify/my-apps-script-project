/**
 * Creates all required sheets if they don't exist.
 */
function createRequiredSheets() {

  const ss = SpreadsheetApp.getActiveSpreadsheet();

  Object.values(SHEETS).forEach(name => {

    if (!ss.getSheetByName(name)) {

      ss.insertSheet(name);

    }

  });

  const defaultSheet = ss.getSheetByName("Sheet1");

  if (defaultSheet && ss.getSheets().length > 1) {

    ss.deleteSheet(defaultSheet);

  }

}
/**
 * Writes headers to all sheets.
 * Safe to run multiple times.
 */
function setupHeaders() {

  writeHeaders(SHEETS.LEADS, HEADERS.LEADS);

  writeHeaders(SHEETS.CAMPAIGNS, HEADERS.CAMPAIGNS);

  writeHeaders(SHEETS.TEMPLATES, HEADERS.TEMPLATES);

  writeHeaders(SHEETS.SETTINGS, HEADERS.SETTINGS);

  writeHeaders(SHEETS.SENDERS, HEADERS.SENDERS);

  writeHeaders(SHEETS.LOGS, HEADERS.LOGS);

  writeHeaders(SHEETS.STATS, HEADERS.STATS);

}
/**
 * Writes a single header row.
 */
function writeHeaders(sheetName, headers) {

  const sheet = SpreadsheetApp
    .getActiveSpreadsheet()
    .getSheetByName(sheetName);

  if (!sheet)
    throw new Error("Sheet not found: " + sheetName);

  sheet.clearContents();

  sheet.getRange(1, 1, 1, headers.length)
       .setValues([headers]);

}

/**
 * Seeds the Settings sheet.
 */
function seedSettings() {

  const sheet = SpreadsheetApp
    .getActiveSpreadsheet()
    .getSheetByName(SHEETS.SETTINGS);

  const settings = [

    ["App Name", CONFIG.APP_NAME],
    ["Version", CONFIG.VERSION],
    ["Timezone", CONFIG.TIMEZONE],

    ["Assignment Mode", CONFIG.ASSIGNMENT.MODE],

    ["Daily Limit Per Sender", CONFIG.SENDING.DAILY_LIMIT_PER_SENDER],
    ["Sending Start", CONFIG.SENDING.START_TIME],
    ["Sending End", CONFIG.SENDING.END_TIME],

    ["Random Delay Min", CONFIG.SENDING.RANDOM_DELAY_MIN],
    ["Random Delay Max", CONFIG.SENDING.RANDOM_DELAY_MAX],

    ["Follow-up 1 (Days)", CONFIG.FOLLOWUP.FIRST_AFTER_DAYS],
    ["Follow-up 2 (Days)", CONFIG.FOLLOWUP.SECOND_AFTER_DAYS],
    ["Follow-up 3 (Days)", CONFIG.FOLLOWUP.THIRD_AFTER_DAYS],

    ["Stop On Reply", CONFIG.FOLLOWUP.STOP_ON_REPLY],

    ["Logging Enabled", CONFIG.LOGGING.ENABLED],

    ["Test Mode", true]

  ];

  sheet.getRange(
      2,
      1,
      settings.length,
      settings[0].length
    )
    .setValues(settings);

}

function seedSenders() {

  const sheet = SpreadsheetApp
    .getActiveSpreadsheet()
    .getSheetByName(SHEETS.SENDERS);

  const rows = DEFAULT_SENDERS.map(sender => [

    sender.id,

    sender.name,

    sender.email,

    sender.status,

    sender.dailyLimit,

    sender.timezone,

    sender.signature

  ]);

  sheet.getRange(2,1,rows.length,rows[0].length)
       .setValues(rows);

}

/**
 * Formats every sheet.
 */
function formatWorkbook() {

  const ss = SpreadsheetApp.getActiveSpreadsheet();

  ss.getSheets().forEach(sheet => {

    if (sheet.getLastColumn() === 0)
      return;

    const header = sheet.getRange(
      1,
      1,
      1,
      sheet.getLastColumn()
    );

    header

      .setFontWeight("bold")

      .setBackground("#1F4E78")

      .setFontColor("white")

      .setHorizontalAlignment("center");

    sheet.setFrozenRows(1);

    if (sheet.getFilter())
      sheet.getFilter().remove();

    header.createFilter();

    sheet.autoResizeColumns(
      1,
      sheet.getLastColumn()
    );

  });

}

function initializeDashboard() {

  const sheet = SpreadsheetApp
    .getActiveSpreadsheet()
    .getSheetByName(SHEETS.DASHBOARD);

  sheet.clear();

  sheet.getRange("A1")
       .setValue("AKSHARIFY MAILFLOW DASHBOARD");

  sheet.getRange("A3")
       .setValue("Emails Sent Today");

  sheet.getRange("A4")
       .setValue("Replies");

  sheet.getRange("A5")
       .setValue("Pending");

  sheet.getRange("A6")
       .setValue("Failed");

  sheet.getRange("A7")
       .setValue("Follow-ups Due");

  sheet.getRange("A8")
       .setValue("Remaining Daily Quota");

}

function goToDashboard() {

  SpreadsheetApp.getActive()
    .setActiveSheet(
      SpreadsheetApp.getActive().getSheetByName(SHEETS.DASHBOARD)
    );

}

function goToSettings() {

  SpreadsheetApp.getActive()
    .setActiveSheet(
      SpreadsheetApp.getActive().getSheetByName(SHEETS.SETTINGS)
    );

}