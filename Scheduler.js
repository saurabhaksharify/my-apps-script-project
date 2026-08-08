/**
 * ==========================================================
 * Scheduler.gs
 * ==========================================================
 */

function runScheduler() {

  checkReplies();

  runMailFlow();

  processFollowups();

}