import { Component, OnInit } from '@angular/core';
import {ComicService} from "../comic.service";

@Component({
  selector: 'app-comics-list',
  templateUrl: './comics-list.page.html',
  styleUrls: ['./comics-list.page.scss'],
})
export class ComicsListPage implements OnInit {

  comics!: any;
  constructor(
    private Comic : ComicService
  ) { }

  ngOnInit(): void {
    this.Comic.getAllComics().subscribe((data: any) => {
      this.comics = data;
    })
  }

}
