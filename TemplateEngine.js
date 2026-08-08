/**
 * ==========================================================
 * AKSHARIFY MAILFLOW
 * TemplateEngine.gs
 * ==========================================================
 */

/**
 * Returns template by Template ID
 */
function getTemplateById(templateId) {

  const sheet = SpreadsheetApp
    .getActiveSpreadsheet()
    .getSheetByName(SHEETS.TEMPLATES);

  const data = sheet.getDataRange().getValues();

  if (data.length <= 1)
    return null;

  for (let i = 1; i < data.length; i++) {

    if (data[i][0] == templateId)
      return data[i];

  }

  return null;

}

/**
 * Returns a random INITIAL template
 */
function getInitialTemplate(campaignId) {

  return getTemplate(campaignId, "INITIAL", true);

}
/**
 * Returns follow-up template
 */
function getFollowupTemplate(campaignId, count) {

  return getTemplate(
    campaignId,
    "FOLLOWUP_" + count,
    false
  );

}
/**
 * Internal template selector
 */
function getTemplate(campaignId, stage, randomPick) {

  const sheet = getTemplatesSheet();

  const data = sheet.getDataRange().getValues();

  const templates = [];

  for (let i = 1; i < data.length; i++) {

    if (
      data[i][1] == campaignId &&
      data[i][2] == stage &&
      String(data[i][5]).toUpperCase() == "TRUE"
    ) {

      templates.push(data[i]);

    }

  }

  if (templates.length == 0)
    return null;

  if (!randomPick)
    return templates[0];

  return templates[
    Math.floor(Math.random() * templates.length)
  ];

}
function getTemplatesSheet() {

  return SpreadsheetApp
    .getActiveSpreadsheet()
    .getSheetByName(SHEETS.TEMPLATES);

}
/**
 * Personalises Subject & Body
 */
function renderTemplate(template, lead) {

  return {

    subject: replaceVariables(template[3], lead),

    body: replaceVariables(template[4], lead)
      .replace(/\r?\n/g, "<br>")

  };

}

/**
 * Replace merge fields
 */
function replaceVariables(text, lead) {

  if (!text)
    return "";

  return text

    .replace(/{{FirstName}}/g, lead[1] || "")

    .replace(/{{LastName}}/g, lead[2] || "")

    .replace(/{{Company}}/g, lead[3] || "")

    .replace(/{{Email}}/g, lead[4] || "")

    .replace(/{{Website}}/g, lead[5] || "")

    .replace(/{{Country}}/g, lead[6] || "")

    .replace(/{{Industry}}/g, lead[7] || "");

}