angular.module('itunes').service('itunesService', function($http, $q){
  //This service is what will do the 'heavy lifting' and get our data from the iTunes API.
  //Also note that we're using a 'service' and not a 'factory' so all your methods you want to call in your controller need to be on 'this'.

  //Write a method that accepts an artist's name as the parameter, then makes a 'JSONP' http request to a url that looks like this
  //https://itunes.apple.com/search?term=' + artist + '&callback=JSON_CALLBACK'
  //Note that in the above line, artist is the parameter being passed in.
  //You can return the http request or you can make your own promise in order to manipulate the data before you resolve it.

    //Code here
    this.artistLookup = function(artist) {
      return $http({
        method: 'JSONP',
        url: 'http://itunes.apple.com/search?term=' + artist + '&callback=JSON_CALLBACK'
      });
    }

/////MORE COMPLEX ALTERNATIVE IN CASE WE WANT TO MANIPULATE THE DATA/////
// this.getUsers = function() {
//   var deferred = $q.defer();
//   $http({
//       method: 'GET',
//       url: 'https://reqres.in/api/users?page=1'
//   }).then(function(response){
//     var parsedResponse = response.data.data //DOUBLE CHECK THE ACTUAL THING CALLED BACK!
//     for (var i = 0; i < parsedResponse.length; i++) {
//       parsedResponse[i].first_name = "Ralf"
//       //CHANGE first_name TO SOMETHING IN THE iTUNES DATA
//     }
//     deferred.resolve(response);
//   })
//   return deferred.promise;
// }
// });



    // Go to the next step in the README (Tie in your controller). You will come back to these instructions shortly.
    // You need to sort the data you get back from the itunes API to be an object in the following format.
    /*
      AlbumArt: "http://a3.mzstatic.com/us/r30/Features4/v4/22/be/30/22be305b-d988-4525-453c-7203af1dc5a3/dj.srlprmuo.100x100-75.jpg"
      Artist: "Nelly"
      Collection: "Nellyville"
      CollectionPrice: 11.99
      Play: "http://a423.phobos.apple.com/us/r1000/013/Music4/v4/4a/ab/7c/4aab7ce2-9a72-aa07-ac6b-2011b86b0042/mzaf_6553745548541009508.plus.aac.p.m4a"
      Type: "song"
  */


  this.songParser = function (resultsArray){
    var parsedSongs = [];
    for (var i = 0; i < resultsArray.length; i++) {
      var singleParsedSong = {
        AlbumArt: resultsArray[i].artworkUrl60,
        Artist: resultsArray[i].artistName,
        Collection: resultsArray[i].collectionName,
        CollectionPrice: resultsArray[i].collectionPrice,
        Play: resultsArray[i].trackViewUrl,
        Type: resultsArray[i].kind
      };
      parsedSongs.push(singleParsedSong);
    }
    return parsedSongs;
  }

  //the iTunes API is going to give you a lot more details than ng-grid wants. Create a new array and then loop through the iTunes data pushing into your new array objects that look like the above data. Make sure your method returns this finalized array of data.
  // When this is complete, head back to your controller.


});
