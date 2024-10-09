import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListComponent } from './list.component';
import { createHostFactory, SpectatorHost } from '@ngneat/spectator';

describe('ListComponent', () => {

  let spectator: SpectatorHost<ListComponent<string>>;
  const createHost = createHostFactory(ListComponent<string>);

  it('should create', () => {
    spectator = createHost(`<app-list/>`);
    expect(spectator.component).toBeTruthy();
  });
});
