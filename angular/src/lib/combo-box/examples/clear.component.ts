import { Component } from '@angular/core';

@Component({
  selector: 'example-combo-box-clear',
  template: `
    <md-combo-box
      [options]="flag % 2 === 0 ? options : options2"
      [clear]="true"
      searchProp="phoneNumber"
      (select)="onSelect($event)"
      (inputValueChange)="onChange($event)"
      (handleClear)="onClear()"
    ></md-combo-box>
  `,
})
export class ExampleComboBoxClearComponent {
  flag = 0;

  options = [
    {
      phoneNumber: "2143195555",
      extension: "619",

    },
    {
      phoneNumber: "2143365815",
      extension: "5815",

    },
    {
      phoneNumber: "2148263555",
      extension: "385",

    },
    {
      phoneNumber: "2149237155",
      extension: "7155",

    },
  ];

  options2 = [
    {
      phoneNumber: "abc",
      extension: "619",

    },
    {
      phoneNumber: "bcd",
      extension: "5815",

    },
    {
      phoneNumber: "efgh",
      extension: "385",

    },
    {
      phoneNumber: "adfg",
      extension: "7155",

    },
  ];
  

  onSelect(option: Object | string) {}
  onChange(event: Event) {
    //console.log(event);
    setTimeout(() => {
      this.flag++;
      console.log(this.flag);
    }, 1000);
  }

  onClear() {
    console.info('cleared');
  }
}
