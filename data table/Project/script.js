var app = angular.module('main', ['ngTable']).
controller('DemoCtrl', function($scope, $filter, ngTableParams, Contents) {
    
  var data;
  
  $scope.contents = Contents
  
  $scope.contents.sort(function(a, b){
    var dateA=new Date(a.date), dateB=new Date(b.date);
    return dateB-dateA; 
  });
      
  data = $scope.contents;  
  
  data = $filter('filter')(data, { 'data' : 'movie'});
  
  for (var i = 0; i < data.length; i++){
      for ( var item in data[i]) {
          if (Array.isArray(data[i].data.categoryList)) {
              data[i].cat = data[i].data.categoryList[0].categoryName;
        }
      }
    }
  
  $scope.search = { term: '' };

  $scope.tableParams = new ngTableParams({
      page: 1, 
      count: 5,
      sorting: { date: 'desc' },
      filter: $scope.search
  }, {
      total: data.length,
      getData: function($defer, params) {
          
        var orderedData;

        if(params.sorting().date === 'asc'){

          data.sort(function (a, b) {
            var dateA = new Date(a.date), dateB = new Date(b.date);
            return dateA - dateB; //sort by date descending
          });
          orderedData = data;

        } else if(params.sorting().date === 'desc') {

          data.sort(function (a, b) {
            var dateA = new Date(a.date), dateB = new Date(b.date);
            return dateB - dateA; //sort by date descending
          });
          orderedData = data;

        } else if(!params.sorting().date){

          if (params.filter().term) {
            orderedData = params.filter() ? $filter('filter')(data, params.filter().term) : data;
          } else {
            orderedData = params.sorting() ? $filter('orderBy')(data, params.orderBy()) : data;
          }
          
        }

        $defer.resolve(orderedData.slice((params.page() - 1) * params.count(), params.page() * params.count()));
        
      }
  });
})
