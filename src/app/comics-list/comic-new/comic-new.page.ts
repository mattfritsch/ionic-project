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
      duration: 2000
    });
    (await toast).present().then(() => {
      setTimeout(() => {
        this.router.navigate(['tab/comics']);
      }, 2000);
    });
  }

  add(){
    this.Comic.saveNewComic(this.comic).subscribe(() => {
      this.comic = new Comic();
      this.presentToast();
    });
  }

}
