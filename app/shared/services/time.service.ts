import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, shareReplay } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TimeService {
  timePerQuestion = 20;
  completionTime: number;
  elapsedTime = 0;
  elapsedTimes = [];

  public timeLeft = new BehaviorSubject<number>(this.timePerQuestion);
  public getTimeLeft$ = this.timeLeft.asObservable();

  constructor() {}

  resetTimer() {
    this.timeLeft.next(this.timePerQuestion);
  }

  stopTimer() {
    this.timeLeft.next(this.timePerQuestion - this.elapsedTime);
  }

  addQuizDelay(milliseconds) {
    const start = new Date().getTime();
    let counter = 0;
    let end = 0;

    while (counter < milliseconds) {
      end = new Date().getTime();
      counter = end - start;
    }
  }

  addElapsedTimeToElapsedTimes(elapsedTime) {
    this.elapsedTimes = [...this.elapsedTimes, elapsedTime];
    this.completionTime = this.calculateTotalElapsedTime(this.elapsedTimes);
  }

  calculateTotalElapsedTime(elapsedTimes?: any) {
    if (this.elapsedTimes) {
      return this.completionTime = this.elapsedTimes.reduce((acc, cur) => acc + cur, 0);
    }
  }
}
