/**
 * Created by emma on 4/30/16.
 */
(function(){
    angular
        .module("MovieApp")
        .controller("GalleryController", galleryController);

    function galleryController($scope, $sce) {


            var videos = [
                {youTubeId : "", url: $sce.trustAsResourceUrl("http://www.imdb.com/video/imdb/vi3832000025/imdb/embed?autoplay=false")},
                {youTubeId : "", url: $sce.trustAsResourceUrl("http://www.imdb.com/video/imdb/vi3976704793/imdb/embed?")},
                {youTubeId : "", url: $sce.trustAsResourceUrl("http://www.imdb.com/video/imdb/vi336244761/imdb/embed?autoplay=false")}
            ];

        $scope.videos = videos;

    }
})();