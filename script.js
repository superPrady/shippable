var app=angular.module('GHapp',[]);

//CONTROLLER DEFINITION
app.controller('GHcntrl',function($scope,$http){
	$scope.url="";
	//FNFETCHING FUNCTION WHEN CALLED
	$scope.fnFetching=function(){
		//GETTING THE REPOSITORY NAME FROM THE ENTIRE URL
		$scope.urlsplit = $scope.url.split('.com/')[1].split('/')[0] + '/' + $scope.url.split('.com/')[1].split('/')[1];
		//USING THE API LINK TO FETCH THE JSON OBJECT
		$http.get('https://api.github.com/repos/'+$scope.urlsplit+'/issues').then(function(response){
			$scope.data=response.data;
			//GETTING LENGTH OF DATA RETURNED JSON && GETTING THE TOTAL NUMBER OF ISSUES
			$scope.issues=$scope.data.length;
			//TABLE VAR TO DISPLAY THE TABLE
			$scope.table=1;
		})

		//JAVASCRIPT TO CALCULATE DATE
		var today = new Date();
		d=today.toISOString();
		//USING +5.30 IST SO 18.5
		var yesterday = (new Date(today.getTime() - (18.5*60*60*1000))).toISOString();
		var days7before= (new Date(today.getTime() - (7*18.5*60*60*1000))).toISOString();

		//NOW FETCHING API DATA USING THE ISO TIME STANDARD
		$http.get('https://api.github.com/repos/'+$scope.urlsplit+'/issues?since='+yesterday).then(function(response){
			$scope.data=response.data;
			//GETTING THE ISSUES 24 HOURS AGO
			$scope.issues1daybefore=$scope.data.length;
		})

		$http.get('https://api.github.com/repos/'+$scope.urlsplit+'/issues?since='+days7before).then(function(response){
			$scope.data=response.data;
			$scope.issues7daysbefore=$scope.data.length;
		})	
	};
})
