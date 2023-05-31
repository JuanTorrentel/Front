import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-progres',
  templateUrl: './progres.component.html',
  styleUrls: ['./progres.component.scss']
})
export class ProgresComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  @Input() progress = 0;

}
