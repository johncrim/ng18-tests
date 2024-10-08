import { Component } from '@angular/core';
import { ListComponent } from './list/list.component';
import { OptionComponent } from './option/option.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ListComponent, OptionComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'output-emit';
}
