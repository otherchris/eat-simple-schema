import SimpleSchema from '../../SimpleSchema';
import sinon from 'sinon';

const SchemaHelper = {
  cleanUrl() {},
  _id() {},
  created() {},
  updated() {},
}

const Enums = {
  OrderLines: {
    notificationTypes: {
      values: () => {},
      options: () => {},
    },
    statuses: {
      values: () => {},
      options: () => {},
    },
    targetTypes: {
      values: () => {},
      options: () => {},
    },
    creativeTypes: {
      values: () => {},
      options: () => {},
    },
    notificationMethods: {
      values: () => {},
      options: () => {},
    },
    deployTargets: {
      values: () => {},
      options: () => {},
    }
  }
};
export const OrderLineCreativeSchema = new SimpleSchema({
  _id: {
    type: String,
    label: 'Creative ID',
  },
});

export const OrderLineLandingPageSchema = new SimpleSchema({
  _id: SchemaHelper._id(),
  url: {
    type: String,
    regEx: SimpleSchema.RegEx.Url,
    label: 'Clickthrough URL',
    optional: true,
  },
  thumb: {
    type: String,
    regEx: SimpleSchema.RegEx.Url,
    label: 'Thumbnail for Clickthrough URL',
    optional: true,
  },
  urlHash: {
    type: String,
    label: 'Url hash (should we update the thumb?)',
    optional: true,
  },
  creatives: {
    type: [OrderLineCreativeSchema],
    optional: true,
  },
});

// reviews / approvals log
export const OrderLineReviewsSchema = new SimpleSchema({
  _id: SchemaHelper._id(),
  created: SchemaHelper.created(),
  userId: {
    type: String,
    optional: true,
  },
  orgId: {
    type: String,
    optional: true,
  },
  submitted: {
    label: 'Initial Submit for Review',
    type: Boolean,
    optional: true,
  },
  approved: {
    label: 'Approved for Org',
    type: Boolean,
    optional: true,
  },
  message: {
    label: 'Optional Message',
    type: String,
    optional: true,
  },
});

// target deployment vendor/endpoint & info
export const OrderLineDeploySchema = new SimpleSchema({
  _id: SchemaHelper._id(),
  name: {
    type: Number,
    label: 'Deployment Target / Vendor',
    allowedValues: Enums.OrderLines.deployTargets.values(),
  },
  percent: {
    type: Number,
    label: 'Traffic Percent to Target',
    defaultValue: 100,
  },
  info: {
    type: Object,
    label: 'Deployment Info from Vendor/API',
    hidden: true,
    denyUpdateUser: true,
    blackbox: true,
    optional: true,
  },
});

// basic rollup stats for OrderLine
export let OrderLineStatsSchema = new SimpleSchema({
  servedImpressions: {
    type: Number,
    defaultValue: 0,
  },
  servedRate: {
    type: Number,
    decimal: true,
    defaultValue: 0,
  },
  totalTargets: {
    // set by BucketConf -> Buckets
    type: Number,
    defaultValue: 0,
    label: 'Total Targets',
  },
  matchedTargets: {
    // set by BucketConf -> Buckets
    type: Number,
    defaultValue: 0,
    label: 'Total Matches',
  },
  matchRate: {
    // set by BucketConf -> Buckets
    type: Number,
    optional: true,
    label: 'Match Rate',
  },
  // simple unrolled calc number, but convenient to unroll and save
  durationDays: {
    type: Number,
    decimal: true,
    optional: true,
    label: 'Duration in Days',
  },
});

// Reducer = limit the OrderLines targets by filters
export const OrderLineReducerSchema = new SimpleSchema({
  environmental: {
    label: 'Enable only when environmental conditions match',
    type: Object,
    blackbox: true,
    optional: true,
  },
  'environmental.on': {
    label: 'Evironmental enabled',
    type: Boolean,
    optional: true,
  },
  'environmental.zip': {
    label: 'Evironmental conditions in this zip code',
    type: String,
    optional: true,
  },
  'environmental.codes': {
    label: 'Environmental Conditions during which to serve',
    type: [String],
    optional: true,
    // allowedValues: Enums.OrderLines.environmentalCodes.values(),
  },
  daypart: {
    label: 'Enable only when the target\'s time-of-day matches',
    type: Object,
    blackbox: true,
    optional: true,
  },
  'daypart.on': {
    label: 'Daypart enabled',
    type: Boolean,
    optional: true,
  },
  'daypart.week': {
    label: 'Weekly grid of daypart priorities',
    type: [[Number]],
    optional: true,
  },
  feeds: {
    label: 'Enable only for target\'s from the selected feeds',
    type: Object,
    optional: true,
  },
  'feeds.on': {
    label: 'Feeds enabled',
    type: Boolean,
    optional: true,
  },
  'feeds.ids': {
    label: 'Feeds IDs',
    type: [String],
    optional: true,
  },
});

