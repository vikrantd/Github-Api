'use strict';

/* Controllers */

app.controller('AppCtrl', function(  $scope,  $http ) {




// declaring all variables to 0
$scope.till_7_days = 0;
$scope.till_24_hours = 0;
var url = "https://api.github.com/repos/";



// main function which retrieves the data from the api
$scope.retrievedata = function(repo){
    
    $scope.loading = "processing"; //lodaing variable that defines the current state 
    $scope.till_7_days = 0;
    $scope.till_24_hours = 0;
    
    var i= 1;
    var j = 1;
    gettotal(repo);  //function call gettotal, it gets the total number of issues and basic repository data
    get_24_hours(i , repo); //function call get_24_hours, it gets the issues of last 24 hours 
    get_one_to_seven_days(j , repo); //function call get_one_to_seven_Days, it gets the issues of last 7 days 


}





// get_24_hour function to get the issues of last 24 hours
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



// get_one_to_seven_days function to get the issues of last 7 days, name of the function s confusing but it takes the data from beginning to seven days

var get_one_to_seven_days = function(iteration, repo){

    var date = new Date();
    date.setDate(date.getDate()-7);
    date = date.toISOString();
    var issue_data = [];
    $http.get(url + repo + '/issues?page=' + iteration + '&per_page=100&state=open&since=' + date).then(function(results){

        console.log(results.data);
        iteration += 1;
        issue_data.push(results.data); // pussing the objetcs in a temp var
        $scope.till_7_days += results.data.length ;
        if(results.data.length==100)
        {
           get_one_to_seven_days(iteration , repo);

        }
        else{
            $scope.loading = "done";
            $scope.issues = issue_data; // taking all objects to the scope so that we can display the issues
        }

    });
    

}



//function to get basic data about repo and total number of issues
var gettotal = function(repo){

    $http.get(url + repo).success(function (data){
          console.log(data);
          $scope.repo = data;
        
    }).error(function(data,status){
      $scope.loading = "error";
    })
}






});

