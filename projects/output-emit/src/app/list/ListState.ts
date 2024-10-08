import { Injectable, signal } from '@angular/core';

@Injectable()
export class ListState<TKey> {

  readonly activeIndex = signal<number | null>(null);

  readonly selected = signal<TKey[]>([]);

  public select(...keys: TKey[]) {
    this.selected.set(keys);
  }

  public toggle(key: TKey) {
    const s = this.selected();
    const i = s.indexOf(key);
    if (i === -1) {
      this.selected.set([...s, key]);
    }
    else {
      s.splice(i, 1)
      this.selected.set([...s]);
    }
  }

}
