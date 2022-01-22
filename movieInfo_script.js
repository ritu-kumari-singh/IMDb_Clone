//on window load fetch movie's imdb id sent in url
window.onload = function () {
    var url = document.location.href,
        params = url.split('?')[1].split('&'),
        data = {}, tmp;
    for (var i = 0, l = params.length; i < l; i++) {
        tmp = params[i].split('=');
        data[tmp[0]] = tmp[1];
    }
    id = data.movieId;
    //use the id to fetch details about the movie from omdb api
    populate_page(id);
}
async function populate_page(id) {
    const response = await fetch('http://www.omdbapi.com/?apikey=3116467d&i='+id);
    const data = await response.json();
    document.getElementById('container').innerHTML = '<div class="flex">'
                                                        +'<img src="'+data.Poster+'" alt="Could not load movie poster" width="400" height="500">'
                                                        +'<div class="flex column" style="padding-left:10px;">'
                                                            +'<span>'+data.Title+'</span>'
                                                            +'<p>'+data.Released+' . '+data.Rated+' . '+data.Runtime+'</p>'
                                                            +'<br>'
                                                            +'<div class="flex"><p class="bold">IMDb RATING</p><p>'+data.imdbRating+'</p></div>'
                                                            +'<br>'
                                                            +'<div class="flex"><p class="bold">LANGUAGE</p><p>'+data.Language+'</p></div>'
                                                            +'<br>'
                                                            +'<div class="flex"><p class="bold">GENRE</p><p>'+data.Genre+'</p></div>'
                                                            +'<br>'
                                                            +'<div class="flex"><p class="bold">PLOT</p><p>'+data.Plot+'</p></div>'
                                                            +'<br>'
                                                            +'<div class="flex"><p class="bold">ACTORS</p><p>'+data.Actors+'</p></div>'
                                                            +'<br>'
                                                            +'<div class="flex"><p class="bold">WRITER</p><p>'+data.Writer+'</p></div>'
                                                            +'<br>'
                                                            +'<div class="flex"><p class="bold">AWARDS</p><p>'+data.Awards+'</p></div>'
                                                            +'<br>'
                                                    +'</div>';
document.getElementsByTagName('title')[0].innerText = data.Title;
}