angular.module('PKBL')
.factory('IncidentService', ['$resource', function ($resource) {
    return $resource('/Incident/:verb', {}, {
        FetchAll: {
            method: 'POST',
            params: {
                verb: 'FetchAll'
            }
        },
        Save: {
            method: 'POST',
            params: {
                verb: 'Save'
            }
        },
        Delete: {
            method: 'POST',
            params: {
                verb: 'Delete'
            }
        }
    });
}])
.factory('IncidentFormService', ['$resource', function ($resource) {
    var incident = null;

    return {
        set: function (data) {
            incident = data;
        },
        get: function () {
            return incident;
        }
    };
}]);


