export class Comic {
  id? : string;
  name? : string;
  number? : string;
  description? : string;
  author? : string;
  designer? : string;
  cover? : string;
  isRead? : boolean;
  typeOfList? : string;
  universe? : string;
  seriesNumber? : string;
  isSerie? : boolean;
  releaseDate? : string;

  constructor() {
    this.name = '';
    this.number = '';
    this.description = '';
    this.author = '';
    this.designer = '';
    this.cover = '';
    this.isRead = true;
    this.typeOfList = '';
    this.universe = '';
    this.seriesNumber = '';
    this.isSerie = true;
    this.releaseDate = '';
  }
}
