
/////////injects Data Handler Service (Slideshow) and Timeout into the Directive
////////////the Slideshow Service grabs data from a google spreadsheet//////////////
app.directive('slideShow', function(Slideshow, $timeout){
	return{
		restrict: 'AE',
		scope:true,
		templateUrl: 'partials/slideshow.html',
		link:function(scope)
	  	{
	  		Slideshow.loadSlideData('19uuws3BhCGqVKp1Zl1uq-e4L1bbG9vla3DDZqMiL').then(function(data)
			{
				scope.slides = data;
				scope.slides[0].visible=true;
				scope.slides[0].classy='active';
				scope.slideshow_width = scope.slides.length*620;
				scope.playhider=true;
				
				
				
			});
			//////////Sets up timer//////////////////
	  		scope.timer;
	  		scope.remaining=scope.timer/1000;
			
			var sliderFunc = function() {
			  scope.timeout = $timeout(function() {
			    scope.remaining--;
			    scope.next();
			    scope.timer = $timeout(sliderFunc, 3000);
			  }, 3000);
			};
			 
			sliderFunc();
	 
			scope.$on('$destroy', function() {
			  $timeout.cancel(timer); // when the scope is getting destroyed, cancel the timer
			});
	  		///////////////Button Handlers
	  		scope.next = function() {
	  			for(var i=0; i<scope.slides.length; i++)
	  			{
	  				scope.slides[i].visible=false;
	  				scope.slides[i].classy='inactive';
	  			}
		  		if(scope.currentIndex < scope.slides.length - 1)
		  		{	
		  			scope.currentIndex=scope.currentIndex+1;	
		  			scope.slides[scope.currentIndex].visible=true;
		  			scope.slides[scope.currentIndex].classy='active';
		  		}
		  		else{ 
		  			scope.currentIndex=0;
		  			scope.slides[scope.currentIndex].visible=true;
		  			scope.slides[scope.currentIndex].classy='active';
		  		}
		  		//console.log(scope.currentIndex);
	  		
	  		};
	  		scope.prev=function()
	  		{
	  			for(var i=0; i<scope.slides.length; i++)
	  			{
	  				scope.slides[i].visible=false;
	  				scope.slides[i].classy='inactive';
	  				
	  			}
	  			if(scope.currentIndex >0)
		  		{	
		  			scope.currentIndex=scope.currentIndex-1;	
		  			scope.slides[scope.currentIndex].visible=true;
		  			scope.slides[scope.currentIndex].classy='active';
		  			
		  		}
		  		else{ 
		  			scope.currentIndex=scope.slides.length-1;
		  			scope.slides[scope.currentIndex].visible=true;
		  			scope.slides[scope.currentIndex].classy='active';
		  		}
	  		};
	  		scope.numberClick = function(num)
	  		{
	  			for(var i=0; i<scope.slides.length; i++)
	  			{
	  				scope.slides[i].visible=false;
	  				scope.slides[i].classy='inactive';
	  			}
	  			scope.currentIndex = (num-1)
	  			scope.slides[scope.currentIndex].visible=true;
		  		scope.slides[scope.currentIndex].classy='active';
		  		scope.playhider=false;
		  		$timeout.cancel(scope.timer);
		  		
	  		};
	  		scope.playPause =function()
	  		{
	  			if(scope.playhider==false)
	  			{
	  				scope.playhider=true;
	  				sliderFunc();
	  				
	  			}
	  			else{
	  				scope.playhider=false;
	  				$timeout.cancel(scope.timer);
	  			}
	  			
	  		};
	 
			
		}
	};
});
///////////////Slideshow Service/////////////////////////
app.factory('Slideshow', ['$http', '$routeParams', '$location', '$rootScope', '$sce',
function($http, $routeParams, $location, $rootScope, $sce) {

return{
	
	loadSlideData:function(tableId)
	{
		var slideshow = [];
				return $http.get('https://www.googleapis.com/fusiontables/v1/query?sql=SELECT+SlideNumber,Title,ImageUrl,Link,Description,PublishDate,Type+FROM+'+tableId+'+%22&key=AIzaSyBBcCEirvYGEa2QoGas7w2uaWQweDF2pi0').then(function(result) {					
var d= new Date();
						result.data.rows.reverse();
						if(result.data.rows.length>0)
						{
						var d= new Date();
						td = d.valueOf();
						result.data.rows.reverse();
						var count = 1;
								
						for (var i=0; i<result.data.rows.length; i++)
						{
							var pd = new Date(result.data.rows[i][5]);
							
							var tpd=pd.valueOf();
							
							if(result.data.rows[i][5]!='#'||td>=tpd)
							{
								if(result.data.rows[i][6].toLowerCase()=="dyk")
								{
									if((tpd+604800000)>td)
									{
										slideshow.push(
										{
											slidenumber:count++,
											title: 	result.data.rows[i][1],
											imageurl:result.data.rows[i][2],
											link:result.data.rows[i][3],
											description:result.data.rows[i][4],
											publishdate:result.data.rows[i][5],
											type:result.data.rows[i][6],
											hider:true,
											visible:false,
											class:'inactive',
										});
									}
								}
								else if(result.data.rows[i][6].toLowerCase()=="pow"){
									if((tpd+604800000)>td)
									{	
										slideshow.push(
										{
											slidenumber:count++,
											title: 	result.data.rows[i][1],
											imageurl:result.data.rows[i][2],
											link:result.data.rows[i][3],
											description:result.data.rows[i][4],
											publishdate:result.data.rows[i][5],
											type:result.data.rows[i][6],
											hider:true,
											visible:false,
											classy:'inactive',
										});
									}
								}
								else if(result.data.rows[i][6].toLowerCase()=="alumni")
								{
									if((tpd+604800000)>td)
									{	
										slideshow.push(
										{
											slidenumber:count++,
											title: 	result.data.rows[i][1],
											imageurl:result.data.rows[i][2],
											link:result.data.rows[i][3],
											description:result.data.rows[i][4],
											publishdate:result.data.rows[i][5],
											type:result.data.rows[i][6],
											hider:true,
											visible:false,
											classy:'inactive'
										});
									}
								}
								else
								{
									slideshow.push(
									{
										slidenumber:count++,
										title: 	result.data.rows[i][1],
										imageurl:result.data.rows[i][2],
										link:result.data.rows[i][3],
										description:result.data.rows[i][4],
										publishdate:result.data.rows[i][5],
										type:result.data.rows[i][6],
										hider:true,
										visible:false,
										classy:'inactive',
									});
								}
							}
						}
					}
					console.log(slideshow);
					return slideshow;
				});	
	}
	
};
}]);