export let OrderLineNotificationSchema = new SimpleSchema({
  userId: {
    label: 'User who should be notified',
    type: String,
    optional: true,
  },
  email: {
    label: 'Notify by sending an email to this address',
    type: String,
    regEx: SimpleSchema.RegEx.Email,
    optional: true,
  },
  type: {
    type: Number,
    defaultValue: 2,
    optional: true,
    allowedValues: Enums.OrderLines.notificationTypes.values(),
    uniforms: {
      options: Enums.OrderLines.notificationTypes.options(),
    },
  },
  method: {
    type: Number,
    defaultValue: 2,
    optional: true,
    allowedValues: Enums.OrderLines.notificationMethods.values(),
    uniforms: {
      options: Enums.OrderLines.notificationMethods.options(),
    },
  },
});

export let OrderLinesSchema = new SimpleSchema({
  _id: SchemaHelper._id(),
  created: SchemaHelper.created(),
  updated: SchemaHelper.updated(),
  start: {
    type: Date,
    label: 'Start',
    optional: true,
  },
  stop: {
    type: Date,
    label: 'Stop',
    optional: true,
  },
  name: {
    type: String,
    min: 1,
    max: 32,
    index: true,
  },
  refId: {
    label: 'Reference ID',
    type: String,
    index: true,
    optional: true,
    max: 64,
  },
  creativeType: {
    type: Number,
    defaultValue: 1,
    allowedValues: Enums.OrderLines.creativeTypes.values(),
    uniforms: {
      options: Enums.OrderLines.creativeTypes.options(),
    },
    optional: true,
  },
  targetType: {
    type: Number,
    defaultValue: 1,
    allowedValues: Enums.OrderLines.targetTypes.values(),
    uniforms: {
      options: Enums.OrderLines.targetTypes.options(),
    },
    optional: true,
  },
  status: {
    type: Number,
    optional: true,
    // defaultValue: 1,
    allowedValues: Enums.OrderLines.statuses.values(),
  },
  orgId: {
    type: String,
    optional: true,
    index: true,
  },
  orgIdParents: {
    type: [String],
    optional: true,
    index: true,
  },
  orgIdToReview: {
    type: String,
    optional: true,
    index: true,
  },
  cpm: {
    // set by AdOps & calculations
    type: Number,
    decimal: true,
    optional: true,
    min: 5,
    max: 50,
    defaultValue: 20,
    label: 'Cost per mil',
  },
  totalImpressions: {
    // set by User
    type: Number,
    optional: true,
    min: 500,
    defaultValue: 2000,
    label: 'Total Impressions',
  },
  frequencyCapPerPeriod: {
    // set by User
    type: Number,
    optional: true,
    min: 0,
    defaultValue: 40,
    label: 'Frequency Cap / Day',
  },
  cost: {
    type: Number,
    decimal: true,
    optional: true,
    label: 'Estimated Cost',
  },
  campaignId: {
    // NOTE we may auto-create a Campaigns...?
    type: String,
    index: true,
  },
  userIds: {
    // Array of user IDs who have edited this OrderLine
    type: [String],
    optional: true,
  },
  /* NOTE: switched to BucketConf.orderLineId -- hasOne relationship
  buckets: {
    // Array of bucket IDs for this OrderLine
    //   config & inputs & output
    type: [String],
    optional: true
  },
  */
  landingPages: {
    type: [OrderLineLandingPageSchema],
    optional: true,
  },
  thumb: {
    type: String,
    regEx: SimpleSchema.RegEx.Url,
    label: 'Thumbnail image for OrderLine',
    // set automatically by hook, first-set & ready Creative
    optional: true,
  },
  reducers: {
    type: OrderLineReducerSchema,
    optional: true,
  },
  errors: {
    type: [Object],
    optional: true,
    blackbox: true,
  },
  reviews: {
    type: [OrderLineReviewsSchema],
    optional: true,
  },
  deploys: {
    type: [OrderLineDeploySchema],
    optional: true,
  },
  stats: {
    type: OrderLineStatsSchema,
    optional: true,
  },
  notifications: {
    // Array of Config with userId or email address for anyone who should be notified
    type: [OrderLineNotificationSchema],
    optional: true,
  },

});
