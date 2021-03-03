const moment = require('moment');

module.exports = {
  format_date: date => {
    let now  = moment();
    let diff = moment(now,"DD/MM/YYYY HH:mm:ss").diff(moment(date,"DD/MM/YYYY HH:mm:ss"));
    let duration = moment.duration(diff);
    let timeLaps = Math.floor(duration.asHours()) + 'h';

    return `${timeLaps}`;
  },
  ifEquals: function(arg1, arg2, options) {
    return (arg1 == arg2) ? options.fn(this) : options.inverse(this);
  },
  titleCase: function(str) {
    return str.toLowerCase().split(' ').map(function(word) {
      return word.replace(word[0], word[0].toUpperCase());
    }).join(' ');
  }
};
