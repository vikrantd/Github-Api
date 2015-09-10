'use strict';

/* Controllers */

app.controller('AppCtrl', function(  $scope,  $http ) {





$scope.till_7_days = 0;
$scope.till_24_hours = 0;
var url = "https://api.github.com/repos/";




$scope.retrievedata = function(repo){
    
    $scope.loading = "processing";
    $scope.till_7_days = 0;
    $scope.till_24_hours = 0;
    
    var i= 1;
    var j = 1;
    gettotal(repo);
    get_24_hours(i , repo);
    get_one_to_seven_days(j , repo);



}






var get_24_hours = function(iteration , repo){

    var date = new Date();
    date.setDate(date.getDate()-1);
    date = date.toISOString();
    $http.get(url + repo + '/issues?page=' + iteration + '&per_page=100&state=open&since=' + date).then(function(results){

        console.log(results.data);
        iteration += 1;
        $scope.till_24_hours += results.data.length ; 
        console.log(results.data.length);
        if(results.data.length==100)
        {
           get_24_hours(iteration , repo);

        }


    });
    

}




var get_one_to_seven_days = function(iteration, repo){

    var date = new Date();
    date.setDate(date.getDate()-7);
    date = date.toISOString();
    var issue_data = [];
    $http.get(url + repo + '/issues?page=' + iteration + '&per_page=100&state=open&since=' + date).then(function(results){

        console.log(results.data);
        iteration += 1;
        issue_data.push(results.data);
        $scope.till_7_days += results.data.length ;
        if(results.data.length==100)
        {
           get_one_to_seven_days(iteration , repo);

        }
        else{
            $scope.loading = "done";
            $scope.issues = issue_data;
        }

    });
    

}




var gettotal = function(repo){

    $http.get(url + repo).success(function (data){
          console.log(data);
          $scope.repo = data;
        
    }).error(function(data,status){
      $scope.loading = "error";
    })
}






});

