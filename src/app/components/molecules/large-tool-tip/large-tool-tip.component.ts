import { Component, OnInit , Input } from '@angular/core';

@Component({
  selector: 'nwn-large-tool-tip',
  templateUrl: './large-tool-tip.component.html',
  styleUrls: ['./large-tool-tip.component.css']
})
export class LargeToolTipComponent implements OnInit {

  @Input()
  scenario : any = null

  constructor() { }

  ngOnInit(): void {
  }

}
