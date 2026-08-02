// @ts-nocheck
/**
 * ==========================================================
 * AKSHARIFY MAILFLOW
 * Config.gs
 * Global configuration for the application.
 * ==========================================================
 */

const CONFIG = Object.freeze({

  // -----------------------------------------------------------------
  // General
  // -----------------------------------------------------------------
  APP_NAME: APP.NAME,
  VERSION: APP.VERSION,
  TIMEZONE: APP.TIMEZONE,

  // -----------------------------------------------------------------
  // Lead IDs
  // -----------------------------------------------------------------
  LEAD: {
    PREFIX: 'AKF',
    START_NUMBER: 1,
    DIGITS: 6
  },

  // -----------------------------------------------------------------
  // Assignment
  // -----------------------------------------------------------------
  ASSIGNMENT: {
    MODE: ASSIGNMENT.ROUND_ROBIN
  },

  // -----------------------------------------------------------------
  // Sending Window
  // -----------------------------------------------------------------
  SENDING: {

    START_TIME: '10:00',

    END_TIME: '17:00',

    DAILY_LIMIT_PER_SENDER: 40,

    RANDOM_DELAY_MIN: 90,

    RANDOM_DELAY_MAX: 180

  },

  // -----------------------------------------------------------------
  // Follow Ups
  // -----------------------------------------------------------------
  FOLLOWUP: {

    FIRST_AFTER_DAYS: 2,

    SECOND_AFTER_DAYS: 4,

    THIRD_AFTER_DAYS: 6,

    STOP_ON_REPLY: true

  },

  // -----------------------------------------------------------------
  // Dashboard
  // -----------------------------------------------------------------
  DASHBOARD: {

    SHOW_CHARTS: true,

    AUTO_REFRESH_MINUTES: 30

  },

  // -----------------------------------------------------------------
  // Logging
  // -----------------------------------------------------------------
  LOGGING: {

    ENABLED: true,

    MAX_ROWS: 10000

  }

});
/**
 * ==========================================================
 * Default Sender Profiles
 * ==========================================================
 */

const DEFAULT_SENDERS = Object.freeze([

  {

    id: "S1",

    name: "Aksharify Sales",

    email: "hello@aksharify.com",

    status: SENDER_STATUS.ACTIVE,

    dailyLimit: 40,

    timezone: APP.TIMEZONE,

    signature: "Regards,<br>Luv Sharma<br>Aksharify"

  },

  {

    id: "S2",

    name: "Saurabh Peswani",

    email: "saurabh@aksharify.com",

    status: SENDER_STATUS.ACTIVE,

    dailyLimit: 40,

    timezone: APP.TIMEZONE,

    signature: "Regards,<br>Saurabh Peswani<br>Aksharify"

  }

  ]);
/**
 * ==========================================================
 * Sheet Headers
 * ==========================================================
 */

const HEADERS = Object.freeze({

  LEADS: [

    "Lead ID",

    "First Name",

    "Last Name",

    "Company",

    "Email",

    "Website",

    "Country",

    "Industry",

    "Sender ID",

    "Assigned Sender",

    "Campaign",

    "Status",

    "Created Date",

    "Last Email Date",

    "Follow-up 1",

    "Follow-up 2",

    "Follow-up 3",

    "Reply Date",

    "Notes"

  ],

  SENDERS: [

    "ID",

    "Name",

    "Email",

    "Status",

    "Daily Limit",

    "Timezone",

    "Signature"

  ],

  CAMPAIGNS: [

    "Campaign ID",

    "Campaign Name",

    "Template",

    "Status",

    "Start Date",

    "End Date"

  ],

  SETTINGS: [

    "Key",

    "Value"

  ],

  LOGS: [
  "Timestamp",
  "Level",
  "Module",
  "Action",
  "Details"
],

TEMPLATES: [
  "Template ID",
  "Template Name",
  "Subject",
  "Body",
  "Created"
],

STATS: [
  "Metric",
  "Value"
]

});