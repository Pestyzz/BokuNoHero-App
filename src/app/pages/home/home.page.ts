import { Component, inject, OnInit } from '@angular/core';
import { Season } from 'src/app/models/season.model';
import { BokuNoHeroService } from 'src/app/services/boku-no-hero.service';
import { LanguageService } from 'src/app/services/language.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  seasons: Season[] = [];
  selectedSeason = '';

  languageSvc = inject(LanguageService);
  bokuNoHeroSvc = inject(BokuNoHeroService);
  selectedLanguage = '';

  ngOnInit() {
    this.selectedLanguage = localStorage.getItem('language') as string;
    this.getSeasons();
  }

  setLanguage() {
    this.languageSvc.setLanguage(this.selectedLanguage)
  }

  getSeasons() {
    this.bokuNoHeroSvc.getSeasons().subscribe({
      next: (res: any) => {
        console.log(res);
        this.seasons = res;
        this.selectedSeason = res[0].id;
      }
    })
  }

  getEpisodesBySeason() {
    this.bokuNoHeroSvc.getSeasons().subscribe({
      next: (res: any) => {
        console.log(res);
        this.seasons = res;
        this.selectedSeason = res[0].id;
      }
    })
  }

}
