import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  fakeUrl: string = 'https://api.mocki.io/v1/e29c69d2';
  constructor(private http: HttpClient) {}

  sendMessage(messageContent: any) {
    return this.http.post(this.fakeUrl, JSON.stringify(messageContent), {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      responseType: 'text',
    });
  }
}
