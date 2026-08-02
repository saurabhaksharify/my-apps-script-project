function initializeSystem() {

  try {

    const ss = SpreadsheetApp.getActiveSpreadsheet();

    ss.toast(
      "Initializing Aksharify MailFlow...",
      APP.NAME,
      5
    );

    createRequiredSheets();
    setupHeaders();
    seedSettings();
    seedSenders();
    formatWorkbook();
    initializeDashboard();

    ss.toast(
      "Initialization completed successfully.",
      APP.NAME,
      5
    );

    // Show alert only when UI is available
    try {
      SpreadsheetApp.getUi().alert(
        "✅ Aksharify MailFlow has been initialized successfully."
      );
    } catch (e) {
      Logger.log("UI alert skipped.");
    }

  } catch (err) {

    Logger.log(err);

    try {
      SpreadsheetApp.getUi().alert(
        "Initialization Failed\n\n" + err
      );
    } catch (e) {
      Logger.log("UI unavailable.");
    }

    throw err;
  }

}