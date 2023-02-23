import { Component, OnInit } from '@angular/core';
import {AlertController, ToastController} from "@ionic/angular";
import {ActivatedRoute, Router} from "@angular/router";
import {ComicService} from "../../comic.service";

@Component({
  selector: 'app-comic',
  templateUrl: './comic.page.html',
  styleUrls: ['./comic.page.scss'],
})
export class ComicPage implements OnInit {
  modif: boolean = false;
  comic!: any;
  constructor(
    private alertCtrl: AlertController,
    private route: ActivatedRoute,
    private Comic: ComicService,
    private toastCtrl: ToastController,
    private router: Router
  ) { }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.Comic.get(id).subscribe((value: any) => {
      this.comic = value;
    })
  }

  async setModif(){
    if(!this.modif){
      const alert = await this.alertCtrl.create({
        header: 'Etes-vous sur de vouloir modifier ?',
        subHeader: 'Vous allez rendre la modification possible sur ce comic',
        buttons: [
          {
            text: 'Annuler',
            role: 'Cancel'
          },
          {
            text: 'Confirmer',
            handler: () => { this.modif = !this.modif }
          }
        ]
      });

      await alert.present();
    }
    else {
      this.modif = !this.modif
    }
  }

  async presentToast(){
    const toast = this.toastCtrl.create({
      message: 'Vos modifications ont été enregistrées !',
      duration: 2000
    });
    (await toast).present();
  }

  onModif(){
    this.Comic.update(this.comic).subscribe(() => {
      this.presentToast();
      this.modif = false;
    });
  }

  onDelete(id: any) {
    this.Comic.delete(id);
    this.router.navigate(['/tab/comics']);
  }
}
