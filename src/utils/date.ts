
function inHours (d1: Date, d2: Date) {
  const hours = Math.abs(d1.getTime() - d2.getTime()) / 36e5;
  if(Math.round(hours) > 23){
    return inDays(d1,d2);
  }
  return {date: Math.round(hours), text: 'hours'};
};

function inDays (d1: Date, d2: Date) {
  let t2 = d2.getTime();
  let t1 = d1.getTime();

  if(Math.floor((t2-t1)/(24*3600*1000)) > 30){
    return inWeeks(d1,d2);
  }

  return {date: Math.floor((t2 - t1) / (24 * 3600 * 1000)), text: 'days'};
};

function inWeeks (d1: Date, d2: Date) {
  let t2: number = d2.getTime();
  let t1: number = d1.getTime();

  if(parseInt(String((t2 - t1) / (24 * 3600 * 1000 * 7))) > 3){
    return inMonths(d1,d2);
  }

  return {date: parseInt(String((t2 - t1) / (24 * 3600 * 1000 * 7))), text: 'weeks'};
};

function inMonths (d1: Date, d2: Date) {
  let d1Y = d1.getFullYear();
  let d2Y = d2.getFullYear();
  let d1M = d1.getMonth();
  let d2M = d2.getMonth();

  if((d2M+12*d2Y)-(d1M+12*d1Y) > 11){
    return inYears(d1,d2);
  }

  return {date: (d2M+12*d2Y)-(d1M+12*d1Y), text: 'months'};
};

function inYears (d1: Date, d2: Date) {
  return {date: d2.getFullYear() - d1.getFullYear(), text: 'years'};
};

export function getDateDifference(d1: Date, d2: Date) {
  let dateDifference = inHours(d1,d2);

  return dateDifference;
}