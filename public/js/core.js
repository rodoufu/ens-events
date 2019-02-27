const app = angular.module("ensEvents", []);

app.controller('mainController', ['$scope', ($scope) => {
    $scope.periodTypes = ["Year", "Month", "Week", "Day", "Hour", "Minute", "Second"];
    $scope.periodType = 'day';
}]);
