// Stores list of imdb ids for the movies marked as favourite by the user
var my_fav_movies = []; 

//keyup event to update search results as the user types
document.getElementById("search_movie").onkeyup = async function() {
        let searchword = document.getElementById("search_movie").value;
        // fetch search results for the movie searched by user
        const response = await fetch('http://www.omdbapi.com/?apikey=3116467d&s='+searchword)
        const data = await response.json();
        const results = data.Search;

        document.getElementById('search_results').innerHTML = '';
        if(results != undefined) {
                //iterate throught the results and display the list to the user
                for(let i = 0; i < results.length; i++) {
                        let title = results[i].Title;
                        document.getElementById('search_results').innerHTML += '<li data-id="'+results[i].imdbID+'" class="flex">'
                                                                                        +'<div><a class="flex" href="movieInfo.html?movieId='+encodeURIComponent(results[i].imdbID)+'" target="_blank">'
                                                                                                +'<img src="'+results[i].Poster+'" alt="poster" width="60" height="100">'
                                                                                                +'<span>'+title+'</span>'
                                                                                        +'</a></div>'
                                                                                        +'<i class="fas fa-plus" title="Add to favourites"></i>'
                                                                                +'</li>'
                                                                                +'<hr size="1" width="98%" color="#ded7d7">';
                }
        }    
}
//onclick event added to document to handle add to favourites 
document.onclick = function(e) {
        if(e.target.className == 'fas fa-plus') {
                let imdbId = e.target.parentElement.getAttribute('data-id');
                //fetch the list of favourites added by user
                if(localStorage.getItem('fav_movie') != null && localStorage.getItem('fav_movie') != '') {
                        my_fav_movies = localStorage.getItem('fav_movie').split(',');
                }
                else {
                        my_fav_movies = [];
                }
                //search if the movie is already added to favourites list
                let index = my_fav_movies.indexOf(imdbId);
                if (index == -1) {
                        //if movie is not already added to favourites add it
                        my_fav_movies.push(imdbId);
                        localStorage.setItem('fav_movie',my_fav_movies);
                }                
        }       
}