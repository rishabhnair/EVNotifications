import { Component, OnInit, Input} from '@angular/core';

@Component({
  selector: 'app-pole',
  templateUrl: './pole.component.html',
  styleUrls: ['./pole.component.css']
})
export class PoleComponent implements OnInit {
  @Input() pole;

  constructor() { }

  ngOnInit() {
  }

}
