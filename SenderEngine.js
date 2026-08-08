/**
 * ==========================================================
 * AKSHARIFY MAILFLOW
 * SenderEngine.gs
 * ==========================================================
 */

/**
 * Returns Senders sheet
 */
function getSendersSheet() {

  return SpreadsheetApp
    .getActiveSpreadsheet()
    .getSheetByName(SHEETS.SENDERS);

}

/**
 * Returns all active senders
 */
function getActiveSenders() {

  const data = getSendersSheet()
    .getDataRange()
    .getValues();

  const senders = [];

  for (let i = 1; i < data.length; i++) {

    if (String(data[i][3]).toUpperCase() == "ACTIVE")
      senders.push(data[i]);

  }

  return senders;

}

/**
 * Returns next sender using Round Robin
 */
function getNextSender() {

  const props = PropertiesService.getScriptProperties();

  let index = Number(props.getProperty("RR_INDEX") || 0);

  const senders = getActiveSenders();

  if (senders.length == 0)
    throw new Error("No active sender.");

  if (index >= senders.length)
    index = 0;

  const sender = senders[index];

  index++;

  if (index >= senders.length)
    index = 0;

  props.setProperty("RR_INDEX", index);

  return sender;

}
function testRoundRobin() {

  Logger.log(getNextSender());

  Logger.log(getNextSender());

  Logger.log(getNextSender());

}