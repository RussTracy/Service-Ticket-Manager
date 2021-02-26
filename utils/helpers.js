const moment = require('moment');

module.exports = {
  format_date: date => {
    let now  = moment();
    let diff = moment(now,"DD/MM/YYYY HH:mm:ss").diff(moment(date,"DD/MM/YYYY HH:mm:ss"));
    let duration = moment.duration(diff);
    let timeLaps = Math.floor(duration.asHours()) + 'h';

    return `${timeLaps}`;
  }
};
