import { Component, OnInit } from '@angular/core';
import { ErgastService } from '../ergast.service';

@Component({
  selector: 'app-winners',
  templateUrl: './winners.component.html',
  styleUrls: ['./winners.component.css'],
})
export class WinnersComponent implements OnInit {
  years: number[] = [...Array(71).keys()].map(function (val) {
    return 1950 + val;
  });
  winners: any = null;
  displayedColumns: string[] = ['position', 'points', 'driver', 'constructor'];
  isLoading: boolean = false;

  constructor(public service: ErgastService) {}

  ngOnInit(): void {}

  loadResults(event) {
    this.isLoading = true;
    this.service.getWinners(event.value).subscribe(
      (resp: any) => {
        this.isLoading = false;
        this.winners = resp.MRData.StandingsTable.StandingsLists;
        console.log(this.winners);
      },
      (error) => (this.isLoading = false)
    );
  }
}
