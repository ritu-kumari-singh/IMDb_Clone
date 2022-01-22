var my_fav_movies = [];
//on window load fetch the list of movies' ids marked favourite by user
window.onload = function () {
    if(localStorage.getItem('fav_movie') != null && localStorage.getItem('fav_movie') != '') {
        my_fav_movies = localStorage.getItem('fav_movie').split(',');
    }
    fetch_list(my_fav_movies);
}
//function to display list of favourite movies added by user
async function fetch_list(my_fav_movies) {
    document.getElementById('movie_list').innerHTML = "";
    for(let i = 0; i < my_fav_movies.length; i++) {
        //use omdb api to fetch information about the movie using imdb id saved in local storage
        let imdbId = my_fav_movies[i];
        const response = await fetch('https://www.omdbapi.com/?apikey=3116467d&i='+imdbId);
        const data = await response.json();
        document.getElementById('movie_list').innerHTML += '<li class="flex">'
                                                                +'<img src="'+data.Poster+'" alt="No Poster" width="70" height="100">'
                                                                +'<div class="flex column" style="width:70%">'
                                                                    +'<span>'+data.Title+'</span>'
                                                                    +'<p>'+data.Released+' . '+data.Rated+' . '+data.Runtime+'</p>'
                                                                +'</div>'
                                                                +'<i data-id="'+imdbId+'" class="fas fa-minus-circle" title="Remove"></i>'
                                                            +'</li>';
    }
}
//handle onclick to remove movie from favourites list
document.onclick = function(e) {
    if(e.target.className == 'fas fa-minus-circle') {
            let imdbId = e.target.getAttribute('data-id');
            //remove the list item from display
            e.target.parentElement.remove();
            if(localStorage.getItem('fav_movie') != null && localStorage.getItem('fav_movie') != '') {
                    my_fav_movies = localStorage.getItem('fav_movie').split(',');
            }
            else {
                my_fav_movies = [];
            }
            //search for the movie id to be removed and remove it
            let index = my_fav_movies.indexOf(imdbId);
            if (index !== -1) {
              my_fav_movies.splice(index, 1);
            }
            //update local storage 
            localStorage.setItem('fav_movie',my_fav_movies);
    }       
}
