interface Consume {
  id: string
  sumOfLiters: number
  totalOfPieces: number
  month: number
  year: number
  length: number
}

export interface MetricsRepository {
  consumeOnLastDay(): Promise<{
    consumeAverangeOnLastDay: number,
    totalOfPiecesOnLastDay: number
  }>
  
  consumeOnLastMonth(): Promise<{
    consumeAverangeOnLastMonth: number,
    totalOfPiecesOnLastMonth: number
  }>

  consumeOnLastSixMonths(): Promise<Consume[]>
  consumeOnLastTwelveMonths(): Promise<Consume[]>
}