import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { Component, ElementRef, ViewChild  } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FilmsService } from '../services/films.service';
//import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-section',
  standalone: true,
  imports: [HttpClientModule, CommonModule ],
  templateUrl: './section.component.html',
  styleUrl: './section.component.scss'
})
export class SectionComponent {

  @ViewChild('focusFilms') focusFilms!: ElementRef;


  films: any;
  token = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxOTU2N2I3YjE4NDk0MzYzYTdhMjMwZGE4N2MzMjcxYSIsInN1YiI6IjY1ZjA3MThlMTdiNWVmMDE4NWI4Y2MzNiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.6evinFLVwzkbSrxslCziL5_G-wL4F-rzwBCXWxhOADM";
  headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`,
      'Accept': 'application/json' // Este sería el tipo de dato que aceptas, puede ser application/json u otro según lo que necesites
  });
  pageActual: number = 0;

  //contenido en el div detalle de la pelicula
  showDetails: boolean = false;
  filmShow: any;
  titleShow: any;
  overviewShow: any;
  releaseDateShow: any;



  Api: string = "https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc";

  ApiNowPlaying: string = "https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&with_release_type=2|3&release_date.gte={min_date}&release_date.lte={max_date}";

  
  include_adult: boolean = false;
  ApiAdult: string = `https://api.themoviedb.org/3/discover/movie?include_adult=${this.include_adult}&include_video=false&language=en-US&page=1&sort_by=popularity.desc&with_release_type=2|3&release_date.gte={min_date}&release_date.lte={max_date}`;

  include_video: boolean = false;
  ApiVideo: string = `https://api.themoviedb.org/3/discover/movie?include_adult=${this.include_adult}&include_video=${this.include_video}&language=en-US&page=1&sort_by=popularity.desc&with_release_type=2|3&release_date.gte={min_date}&release_date.lte={max_date}`;
  
  ApiAllFilter: string = `https://api.themoviedb.org/3/discover/movie?include_adult=${this.include_adult}&include_video=${this.include_video}&language=en-US&page=1&sort_by=popularity.desc&with_release_type=2|3&release_date.gte={min_date}&release_date.lte={max_date}`;
  
  
  top_rated: boolean = false;
  ApiTopRated: string = `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=vote_average.desc&without_genres=99,10755&vote_count.gte=200`;
  
  constructor(
    private httpClient: HttpClient, 
    private router: Router,
    private serviceFilms: FilmsService
    // private rutaActiva: ActivatedRoute
    ) {}

  ngOnInit(): void {

      this.top_rated = false;
      const headers = this.headers;
    
      this.getHomeFilms("next");
    
  }

  getHomeFilms(simbPage: any){
    if(simbPage == "next"){
      this.pageActual++;
    }else{
      if(this.pageActual >1){
        this.pageActual--;
      }
    }  
    this.serviceFilms.getNowPlayingFilms2(this.pageActual)
      .subscribe({
        next: data => this.films=data.results,
        error: err => console.error('Observable emitted an error: ' + err),
        complete: () => console.log('Observable emitted the complete notification')
      });
  }

  filterAdult(){

    this.include_adult = !this.include_adult;
    console.log("filtro adulto:"+this.include_adult);
    console.log("filtro video:"+this.include_video);
    this.ApiAllFilter = `https://api.themoviedb.org/3/discover/movie?include_adult=${this.include_adult}&include_video=${this.include_video}&language=en-US&page=1&sort_by=popularity.desc&with_release_type=2|3&release_date.gte={min_date}&release_date.lte={max_date}`;
    const headers = this.headers;
    this.httpClient.get(this.ApiAllFilter, {headers})
    .subscribe((film:any)=> {
      console.log(film);
      this.films = film.results;
      console.log(this.films);
    });
  }

  filterVideo(){
    this.include_video = !this.include_video;
    console.log("filtro adulto:"+this.include_adult);
    console.log("filtro video:"+this.include_video);
    this.ApiAllFilter = `https://api.themoviedb.org/3/discover/movie?include_adult=${this.include_adult}&include_video=${this.include_video}&language=en-US&page=1&sort_by=popularity.desc&with_release_type=2|3&release_date.gte={min_date}&release_date.lte={max_date}`;
    const headers = this.headers;

    this.httpClient.get(this.ApiAllFilter, {headers})
    .subscribe((film:any)=> {
      console.log(film);
      this.films = film.results;
      console.log(this.films);
    });
  }

  showDetailsFilm(item: any){
    this.showDetails = true;
    console.log(this.showDetails);
    console.log(item);
    this.filmShow = `https://image.tmdb.org/t/p/w400${item.poster_path}`;
    this.titleShow = item.title;
    this.overviewShow = item.overview;
    this.releaseDateShow= item.release_date;
  }


  showTopRated(){
    this.top_rated = !this.top_rated;
    const headers = this.headers;
    this.httpClient.get(this.ApiTopRated, {headers})
    .subscribe((film:any)=> {
      console.log(film);
      this.films = film.results;
      console.log(this.films);
    });
  }


  nextPage(){

  
    
      this.pageActual++;
      const headers = this.headers;
      this.ApiAllFilter = `https://api.themoviedb.org/3/discover/movie?include_adult=${this.include_adult}&include_video=${this.include_video}&language=en-US&page=${this.pageActual}&sort_by=popularity.desc&with_release_type=2|3&release_date.gte={min_date}&release_date.lte={max_date}`;
  
      this.httpClient.get(this.ApiAllFilter, {headers})
      .subscribe((film:any)=> {
        console.log(film);
        this.films = film.results;
        console.log(this.films);
        //this.router.navigateByUrl('focusFilm');
      });

    
    
    
    
  }

  backPage(){
    if(this.pageActual > 1){ 
      this.pageActual--;
      const headers = this.headers;
      this.ApiAllFilter = `https://api.themoviedb.org/3/discover/movie?include_adult=${this.include_adult}&include_video=${this.include_video}&language=en-US&page=${this.pageActual}&sort_by=popularity.desc&with_release_type=2|3&release_date.gte={min_date}&release_date.lte={max_date}`;
  
      this.httpClient.get(this.ApiAllFilter, {headers})
      .subscribe((film:any)=> {
        console.log(film);
        this.films = film.results;
        console.log(this.films);
        //this.router.navigateByUrl('focusFilm');
      });
    }
  }


}
