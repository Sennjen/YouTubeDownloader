app.controller('VideoController',['$scope','youtubeFactory','$mdDialog', function ($scope,youtubeFactory,$mdDialog) {
    $scope.searchResults = [];
    $scope.searchQuery = '';
    $scope.nextPageToken = '';
    $scope.apiKeys = [
        'AIzaSyAiHmiWsHBbzoSojnV3kkQKsh0qNvQoTHg',
        'AIzaSyAB0-bh7U4jSH9Mknwe0ke693fNg3ZaBTc',
        'AIzaSyBKMRMYEiUIePp2IKzBNgCaxVLgFhjMSlQ'];
    console.log();
    $scope.searchVideo = function () {
        $scope.searchResults = [];
        $scope.nextPageToken = '';
        $scope.getYouTubeData()
    };
    $scope.getYouTubeData = function () {
        youtubeFactory.getVideosFromSearchByParams({
            q: $scope.searchQuery,
            key: $scope.apiKeys[Math.floor(Math.random() * 3)],
            maxResults: 10,
            nextPageToken: $scope.nextPageToken
        }).then(function (_data) {
            $scope.searchResults.push.apply($scope.searchResults, _data.data.items);
            $scope.nextPageToken = _data.data.nextPageToken;
        }).catch(function (_data) {});
    };
    $scope.showVideo = function (ev, vid) {
        $mdDialog.show({
            locals:{id: vid},
            controller: function ($scope, id) {
                $scope.videoId = id;
            },
            templateUrl: '/app/template/videoModal.tmpl.html',
            parent: angular.element(document.body),
            targetEvent: ev,
            clickOutsideToClose:true,
            fullscreen: false
        })
    };
    $scope.doBlur = function($event){
        var target = $event.target[0];
        target.blur();
    }
}]).directive('scrolly', function () {
    return {
        restrict: 'A',
        link: function (scope, element, attrs) {
            var raw = element[0];
            element.bind('scroll', function () {
                if (raw.scrollTop + raw.offsetHeight >= raw.scrollHeight) {
                    scope.getYouTubeData();
                }
            })
        }
    }
}).filter('trustAsResourceUrl', ['$sce', function($sce) {
    return function(val) {
        return $sce.trustAsResourceUrl(val);
    };
}]);