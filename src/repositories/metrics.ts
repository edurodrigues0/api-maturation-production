export interface Consume {
  id: string;
  sumOfMinilitersOfAlcool: number
  sumOfMinilitersOfFinalTrim: number
  sumOfMinilitersOfDoubleSidedGlue: number
  totalOfPiecesOfAlcool: number
  totalOfPiecesOfFinalTrim: number
  totalOfPiecesOfDoubleSidedGlue: number
  month: number
  year: number
  totalRecordsOfAlcool: number
  totalRecordsOfGlueFilm: number
  totalRecordsOfDoubleSidedGlue: number
}

export interface MetricsRepository {
  consumeOnLastDay(): Promise<Consume>
  
  consumeOnLastMonth(): Promise<Consume>

  consumeOnLastSixMonths(): Promise<Consume[]>
  consumeOnLastTwelveMonths(): Promise<Consume[]>
}