'use strict';

/* Controllers */

app.controller('AppCtrl', function(  $scope,  $http ) {




// declaring all variables to 0
$scope.data =   { 
                till_7_days : 0,
                till_24_hours : 0,
                pulls : 0
                }

var url = "https://api.github.com/repos/";

$scope.issue_data = [];
var opened_issues = [];






// main function which retrieves the data from the api

$scope.retrievedata = function(repo){
    
    $scope.issue_data = [];
    var opened_issues = [];
    
    $scope.loading = "processing"; //lodaing variable that defines the current state 
   
    
    var i= 1;
    var j = 1;
    gettotal(repo);  //function call gettotal, it gets the total number of issues and basic repository data
    
    get_issues(j , repo); //function call get issues data, it gets the issues of last 7 days 
    getpulls(i , repo);

}








// get_issues function to get the issues of last 7 days

var get_issues = function(iteration, repo){

    var before7days = new Date();
    before7days.setDate(before7days.getDate()-7);
    before7days = before7days.toISOString();  //converting the date to iso string to pass it to the api 


    

    //http get request to get the issue data in JSON format

    $http.get(url + repo + '/issues?page=' + iteration + '&per_page=100&state=open&since=' + before7days).then(function(results){

        console.log(results.data);
        iteration += 1;
        results.data.forEach(function(entry)
        {
            $scope.issue_data.push(entry);
        }); // pussing the objetcs in a temp var
        
        console.log($scope.issue_data);
        
        if(results.data.length==100)
        {
           get_issues(iteration , repo);
        }

        else
        {
            $scope.loading = "done";

            $scope.issue_data.forEach(function(entry) {
                
                var created_time = Date.parse(entry.created_at);
                var _before7days = Date.parse(before7days);
            
                // Logics and conditions to get only the opened issues in last seven days
                if( created_time > _before7days && !entry.pull_request)
                
                {
                    $scope.data.till_7_days ++ ;

                    var before1day = new Date();
                    before1day.setDate(before1day.getDate()-1);
                    var _before1day = Date.parse(before1day);
                    
                    opened_issues.push(entry);

                    if( created_time > _before1day)
                    {
                        $scope.data.till_24_hours ++ ;
                        console.log($scope.data.till_24_hours);

                    }

                }

                
            }); 

        }
        
        $scope.issues = opened_issues;
        console.log(opened_issues);

    });
    

}









//function to gt the number of pulls so that we can minus it from the pulls  to get the exact number.
var getpulls = function(iteration, repo){


        $http.get(url + repo + '/pulls?page=' + iteration + '&per_page=100').then(function(results){      
        iteration += 1;
        $scope.data.pulls += results.data.length;
        console.log($scope.data.pulls);
        if(results.data.length==100)
        {
           get_pulls(iteration , repo);
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

