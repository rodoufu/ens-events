const app = angular.module("ensEvents", []);

app.controller('mainController', ['$scope', ($scope) => {
    $scope.periods = ["Year", "Month", "Week", "Day", "Hour", "Minute", "Second"];
    $scope.period = 'day';
}]);
