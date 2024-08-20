import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class BokuNoHeroService {

  http = inject(HttpClient);

  getSeasons() {
    return this.http.get(environment.baseUrl + environment.seasons)
  }
}
