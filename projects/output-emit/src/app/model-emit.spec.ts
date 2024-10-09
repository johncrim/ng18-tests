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

  it('@Input model.set() emits when changed after create', () => {
    spectator = createHost(`<test-model [setModelValue]="initialValue" />`, {
      hostProps: {
        initialValue: null
      }
    });
    expect(spectator.component.model()).toBe(null);
    expect(spectator.component.emitted).toEqual([]);

    spectator.setHostInput('initialValue', 2);
    expect(spectator.component.model()).toBe(2);
    expect(spectator.component.emitted).toEqual([2]);
  });

  it('model input is emitted (fails)', () => {
    spectator = createHost(`<test-model [model]="3" />`);
    expect(spectator.component.model()).toBe(3);
    expect(spectator.component.emitted).toEqual([3]); // fails b/c model binding to regular object doesn't emit
  });

  it('model input emits when changed after create', () => {
    spectator = createHost(`<test-model [model]="initialValue" />`, {
      hostProps: {
        initialValue: null
      }
    });
    expect(spectator.component.model()).toBe(null);
    expect(spectator.component.emitted).toEqual([]);

    spectator.setHostInput('initialValue', 2);
    expect(spectator.component.model()).toBe(2);
    expect(spectator.component.emitted).toEqual([2]); // fails b/c model binding to regular object doesn't emit
  });

});
