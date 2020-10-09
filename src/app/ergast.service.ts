import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/internal/operators';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators';

const endpoint = 'http://ergast.com/api/f1/';

// export interface Races {
//   _id: string;
//   prod_name: string;
//   prod_desc: string;
//   prod_price: number;
//   updated_at: Date;
// }

@Injectable({
  providedIn: 'root',
})
export class ErgastService {
  constructor(private http: HttpClient) {}

  private extractData(res: Response): any {
    const body = res;
    return body || {};
  }

  private handleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
      console.error('Error:', error.error.message);
    } else {
      console.error(`Error code ${error.status}, ` + `details: ${error.error}`);
    }
    return throwError('Error loading data; please try again later.');
  }

  getResults(year): Observable<any> {
    return this.http
      .get(endpoint + year + '/results.json?limit=400&offset=0')
      .pipe(map(this.extractData), catchError(this.handleError));
  }

  getWinners(year): Observable<any> {
    return this.http
      .get(endpoint + year + '/driverStandings.json?limit=400&offset=0')
      .pipe(map(this.extractData), catchError(this.handleError));
  }
}
