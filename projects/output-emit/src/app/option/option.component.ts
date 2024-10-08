import { ChangeDetectionStrategy, Component, computed, inject, input, ViewEncapsulation } from '@angular/core';
import { ListState } from '../list/ListState';

@Component({
  selector: 'app-option',
  standalone: true,
  imports: [],
  template: '<ng-content />',
  styleUrl: './option.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host: {
    '[class.is-active]': 'isActive()',
    '[class.is-selected]': 'isSelected()'
  }
})
export class OptionComponent<TKey> {

  private readonly _state = inject<ListState<TKey>>(ListState);

  readonly key = input.required<TKey>();

  /** @internal */
  index?: number;

  readonly isActive = computed(() => this._state.activeIndex() === this.index);
  readonly isSelected = computed(() => this._state.selected().includes(this.key()));


}
