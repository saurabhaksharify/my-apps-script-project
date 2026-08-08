/**
 * ==========================================================
 * AKSHARIFY MAILFLOW
 * Constants.gs
 * Global constants used across the application.
 * ==========================================================
 */

const APP = Object.freeze({
  NAME: 'Aksharify MailFlow',
  VERSION: '1.0.0',
  TIMEZONE: 'Asia/Kolkata'
});

const SHEETS = Object.freeze({
  DASHBOARD: 'Dashboard',
  LEADS: 'Leads',
  CAMPAIGNS: 'Campaigns',
  TEMPLATES: 'Templates',
  SETTINGS: 'Settings',
  SENDERS: 'Senders',
  LOGS: 'Logs',
  STATS: 'Stats'
});

const STATUS = Object.freeze({

  NEW: 'NEW',

  QUEUED: 'QUEUED',

  SENT: 'SENT',

  FOLLOWUP_PENDING: 'FOLLOWUP_PENDING',

  FOLLOWUP_SENT: 'FOLLOWUP_SENT',

  REPLIED: 'REPLIED',

  FAILED: 'FAILED',

  BOUNCED: 'BOUNCED',

  UNSUBSCRIBED: 'UNSUBSCRIBED',

  DO_NOT_CONTACT: 'DO_NOT_CONTACT'

});

const LOGLEVEL = Object.freeze({
  INFO: 'INFO',
  WARNING: 'WARNING',
  ERROR: 'ERROR'
});

const CAMPAIGN_STATUS = Object.freeze({
  ACTIVE: 'ACTIVE',
  PAUSED: 'PAUSED',
  COMPLETED: 'COMPLETED'
});
/**
 * Sender Types
 */
const SENDER_STATUS = Object.freeze({
  ACTIVE: 'ACTIVE',
  INACTIVE: 'INACTIVE'
});

/**
 * Lead Assignment
 */
const ASSIGNMENT = Object.freeze({
  ROUND_ROBIN: 'ROUND_ROBIN',
  MANUAL: 'MANUAL'
});