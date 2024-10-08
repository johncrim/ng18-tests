import { AfterContentInit, ChangeDetectionStrategy, Component, contentChildren, effect, inject, Input, model, untracked, ViewEncapsulation } from '@angular/core';
import { ListState } from './ListState';
import { OptionComponent } from '../option/option.component';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [],
  template: '<ng-content />',
  styleUrl: './list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  providers: [
    ListState
  ],
  host: {
    'tabindex': '0'
  }
})
export class ListComponent<TKey> { //implements AfterContentInit {

  private readonly _state = inject<ListState<TKey>>(ListState);

  readonly activeIndex = model<number | null>(null);

  readonly selected = model<TKey[]>([]);

  private readonly options = contentChildren<OptionComponent<TKey>>(OptionComponent);

  @Input()
  set setActiveIndex(i: number) {
    this.activeIndex.set(i);
  }

  constructor() {
    effect(() => this._updateOptionIndexes())

    // 2-way sync to ListState.activeIndex
    effect(() => this.activeIndex.set(this._state.activeIndex()), { allowSignalWrites: true });
    this.activeIndex.subscribe(i => {
      this._state.activeIndex.set(i)
    });

    // 2-way sync to ListState.selected
    effect(() => this.selected.set(this._state.selected()), { allowSignalWrites: true });
    this.selected.subscribe(sel => this._state.selected.set(sel));
  }

  // Needed for initialization?
  // ngAfterContentInit(): void {
  //   this._updateOptionIndexes();
  // }

  public moveActive(offset: number = 1) {
    untracked(() => {
      const countOptions = this.options().length;
      if (countOptions > 0) {
        let index = (this.activeIndex() ?? -1) + offset;
        if (index < 0) {
          index = 0;
        }
        if (index > countOptions - 1) {
          index = countOptions - 1;
        }
        this.activeIndex.set(index);
      }
    });
  }

  public toggleActive() {
    untracked(() => {
      const activeIndex = this.activeIndex();
      if (activeIndex != null) {
        const activeOption = this.options().at(activeIndex);
        if (activeOption) {
          this._state.toggle(activeOption.key());
        }
      }
    })
  }

  private _updateOptionIndexes() {
    const optionComponents = this.options();
    for (let i = 0; i < optionComponents.length; ++i) {
      optionComponents[i].index = i;
    }
  }
}
