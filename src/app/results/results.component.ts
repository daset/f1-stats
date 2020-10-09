import { Component, OnInit } from '@angular/core';
import { ErgastService } from '../ergast.service';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css'],
})
export class ResultsComponent implements OnInit {
  years: number[] = [...Array(71).keys()].map(function (val) {
    return 1950 + val;
  });
  races: any = null;
  displayedColumns: string[] = ['position', 'points', 'driver', 'constructor'];
  isLoading: boolean = false;

  constructor(public service: ErgastService) {}

  ngOnInit(): void {}

  loadResults(event) {
    this.isLoading = true;
    this.service.getResults(event.value).subscribe(
      (resp: any) => {
        this.isLoading = false;
        this.races = resp.MRData.RaceTable.Races;
        console.log(this.races);
      },
      (error) => (this.isLoading = false)
    );
  }
}
