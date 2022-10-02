module.exports.convertTimeFormat = function(from, format) {

    const [hours, mins] = from.split(':');
    if(format === 'hh:mm') {
        if(parseInt(hours) > 12) 
            return `${(parseInt(hours) - 12).toString().padStart(2,"0")}:${mins} pm`
        else 
        return `${from} am` 
    } else {
        //HH mm
        return from;
    }
}

module.exports.getFormattedDateTime = function (date, format) {

  if (!format) {
      format="MM-dd-yyyy";               

    var month = date.getMonth() + 1;

    var year = date.getFullYear();    

    format = format.replace("MM",month.toString().padStart(2,"0"));        

    if (format.indexOf("yyyy") > -1)

        format = format.replace("yyyy",year.toString());

    else if (format.indexOf("yy") > -1)

        format = format.replace("yy",year.toString().substr(2,2));


    format = format.replace("dd", date.getDate().toString().padStart(2,"0"));
   } else {
       format = (format === "hh:mm") ? "hh:mm t": "HH:mm";
       
       var hours = date.getHours();       

       if (format.indexOf("t") > -1)
     
       {
     
          if (hours > 11)
     
           format = format.replace("t","pm")
     
          else
     
           format = format.replace("t","am")
     
       }
     
       if (format.indexOf("HH") > -1)
     
           format = format.replace("HH",hours.toString().padStart(2,"0"));
     
       if (format.indexOf("hh") > -1) {
     
           if (hours > 12) hours -= 12;
     
           if (hours == 0) hours = 12;
     
           format = format.replace("hh",hours.toString().padStart(2,"0"));        
     
       }
     
       if (format.indexOf("mm") > -1)
     
          format = format.replace("mm",date.getMinutes().toString().padStart(2,"0"));
     
       if (format.indexOf("ss") > -1)
       format = format.replace("ss",date.getSeconds().toString().padStart(2,"0"));
     
   }

  return format;

}

module.exports.getLastDateOf = function(month, year) {
    // var date = new Date();
    // var firstDay = new Date(y, m, 1);
    var lastDay = new Date(year, month + 1, 0);
    return lastDay;
}

module.exports.getDatesForMonth = function(month, year) {

    const arr = [];

    const maxDate = new Date(year, month, 0).getDate();
    for (let date = 1; date < maxDate + 1; date++) {
        arr.push({
            "date": `${(month).toString().padStart(2,"0")}-${date.toString().padStart(2,"0")}-${year}`
        })
    }

    return arr;
    // [
    //     {"date": "01-12-2020"},
    //     {"date": "02-12-2020"}
    // ]
}

module.exports.isDateInGivenMonthRange = function(date, month, year) {
    const reqM = new Date(date).getMonth();
    const reqY = new Date(date).getFullYear();

    if(reqY === year && reqM === month) return true;

    return false;
}
