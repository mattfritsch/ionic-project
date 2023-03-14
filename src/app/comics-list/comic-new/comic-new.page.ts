import { Component, OnInit } from '@angular/core';
import {Comic} from "../../models/comic.model";
import {ComicService} from "../../comic.service";
import {ToastController} from "@ionic/angular";
import {Router} from "@angular/router";

@Component({
  selector: 'app-comic-new',
  templateUrl: './comic-new.page.html',
  styleUrls: ['./comic-new.page.scss'],
})
export class ComicNewPage implements OnInit {
  public comic! : Comic;
  constructor(
    private Comic: ComicService,
    private toastCtrl: ToastController,
    private router: Router
  ) { }

  ngOnInit() {
    this.comic = new Comic();
  }

  async presentToast() {
    const toast = this.toastCtrl.create({
      message: 'Nouveau comic enregistré !',
      duration: 1000
    });
    (await toast).present().then(() => {
      setTimeout(() => {
        this.router.navigate(['tab/comics']);
      }, 1000);
    });
  }

  async errorToast() {
    const toast = this.toastCtrl.create({
      message: 'Tous les champs nécessaires n\'ont pas été complétés !',
      duration: 1000
    });
    (await toast).present()
  }

  add(){
    if(this.comic.cover == '' || this.comic.name == '' || this.comic.author == '' || this.comic.designer == '' ||
      this.comic.releaseDate == '' || this.comic.typeOfList == '' || this.comic.universe == ''
      || this.comic.description == ''){
      this.errorToast();
    }
    else{
      if(this.comic.isSerie == true){
        if(this.comic.seriesNumber == ''){
          this.errorToast()
        }
        else {
          this.Comic.saveNewComic(this.comic).subscribe(() => {
            this.comic = new Comic();
            this.presentToast();
          });
        }
      }
      else {
        this.Comic.saveNewComic(this.comic).subscribe(() => {
          this.comic = new Comic();
          this.presentToast();
        });
      }
    }
  }

}
