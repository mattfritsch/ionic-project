import {Component, enableProdMode, OnInit} from '@angular/core';
import {Camera, CameraResultType, CameraSource} from "@capacitor/camera";
import {environment} from "../../environments/environment";
import {platformBrowserDynamic} from "@angular/platform-browser-dynamic";
import {AppModule} from "../app.module";
import {defineCustomElements} from "@ionic/pwa-elements/loader";

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule).catch(err => console.log(err));

defineCustomElements(window);

@Component({
  selector: 'app-photo',
  templateUrl: './photo.page.html',
  styleUrls: ['./photo.page.scss'],
})
export class PhotoPage implements OnInit {
  public photos: picture[] = [];

  constructor() { }

  // eslint-disable-next-line @angular-eslint/no-empty-lifecycle-method
  ngOnInit() {
  }

  async addNewPhoto() {
    const capture = await Camera.getPhoto({
      resultType: CameraResultType.Uri,
      source: CameraSource.Camera,
      quality: 100
    })
    this.photos.unshift(<picture>{
      filepath: ' ',
      webviewPath: capture.webPath
    })
  }

  takePhoto(){
    this.addNewPhoto();
  }

}
export interface picture {
  filepath: string;
  webviewPath: string;
}
