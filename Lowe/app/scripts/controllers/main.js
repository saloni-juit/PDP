'use strict';

/**
 * @ngdoc function
 * @name LoweApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the LoweApp
 */
angular.module('LoweApp')
    .config(['$sceDelegateProvider', function($sceDelegateProvider) {
        // We must whitelist the JSONP endpoint that we are using to show that we trust it
        $sceDelegateProvider.resourceUrlWhitelist([
            'self',
            'https://m.lowes.com/**',
            'http://m.lowes.com/**'
        ]);
    }])
    .controller('MainCtrl', ['$window','$scope', '$http', function($window,$scope, $http) {

        var url = 'http://cors-proxy.htmldriven.com/?url=http://m.lowes.com/CatalogServices/product/nvalue/v1_0?nValue=4294857975&maxResults=20&showURL=1&rollUpVariants=1&showUrl=true&storeNumber=0595&priceFlag=rangeBalance&showMarketingBullets=1&callback=';

        $http({
            method: 'GET',
            url: url
        }).then(function successCallback(response) {
            var res = JSON.parse(response.data.body);
            $scope.products = res.productList;
            $scope.hero = res.productList[0];
            $scope.viewMore(0);
    
        }, function errorCallback(response) {
	          console.log("Error occurred in loading data");
        });


        $scope.addToCart = function(price){
        	$window.alert("The cost of this machine is:$"+price);
        };

        $scope.viewMore = function(index){
        	$scope.hero = $scope.products[index];

        	var element = $scope.hero.links;
        	var link = '';
        	for(var i=0;i<element.length;i++){
        		if(element[i].rel === "bullets"){
        			link = element[i].href;
        			break;
        		}
        	}

        	var bulletId = link.replace(/^\D+|\D.*$/g, "");

        	var viewMoreUrl = 'http://cors-proxy.htmldriven.com/?url=http://m.lowes.com/CatalogServices/product/'+bulletId+'/bullets/v1_0&callback=';
        	$http({
        		method:'GET',
        		url:viewMoreUrl
        	}).then(function successCallback(response){
        		var res = JSON.parse(response.data.body);
        		$scope.hero.marketingBullets = res.marketingBullets;
        	});
        };

    }]);
