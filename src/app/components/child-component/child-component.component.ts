import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ParentChildService } from '../../services/parent-child.service';

@Component({
  selector: 'app-child-component',
  templateUrl: './child-component.component.html',
  styleUrls: ['./child-component.component.css'],
})
export class ChildComponentComponent {
  @Input() Name: any;
  @Output() money: EventEmitter<any> = new EventEmitter<any>();
  @Output() addMoneyEvent = new EventEmitter<number>();
  constructor(private service: ParentChildService) {}

  ngOnInit() {}

  substractMoney(data: any) {
    const substracted = {
      name: data.name,
      money: data.money - 10,
    };
    this.money.emit(substracted);
  }

  getMoney() {
    this.addMoneyEvent.emit(5);
  }

  getMoneyFromService() {
    this.Name = this.service.receiveMoney();
  }
}
