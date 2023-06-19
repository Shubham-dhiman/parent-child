import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ParentChildService {
  newMoney!: any;
  constructor() {}

  sendMoney(data: any) {
    this.newMoney = data.forEach((element: any) => {
      element.money += 10;
    });
  }

  getMoney(data: any) {
    this.newMoney = data.forEach((element: any) => {
      element.money -= 10;
    });
  }

  receiveMoney() {
    return this.newMoney;
  }
}
