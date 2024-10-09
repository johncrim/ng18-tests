import { Component, Input, model } from '@angular/core';
import { createHostFactory, SpectatorHost } from '@ngneat/spectator';

@Component({
  selector: 'test-model',
  template: '<ng-content></ng-content>'
})
class ModelEmitComponent {

  readonly model = model<number | null>(null);

  // Set of all non-null emitted values.
  readonly emitted: number[] = [];

  @Input()
  set setModelValue(v: number) {
    this.model.set(v);
  }

  constructor() {
    this.model.subscribe(v => {
      if (v !== null) {
        this.emitted.push(v);
      }
    })
  }
}

describe('model() emit', () => {
  let spectator: SpectatorHost<ModelEmitComponent>;
  const createHost = createHostFactory(ModelEmitComponent);

  it('@Input model.set() is emitted', () => {
    spectator = createHost(`<test-model [setModelValue]="3" />`);
    expect(spectator.component.model()).toBe(3);
    expect(spectator.component.emitted).toEqual([3]);
  });

  it('model input is emitted', () => {
    spectator = createHost(`<test-model [model]="3" />`);
    expect(spectator.component.model()).toBe(3);
    expect(spectator.component.emitted).toEqual([3]);
  });

});
