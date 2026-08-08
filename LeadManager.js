/**
 * ==========================================================
 * AKSHARIFY MAILFLOW
 * LeadManager.gs
 * ==========================================================
 */

/**
 * Returns Leads sheet
 */
function getLeadsSheet() {

  return SpreadsheetApp
    .getActiveSpreadsheet()
    .getSheetByName(SHEETS.LEADS);

}

/**
 * Returns all lead data
 */
function getAllLeads() {

  const sheet = getLeadsSheet();

  const data = sheet.getDataRange().getValues();

  if (data.length <= 1)
    return [];

  return data.slice(1);

}
/**
 * Finds duplicate email
 */
function emailExists(email) {

  email = email.toString().trim().toLowerCase();

  const leads = getAllLeads();

  for (const row of leads) {

    if (!row[4])
      continue;

    if (
      row[4]
        .toString()
        .trim()
        .toLowerCase() === email
    )
      return true;

  }

  return false;

}
/**
 * Generates next Lead ID
 */
function generateLeadId() {

  const sheet = getLeadsSheet();

  const lastRow = sheet.getLastRow();

  if (lastRow <= 1)
    return "AKF000001";

  const lastId = sheet
    .getRange(lastRow,1)
    .getValue();

  const number = parseInt(
      lastId.replace("AKF",""),
      10
    ) + 1;

  return "AKF" +
    Utilities.formatString(
      "%06d",
      number
    );

}
/**
 * Adds one lead
 */
function addLead(

  firstName,
  lastName,
  company,
  email,
  website,
  country,
  industry

) {

  if (emailExists(email))
    throw new Error("Lead already exists.");

  const sheet = getLeadsSheet();

  sheet.appendRow([

    generateLeadId(),

    firstName,

    lastName,

    company,

    email,

    website,

    country,

    industry,

    "",

    "",

    "",

    STATUS.NEW,

    new Date(),

    "",

    0,      // Follow-up Count

    "",     // Next Follow-up Date

    "",     // Thread ID

    "",     // Reply Date

    ""      // Notes

  ]);

}
function testAddLead() {
  addLead(
    "John",
    "Doe",
    "ABC Ltd",
    "john@test.com",
    "https://abc.com",
    "USA",
    "Software"
  );
}