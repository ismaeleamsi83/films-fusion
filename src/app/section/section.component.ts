import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-section',
  standalone: true,
  imports: [HttpClientModule],
  templateUrl: './section.component.html',
  styleUrl: './section.component.scss'
})
export class SectionComponent {


  films: any;

  Api: string = "https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc";

  constructor(private httpClient: HttpClient){}

  ngOnInit(): void {

    // this.httpClient.get('../../assets/json/movies-2020s.json')
    // .subscribe((response: any)=>{
    //   this.films = response;
    //   console.log(response);
    //   console.log(this.films);
    // });


    const token = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxOTU2N2I3YjE4NDk0MzYzYTdhMjMwZGE4N2MzMjcxYSIsInN1YiI6IjY1ZjA3MThlMTdiNWVmMDE4NWI4Y2MzNiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.6evinFLVwzkbSrxslCziL5_G-wL4F-rzwBCXWxhOADM";
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Accept': 'application/json' // Este sería el tipo de dato que aceptas, puede ser application/json u otro según lo que necesites
    });

    this.httpClient.get(this.Api, {headers})
    .subscribe((film:any)=> {
      console.log(film);
      this.films = film.results;
      console.log(this.films);
    });
    
  }

}
