/**
 * ==========================================================
 * AKSHARIFY MAILFLOW
 * Menu.gs
 * ==========================================================
 */

function onOpen() {

  SpreadsheetApp.getUi()

    .createMenu("Aksharify MailFlow")

    .addItem("Initialize System", "initializeSystem")

    .addSeparator()

    .addItem("Dashboard", "goToDashboard")

    .addSeparator()

    .addItem("Settings", "goToSettings")

    .addToUi();

}