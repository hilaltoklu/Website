import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InterestsPage } from './interests.page';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TranslateModule } from '@ngx-translate/core';

describe('InterestsPage', () => {
  let component: InterestsPage;
  let fixture: ComponentFixture<InterestsPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        InterestsPage,
        HttpClientTestingModule,
        TranslateModule.forRoot()
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(InterestsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
