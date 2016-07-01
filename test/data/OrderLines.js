//
//import SEnum from 's-enum';
const SEnum = () => {};
export const creativeTypes = SEnum([
  {
    value: 1,
    key: 'banner',
    label: 'Banner',
    desc: 'Serve static or animated banner ads.',
    icon: 'fa fa-file-image-o',
  },
  {
    value: 2,
    key: 'video',
    label: 'Video',
    desc: 'We serve videos',
    icon: 'fa fa-file-video-o',
  },
  /*
  {
    value: 2,
    label: 'Ip Targeting - Other',
    desc: 'We serve custom html content to a list of IPs',
    icon: 'fa fa-file-code-o',
  },
  {
    value: 11,
    label: 'B2C Segment Only',
    desc: '???',
    icon: 'fa fa-list-alt'
  },
  {
    value: 12,
    label: 'Retargeting',
    desc: '???',
    icon: 'fa fa-list-alt'
  },
  {
    value: 13,
    label: 'Captive Audience',
    desc: '???',
    icon: 'fa fa-list-alt'
  },
  {
    value: 14,
    label: 'Segment Sharing',
    desc: '???',
    icon: 'fa fa-list-alt'
  },
  {
    value: 15,
    label: 'IP Segment ONLY',
    desc: '???',
    icon: 'fa fa-list-alt',
    roles: ['admin', 'adops']
  },
  {
    value: 16,
    label: 'Logging ONLY',
    desc: '???',
    icon: 'fa fa-list-alt',
    roles: ['admin', 'adops']
  }
  */
]);

export const targetTypes = SEnum([
  {
    value: 1,
    key: 'b2c',
    label: 'B2C', // Address to IP
    desc: 'Business to Consumer - street addresses are matched to IP addresses',
    icon: 'fa fa-home',
    minMatch: 300, // required target matches
    allowMapPoly: true,
    allowBucketUploads: true,
    allowBucketTypes: [
      10, //  'Unprocessed Uploaded File'
      11, //  'IP list'
      12, //  'address to IP'
      13, //  'zip to IP'
      21, //  'Polygon to IP'
      22, //  'Point & Radius'
    ],
  },
  {
    value: 2,
    key: 'b2b',
    label: 'B2B', // Address to IP
    desc: 'Business to Business - street addresses are matched to IP addresses',
    icon: 'fa fa-home',
    minMatch: 300, // required target matches
    allowBucketUploads: true,
    allowBucketTypes: [
      10, //  'Unprocessed Uploaded File'
      11, //  'IP list'
      12, //  'address to IP'
      13, //  'zip to IP'
      21, //  'Polygon to IP'
      22, //  'Point & Radius'
    ],
  },
  {
    value: 3,
    key: 'mover',
    label: 'Mover', // (Pre/Post/Escrow)
    desc: 'Target those who have recently moved',
    icon: 'fa fa-suitcase',
    minMatch: 300, // required target matches
    allowMoverPicker: true,
    allowBucketTypes: [
      31, //  'Digital Post Mover IP list, dynamic'
      32, //  'Digital Pre Mover IP list, dynamic'
      33, //  'Digital Pre Mover In Escrow IP list, dynamic'
    ],
  },
  /* ???
  {
    value: 7,
    key: 'mover',
    label: 'IP List',
    desc: 'Target IPs',
    icon: 'fa fa-home',
    minMatch: 5,
  },
  */
  {
    value: 8,
    key: 'captive',
    label: 'Captive Audience',
    desc: 'Target of captive audiences',
    icon: 'fa fa-eye',
    minMatch: 0,
    allowCaptivePicker: true,
    allowBucketTypes: [
      81, //  'Captive Audience'
    ],
  },
  {
    value: 9,
    key: 'retargeting_cookie',
    label: 'Retargeting', //  (via cookie)
    desc: 'Cookie based targeting - pixels set cookies, target those cookies',
    icon: 'fa fa-tty',
    minMatch: 0,
    allowRetargetingConfig: true,
    allowBucketTypes: [
      98, //  'Retargeting (via cookie)'
    ],
  },
]);

/**
 * Phases:
 *   edit, review, deploy, serving, paused,
 *   serving-edit, serving-review, serving-deploy,
 *   paused-edit, paused-review, paused-deploy,
 *
 *
 */

