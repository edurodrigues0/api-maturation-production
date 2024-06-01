export interface Consume {
  id: string;
  sumOfLitersOfAlcool: number;
  sumOfLitersOfGlueFilm: number;
  totalOfPiecesOfAlcool: number;
  totalOfPiecesOfGlueFilm: number;
  month: number;
  year: number;
  totalRecordsOfAlcool: number;
  totalRecordsOfGlueFilm: number;
}

export interface MetricsRepository {
  consumeOnLastDay(): Promise<Consume>
  
  consumeOnLastMonth(): Promise<Consume>

  consumeOnLastSixMonths(): Promise<Consume[]>
  consumeOnLastTwelveMonths(): Promise<Consume[]>
}