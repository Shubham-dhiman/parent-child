import { Component, ViewChild } from '@angular/core';
import { ChildComponentComponent } from '../child-component/child-component.component';
import { ParentChildService } from '../../services/parent-child.service';
import { Subscription, interval } from 'rxjs';

@Component({
  selector: 'app-parent-component',
  templateUrl: './parent-component.component.html',
  styleUrls: ['./parent-component.component.css'],
})
export class ParentComponentComponent {
  parentData: any[] = [
    { name: 'Jack', money: 20 },
    { name: 'Jill', money: 20 },
  ];

  @ViewChild('child') child!: ChildComponentComponent;

  parentButton: any[] = [];
  layout = 'row';
  subs!: Subscription;
  constructor(private service: ParentChildService) {}

  ngOnInit() {
    this.sendMoneyEveryMin();
  }

  //Add buttons using *ngFor like “Send Money to {{name}}”  on ParentComponent to send $10 on click to ChildComponents and add to child’s money.
  sendMoney(name: any) {
    const money = 10;
    this.parentData.forEach((ele) => {
      if (ele.name === name) {
        ele.money = ele.money + money;
      }
    });
  }

  //Add buttons “Get Money from {{name}}” e.g. “Get Money from Jill” on ParentComponent to subtract 10 on each click by calling a function of ChildComponents.
  getMoney(name: any) {
    this.child.substractMoney(name);
  }

  substractMoney(event: any) {
    this.parentData.forEach((ele) => {
      if (ele.name === event.name) {
        ele.money = event.money;
      }
    });
  }

  addChildMoney(amount: number) {
    this.parentData.forEach((ele) => {
      ele.money = ele.money - amount;
    });
  }

  //Implement two radio buttons [one for row and other column] to show children in row or column fxLayout.
  radioCheck(event: any) {
    this.layout = event.target.id;
  }

  //Implement service using rxJS and send and receive money from one or all children.
  sendMoneyAll() {
    this.service.sendMoney(this.parentData);
  }

  //Implement service using rxJS and send and receive money from one or all children.
  getMoneyAll() {
    this.service.getMoney(this.parentData);
  }

  //Send money every 1 minute to child automatically from parent using rxJS interval, and mergemap.
  sendMoneyEveryMin() {
    this.subs = interval(5000).subscribe(() => {
      this.parentData.forEach((els: any) => {
        els.money += 10;
      });
    });
  }
}
