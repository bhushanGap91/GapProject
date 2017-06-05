app.controller("myCtrl", function($scope,$http) {
    $http.get("record.json")
    .then(function(response)
          {
        $scope.names=response.data.records;
    }
    );
     $scope.sort = function(keyname){
        $scope.sortKey = keyname;   //set the sortKey to the param passed
        $scope.reverse = !$scope.reverse; //if true make it false and vice versa
    }
});
