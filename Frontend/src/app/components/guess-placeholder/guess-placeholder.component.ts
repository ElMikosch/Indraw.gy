import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Observable } from 'rxjs';
import { DoodleNetEntry } from 'src/app/models/doodle-net-entry';

@Component({
  selector: 'app-guess-placeholder',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './guess-placeholder.component.html',
  styleUrls: ['./guess-placeholder.component.scss'],
})
@UntilDestroy()
export class GuessPlaceholderComponent implements OnInit {
  @Input() word$!: Observable<DoodleNetEntry>;

  public wordCounts: number[] = [];

  constructor() {}

  ngOnInit(): void {
    this.word$.pipe(untilDestroyed(this)).subscribe((doodle) => {
      this.wordCounts = [];
      doodle.translation.split(' ').map((x) => this.wordCounts.push(x.length));
    });
  }
}
