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
            handler: () => (this.modif = !this.modif)
          }
        ]
      });

      await alert.present();
      await alert.onDidDismiss();
    }
    else {
      this.modif = !this.modif
    }
  }

  async presentToast(){
    const toast = this.toastCtrl.create({
      message: 'Vos modifications ont été enregistrées !',
      duration: 1000
    });
    (await toast).present();
  }

  async errorToast() {
    const toast = this.toastCtrl.create({
      message: 'Tous les champs nécessaires n\'ont pas été complétés !',
      duration: 1000
    });
    (await toast).present()
  }


  onModif(){
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
          this.Comic.update(this.comic).subscribe(() => {
            this.presentToast();
            this.modif = false;
          });
        }
      }
      else {
        this.Comic.update(this.comic).subscribe(() => {
          this.presentToast();
          this.modif = false;
        });
      }
    }
  }

  onDelete(id: any) {
    this.Comic.delete(id);
    this.router.navigate(['/tab/comics']);
  }
}
