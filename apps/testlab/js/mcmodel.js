'use strict';

testlabServices.service('MCModelSvc',
		['$resource',
		function($resource){
			return $resource('/mc/svcMC/model/:id',{id:'@id'},{
				getOne:{method:'GET'},
				getGallery:{method:'GET',params:{id:'gallery'},isArray:true}
				});
		}]);

testlabControllers.controller('ctrlMCModel',
		['$scope','MCModelSvc',
		function($scope,MCModelSvc){
			var id=1;

			MCModelSvc.getOne({id:id}).$promise.then(function(data){
				console.log(data);
			},
			function(err){
				console.log(err);
			});

			$scope.slides=[];
			MCModelSvc.getGallery({mcid:id}).$promise.then(function(data){
				console.log(data);

				for (var i=0;i<data.length;i++){
					$scope.slides.push({image:'/mc/svcMC/mcpic/'+data[i].picFileName,text:'aa'});
				}

			},
			function(err){
				console.log(err);
			});


			$scope.myInterval = 3000;
			$scope.noWrapSlides = false;


		}]);


