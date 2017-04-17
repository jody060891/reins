angular.module('PKBL')
    .filter('momentDateFilter', function () {
        return function (input, format) {
            if (input == null) { return ""; }

            format = format || "DD/MM/YYYY";

            var _date = moment(input).format(format);

            return _date;
        };
    }).filter('momentTimeFilter', function () {
        return function (input, format) {
            if (input == null) { return ""; }

            format = format || "HH:mm";

            var _date = moment(input).format(format);

            return _date;
        };
    }).filter('momentDateTimeFilter', function () {
        return function (input, format) {
            if (input == null) { return ""; }

            format = format || "DD/MM/YYYY HH:mm:ss";

            var _date = moment(input).format(format);

            return _date;
        };
})
    .filter('momentMoneyFilter', function () {
        return function (input, format) {
            if (input == null) { return ""; }

            return input.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        };
    })

    .filter('momentDecimalFilter', function () {
    return function (input, number) {
        if (input == null) { return ""; }
        if (number == null) number = 2;
        return Math.round(input*Math.pow(10,number))/Math.pow(10,number).toString();
    };
});