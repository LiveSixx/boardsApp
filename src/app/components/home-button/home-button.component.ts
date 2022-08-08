import { Component } from '@angular/core';
import { GlobalConstants } from 'src/app/common/global-constants';

@Component({
  selector: 'app-home-button',
  templateUrl: './home-button.component.html',
  styleUrls: ['./home-button.component.scss']
})
export class HomeButtonComponent {
  
  color:string = GlobalConstants.ripplerColor;
  smileState = "sentiment_satisfied";
}
