import { debug } from './utils';
import Score from './models/Score';
var s = new Score({
  bpm: 120,
  bars: {
    0: [
      { note: 'G2', duration: 1, beat: 1 },
      { note: 'E2', duration: 1, beat: 2 },
      { note: 'E2', duration: 1, beat: 3 }
    ],
    1: [
      { note: 'F2', duration: 1, beat: 1 },
      { note: 'D2', duration: 1, beat: 2 },
      { note: 'D2', duration: 1, beat: 3 }
    ],
    2: [
      { note: 'C2', duration: 1, beat: 1 },
      { note: 'D2', duration: 1, beat: 2 },
      { note: 'E2', duration: 1, beat: 3 },
      { note: 'F2', duration: 1, beat: 4 }
    ],
    3: [
      { note: 'G2', duration: 1, beat: 1 },
      { note: 'G2', duration: 1, beat: 2 },
      { note: 'G2', duration: 1, beat: 3 }
    ],
  }
})
s.play();
