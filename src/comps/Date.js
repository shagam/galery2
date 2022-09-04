import {format} from "date-fns"

export function getDate() {
  const date = new Date();
  var formattedDate = format(date, "yyyy-MMM-dd HH:mm");
  return formattedDate;    
}
