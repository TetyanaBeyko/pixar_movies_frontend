export interface Movie {
    id: number;
    Title: string;
    Director: string;
    Year: number;
    Length_minutes: number;
  }

  export interface Boxoffice {
    Movie_id: number;
    Rating: number
    Domestic_sales: number
    International_sales: number
  }