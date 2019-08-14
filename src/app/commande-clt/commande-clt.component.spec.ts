import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CommandeCltComponent } from './commande-clt.component';

describe('CommandeCltComponent', () => {
  let component: CommandeCltComponent;
  let fixture: ComponentFixture<CommandeCltComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CommandeCltComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CommandeCltComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
