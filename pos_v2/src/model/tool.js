function Tool() {
    this.dateDigitToString = function(num) {
        return num < 10 ? '0' + num : num;
    };
    this.print_the_time = function() {
        var formattedDateString;
        var currentDate = new Date(),
            year = this.dateDigitToString(currentDate.getFullYear()),
            month = this.dateDigitToString(currentDate.getMonth() + 1),
            date = this.dateDigitToString(currentDate.getDate()),
            hour = this.dateDigitToString(currentDate.getHours()),
            minute = this.dateDigitToString(currentDate.getMinutes()),
            second = this.dateDigitToString(currentDate.getSeconds()),
            formattedDateString = year + '年' + month + '月' + date + '日 ' + hour + ':' + minute + ':' + second;
        return formattedDateString;
    }
}
