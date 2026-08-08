/**
 * ==========================================================
 * AKSHARIFY MAILFLOW
 * Menu.gs
 * ==========================================================
 */

function onOpen() {

  SpreadsheetApp.getUi()

    .createMenu("MailFlow")

    .addItem(
      "Run Scheduler",
      "runScheduler"
    )

    .addItem(
      "Refresh Dashboard",
      "refreshDashboard"
    )

    .addSeparator()

    .addItem(
      "Check Replies",
      "checkReplies"
    )

    .addToUi();

}