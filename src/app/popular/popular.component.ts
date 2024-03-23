import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { Component, ElementRef, ViewChild  } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FilmsService } from '../services/films.service';
import { defer } from 'rxjs';

@Component({
  selector: 'app-popular',
  standalone: true,
  imports: [HttpClientModule, CommonModule ],
  templateUrl: './popular.component.html',
  styleUrl: './popular.component.scss'
})
export class PopularComponent {

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


  
  constructor(
    private httpClient: HttpClient, 
    private router: Router,
    private serviceFilms: FilmsService
    ) {}

  ngOnInit(): void {

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
    this.serviceFilms.getPopularFilms(this.pageActual)
      .subscribe({
        next: data => this.films=data.results,
        error: err => console.error('Observable emitted an error: ' + err),
        complete: () => console.log('Observable emitted the complete notification')
      });
    
    //mover al principio  de la pagina
    window.scrollTo({ top: 200, behavior: 'smooth' });
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
}
