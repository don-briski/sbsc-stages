import { Component, signal, WritableSignal } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Stage {
  name: string;
  items: string[];
}

@Component({
  selector: 'app-stages',
  standalone: true,
   imports: [NgFor, NgIf, FormsModule],
  templateUrl: './stages.component.html',
  styleUrl: './stages.component.scss'
})
export class StagesComponent {
  newItem: string = '';
  private clickTimeout: any = null;
  private readonly DOUBLE_CLICK_DELAY = 250;

  stages: Stage[] = [
    { name: 'Idea', items: [] },
    { name: 'Prototype', items: [] },
    { name: 'Development', items: [] },
    { name: 'Ship', items: [] }
  ];

  addItem() {
    if (this.newItem.trim()) {
      this.stages[0].items.push(this.newItem.trim());
      this.newItem = '';
    }
  }

  handleClick(stage: Stage, item: string) {
    if (this.clickTimeout === null) {
      this.clickTimeout = setTimeout(() => {
        this.moveItemForward(stage, item);
        this.clickTimeout = null;
      }, this.DOUBLE_CLICK_DELAY);
    } else {
      clearTimeout(this.clickTimeout);
      this.clickTimeout = null;
      this.moveItemBackward(stage, item);
    }
  }

  private moveItemForward(stage: Stage, item: string) {
    const currentIndex = this.stages.indexOf(stage);
    if (currentIndex < this.stages.length - 1) {
      this.removeItem(stage, item);
      this.stages[currentIndex + 1].items.push(item);
    }
  }

  private moveItemBackward(stage: Stage, item: string) {
    const currentIndex = this.stages.indexOf(stage);
    if (currentIndex > 0) {
      this.removeItem(stage, item);
      this.stages[currentIndex - 1].items.push(item);
    }
  }

  private removeItem(stage: Stage, item: string) {
    const itemIndex = stage.items.indexOf(item);
    if (itemIndex > -1) {
      stage.items.splice(itemIndex, 1);
    }
  }

  ngOnDestroy() {
    if (this.clickTimeout) {
      clearTimeout(this.clickTimeout);
    }
  }
}
