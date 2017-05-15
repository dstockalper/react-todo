var moment = require('moment');

console.log(moment().format());

// Unix Epoch: Jan 1st 1970 @ 12:00am
// Timestamp will always be number of seconds from the Unix Epoch (independent of time zone)

var now = moment();
console.log('current timestamp', now.unix());

var timestamp = 1494817628;
var currentMoment = moment.unix(timestamp);
console.log('current moment', currentMoment.format('MMM D, YY @ h:mm a'));

console.log('current moment', currentMoment.format('MMMM Do, YYYY @ h:mm A'));