export const statuses = SEnum([
  {
    value: 0,
    label: 'Unknown',
    desc: 'Configuration in Progress',
    icon: 'fa fa-question',
    phase: 'edit',
    editable: true,
  },
  {
    value: 1,
    label: 'Open',
    desc: 'Configuration in Progress',
    icon: 'fa fa-pause-circle',
    phase: 'edit',
    editable: true,
  },
  {
    value: 5,
    label: 'Ready',
    desc: 'Configuration Complete',
    icon: 'fa fa-play-circle',
    phase: 'edit',
    editable: true,
    submittable: true,
  },
  {
    value: 6,
    label: 'Rejected',
    desc: 'Configuration Required - Review Rejected',
    icon: 'fa fa-question',
    phase: 'edit',
    editable: true,
  },
  {
    value: 7,
    label: 'Validating',
    desc: 'Submitted for Review - to Agency', // Someone with an MSA
    // If orderLine is for an Org w/ El Toro MSA, skip this and go to #7
    icon: 'fa fa-check-circle-o',
    phase: 'review',
    submittable: true,
    reviewable: true,
    reeditabled: true,
  },
  {
    value: 8,
    label: 'Validating',
    desc: 'Submitted for Review - to AdOps', // @ El Toro
    icon: 'fa fa-check-circle-o',
    phase: 'review',
    reviewable: true,
    reeditabled: true,
  },
  // deploy (in progress)
  {
    value: 10,
    label: 'Approved - Pending',
    desc: 'Approved, Waiting to Deploy',
    icon: 'fa fa-pause-circle',
    phase: 'deploy',
    deployable: true,
    reeditabled: true,
  },
  {
    value: 11,
    label: 'Deploy',
    desc: 'Approved, Deploy Submitting',
    icon: 'fa fa-check-circle-o',
    phase: 'deploy',
    locked: true,
  },
  {
    value: 12,
    label: 'Deploying',
    desc: 'Approved, Deploying',
    icon: 'fa fa-check-circle-o',
    phase: 'deploy',
    locked: true,
  },
  // serving = deployed
  {
    value: 20,
    label: 'Deployed',
    desc: 'Deployed to bidding systems',
    icon: 'fa fa-calendar-check-o',
    phase: 'serving',
    active: true,
    reeditabled: true,
  },
  {
    value: 25,
    label: 'Paused - Not Serving', // user hit pause
    desc: 'Deployed to bidding systems, but Paused.',
    icon: 'fa fa-calendar-check-o',
    phase: 'paused',
    serving: false,
    reeditabled: true,
  },
  {
    value: 26,
    label: 'Deployed', // paused invisibly
    desc: 'Deployed to bidding systems',
    icon: 'fa fa-calendar-check-o',
    phase: 'paused',
    serving: false,
    reeditabled: true,
  },
  // serving: edit, review, deploy --> deployed
  {
    value: 31,
    label: 'Deployed but Editing - Still Serving',
    desc: 'Deployed to bidding systems, but Editing again.  Last deployed version still serving.',
    icon: 'fa fa-calendar-check-o',
    phase: 'serving-edit',
    editable: true,
    submittable: true,
    serving: true,
  },
  {
    value: 32,
    label: 'Deployed but Reviewing Changed - Still Serving',
    desc: 'Deployed to bidding systems, but Edited, Reviewing again.  Last deployed version still serving.',
    icon: 'fa fa-calendar-check-o',
    phase: 'serving-review',
    serving: true,
    reviewable: true,
  },
  {
    value: 38,
    label: 'Deployed but Changed Version Deploy - Still Serving',
    desc: 'Deployed to bidding systems, but Editing again.  Last deployed version still serving.',
    icon: 'fa fa-calendar-check-o',
    phase: 'serving-deploy',
    locked: true,
  },
  {
    value: 39,
    label: 'Deployed but Changed Version Deploying - Still Serving',
    desc: 'Deployed to bidding systems, but Editing again.  Last deployed version still serving.',
    icon: 'fa fa-calendar-check-o',
    phase: 'serving-deploy',
    locked: true,
  },
  // paused: edit, review, deploy --> deployed
  {
    value: 41,
    label: 'Deployed but Editing - Paused',
    desc: 'Deployed to bidding systems, but Editing again.  Last deployed version not serving.',
    icon: 'fa fa-calendar-check-o',
    phase: 'paused-edit',
    paused: true,
    editable: true,
    submittable: true,
  },
  {
    value: 42,
    label: 'Deployed but Reviewing Changed - Paused',
    desc: 'Deployed to bidding systems, but Edited, Reviewing again.  Last deployed version not serving.',
    icon: 'fa fa-calendar-check-o',
    phase: 'paused-review',
    paused: true,
    reviewable: true,
  },
  {
    value: 48,
    label: 'Deployed but Changed Version Deploy - Paused',
    desc: 'Deployed to bidding systems, but Editing again.  Last deployed version not serving.',
    icon: 'fa fa-calendar-check-o',
    phase: 'paused-deploy',
    locked: true,
  },
  {
    value: 49,
    label: 'Deployed but Changed Version Deploying - Paused',
    desc: 'Deployed to bidding systems, but Editing again.  Last deployed version not serving.',
    icon: 'fa fa-calendar-check-o',
    phase: 'paused-deploy',
    locked: true,
  },
  // Canceled / Removed / Deleted
  {
    value: 98,
    label: 'Canceled',
    desc: 'Canceled before completion',
    locked: true,
    icon: 'fa fa-ban',
  },
  {
    value: 99,
    label: 'Disabled',
    desc: 'Flight dates over',
    locked: true,
    icon: 'fa fa-remove',
  },
]);

