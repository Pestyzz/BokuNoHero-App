import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-intro',
  templateUrl: './intro.page.html',
  styleUrls: ['./intro.page.scss'],
})
export class IntroPage implements OnInit {

  router = inject(Router);

  ngOnInit() {
  }

  ionViewWillEnter(){
   setTimeout(() => {
    this.router.navigate(['/home']);
   }, 2800);
  }

}
