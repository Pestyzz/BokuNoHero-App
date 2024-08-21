import { Component, inject, OnInit } from '@angular/core';
import { Episode } from 'src/app/models/episode.model';
import { Season } from 'src/app/models/season.model';
import { BokuNoHeroService } from 'src/app/services/boku-no-hero.service';
import { LanguageService } from 'src/app/services/language.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  episodeNumber = '';
  seasons: Season[] = [];
  episodes: Episode[] = [];
  selectedSeason = '';

  loading: boolean = false;
  limitError: boolean = false;

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
    this.loading = true;

    this.bokuNoHeroSvc.getSeasons().subscribe({
      next: (res: any) => {
        this.loading = false;
        console.log(res);
        this.seasons = res;
        this.selectedSeason = res[0].id;

        this.getEpisodesBySeason();
      },
      error: (err: any) => {
        this.loading = false;
        if (err.status === 429) this.limitError = true;
      }
    })
  }

  getEpisodesBySeason() {
    this.loading = true;

    const selectedSeason = parseInt(this.selectedSeason);
    this.bokuNoHeroSvc.getEpisodesBySeason(selectedSeason).subscribe({
      next: (res: any) => {
        this.loading = false;
        console.log(selectedSeason, res);
        this.episodes = res
      }
    })
  }

  getEpisodesByNumber() {
    this.loading = true;

    const episodeNumber = parseInt(this.episodeNumber);
    if (this.episodeNumber) {
        this.bokuNoHeroSvc.getEpisodesByNumber(episodeNumber).subscribe({
        next: (res: any) => {
          this.loading = false;
          console.log(res);
          this.episodes = [res]
        },
        error: (err: any) => {
          this.loading = false;
          this.episodes = [];
        }
      })
    } else this.getEpisodesBySeason();
  }
}