export const deployTargets = SEnum([
  {
    value: 1,
    label: 'El Toro',
    desc: 'Bidder ala Ben',
    icon: 'fa fa-check',
  },
  {
    value: 2,
    label: 'AppNexus',
    desc: 'AppNexus',
    icon: 'fa fa-check',
  },
  {
    value: 3,
    label: 'BrightRoll',
    desc: 'BrightRoll',
    icon: 'fa fa-check',
  },
]);

// environmental for reducers
export const environmentalCodes = SEnum([
  {
    value: 0,
    label: 'Sunny / Clear',
    icon: 'wi wi-day-sunny',
    weatherUnlockedCodes: [1],
  },
  {
    value: 1,
    label: 'Cloudy skies',
    icon: 'wi wi-cloudy',
    weatherUnlockedCodes: [1, 2, 3],
  },
  {
    value: 10,
    label: 'Mist / Fog',
    icon: 'wi wi-fog',
    weatherUnlockedCodes: [10, 45],
  },

  {
    value: 21,
    label: 'Light rain',
    icon: 'wi wi-showers',
    weatherUnlockedCodes: [21, ],
    light: true,
  },
  {
    value: 23,
    label: 'Sleet',
    icon: 'wi wi-sleet',
    weatherUnlockedCodes: [23, 24,  ],
  },
  {
    value: 22,
    label: 'Light snow',
    icon: 'wi wi-snow-wind',
    weatherUnlockedCodes: [22, ],
    light: true,
  },
  {
    value: 29,
    label: 'Thunderstorm',
    icon: 'wi wi-thunderstorm',
    weatherUnlockedCodes: [29, 91, 92, 93, 94],
    heavy: true,
    thunder: true,
  },
  {
    value: 38,
    label: 'Blizzard',
    icon: 'wi wi-night-snow-thunderstorm',
    weatherUnlockedCodes: [38, 39],
    heavy: true,
  },
  {
    value: 120,
    label: 'Hurricane',
    icon: 'wi wi-hurricane',
  },
  {
    value: 122,
    label: 'Tornado',
    icon: 'wi wi-tornado',
  },
  {
    value: 123,
    label: 'Flood',
    icon: 'wi wi-flood',
  },
  {
    value: 128,
    label: 'Earthquake',
    icon: 'wi wi-earthquake',
  },
]);
// TODO map environmentalCodes to weatherUnlockedCodes
// Weather Codes
// https://developer.weatherunlocked.com/documentation/weathertrigger/resources#descriptions
export const weatherUnlockedCodes = SEnum({
  0: 'Sunny skies/Clear skies',
  1: 'Partly cloudy skies',
  2: 'Cloudy skies',
  3: 'Overcast skies',
  10: 'Mist',
  21: 'Patchy rain possible',
  22: 'Patchy snow possible',
  23: 'Patchy sleet possible',
  24: 'Patchy freezing drizzle possible',
  29: 'Thundery outbreaks possible',
  38: 'Blowing snow',
  39: 'Blizzard',
  45: 'Fog',
  49: 'Freezing fog',
  50: 'Patchy light drizzle',
  51: 'Light drizzle',
  56: 'Freezing drizzle',
  57: 'Heavy freezing drizzle',
  60: 'Patchy light rain',
  61: 'Light rain',
  62: 'Moderate rain at times',
  63: 'Moderate rain',
  64: 'Heavy rain at times',
  65: 'Heavy rain',
  66: 'Light freezing rain',
  67: 'Moderate or heavy freezing rain',
  68: 'Light sleet',
  69: 'Moderate or heavy sleet',
  70: 'Patchy light snow',
  71: 'Light snow',
  72: 'Patchy moderate snow',
  73: 'Moderate snow',
  74: 'Patchy heavy snow',
  75: 'Heavy snow',
  79: 'Ice pellets',
  80: 'Light rain shower',
  81: 'Moderate or heavy rain shower',
  82: 'Torrential rain shower',
  83: 'Light sleet showers',
  84: 'Moderate or heavy sleet showers',
  85: 'Light snow showers',
  86: 'Moderate or heavy snow showers',
  87: 'Light showers of ice pellets',
  88: 'Moderate or heavy showers of ice pellets',
  91: 'Patchy light rain with thunder',
  92: 'Moderate or heavy rain with thunder',
  93: 'Patchy light snow with thunder',
  94: 'Moderate or heavy snow with thunder',
});

export let notificationTypes = SEnum([
  {
    value: 0,
    label: 'Never',
  },
  {
    value: 1,
    label: 'On any change in status',
  },
  {
    value: 2,
    label: 'On critical changes in status',
    desc: 'On Quote, Deploy, Enable, Disable, Complete',
  },
  {
    value: 9,
    label: 'Only when complete',
    desc: 'When status changes to Complete',
  },
]);

export let notificationMethods = SEnum([
  {
    value: 0,
    label: 'None',
  },
  {
    value: 1,
    label: 'Email',
  },
  {
    value: 2,
    label: 'Slack',
    desc: 'A Slack url and Username needs to be configured on the User profile',
  },
  {
    value: 9,
    label: 'Callback POST',
    desc: 'An API Callback URL needs to be configured on the Organization/Company',
  },
]);

