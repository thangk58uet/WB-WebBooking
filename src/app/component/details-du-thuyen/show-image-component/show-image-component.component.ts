import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-show-image-component',
  templateUrl: './show-image-component.component.html',
  styleUrls: ['./show-image-component.component.scss']
})
export class ShowImageComponentComponent implements OnInit {

  @Input() linkImage = '';
  @Input() name = '';
  constructor() { }

  ngOnInit() {
  }

}
