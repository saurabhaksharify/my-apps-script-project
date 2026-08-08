/**
 * ==========================================================
 * AKSHARIFY MAILFLOW
 * LogManager.gs
 * ==========================================================
 */

function writeLog(level, module, action, details) {

  if (!CONFIG.LOGGING.ENABLED)
    return;

  const sheet = SpreadsheetApp
    .getActiveSpreadsheet()
    .getSheetByName(SHEETS.LOGS);

  sheet.appendRow([
    new Date(),
    level,
    module,
    action,
    details
  ]);

}