import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GameService {
  userName$ = new BehaviorSubject('');
  constructor() {}
}

export const deneme = new BehaviorSubject('');
