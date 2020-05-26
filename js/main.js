'use strict'
// http://www.omdbapi.com/?i=tt3896198&apikey=30f422e9
const API_KEY = '29bb47b7552ec502eb87cebfbc77f766';
const API_URL = 'https://api.themoviedb.org/3';
const IMG_URL = 'https://image.tmdb.org/t/p/w185_and_h278_bestv2';

$(document).ready(function () {

  // events
  $('.search__btn').click(() => {
    let query = $('.search__field').val()
    if (query == '') {
      alert('You haven`t enter name of your movie')
    } else {
      getMovie()
    }
  })

  $('.search__field').keypress((e) => {
    if (e.keyCode === 13) {
      getMovie()
    }
  })

  // functions
  function getMovie() {
    let query = $('.search__field').val()

    $('body').addClass('loading')

    if (query !== '') {
      $('.movie').remove()

      $.ajax({
        url: `${API_URL}/search/movie`,
        type: 'GET',
        dataType: 'json',
        data: {
          api_key: API_KEY,
          query: query
        }
      }).then((res) => {
        if (res.results.length === 0) {
          alert('No movies found')
        } else {
          res.results.forEach((movie) => {
            if (movie.poster_path !== null)
              $('.movies').append(drowMovie(movie))
          })
        }
        $('body').removeClass('loading')
      })
    }

  }

  function drowMovie(movie) {
    let movieDOM = $(`<div class="movie">
                      <img class="movie__poster" src="${IMG_URL + movie.poster_path}" alt="">
                      <h2 class="movie__title">${movie.title}</h2>
                      <div class="movie__info">
                        <h3><b>Realise date: </b>${movie.release_date}</h3>
                        <h3><b>Rating: </b>${movie.vote_average}</h3>
                        <p>${movie.overview}</p>
                      </div>
                    </div>`)
    let clickedMovie = movieDOM.find('.movie__info')

    clickedMovie.click(() => {
      getReviews(movie.id, movie.title, movie.overview)
      // console.log('hey')
    })
    return movieDOM
  }
  function getReviews(id, title, overview) {

    $.ajax({
      url: `${API_URL}/movie/${id}`,
      type: 'GET',
      dataType: 'json',
      data: {
        api_key: API_KEY,
      }
    })

    $('.window').css('display', 'block')
    $('.reviews__title').text(`${title}`)
    $('.reviews__overview').text(`${overview}`)

    $('.reviews__close').click(() => {
      $('.window').css('display', 'none')
    })
  }



})