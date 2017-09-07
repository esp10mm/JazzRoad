// {
//   bpm: 150,
//   loop: true,
//   bars: {
//     3: [
//       { note: 'A', duration: 3, beat: 0 }
//     ]
//   }
// }

import Tone from 'tone';
import { debug, sleep } from '../utils';

export default class Score {
  constructor({ bars, bpm, loop }) {
    this.blength = 60 / bpm; // second
    this.bpb = 4; //should apply dynamic bpb
    this.bars = [];
    this.synthSet = {
      oscillator : {
        type : 'pwm',
        modulationFrequency : 0.2
      },
      envelope : {
        attack : 0.02,
        decay : 0.1,
        sustain : 0.2,
        release : 0.9,
      }
    };

    let barsLength = 0;
    for (const k in bars) {
      const i = parseInt(k, 10);
      barsLength = i > barsLength ? i : barsLength;
      bars[i].sort((a, b) => (a.beat - b.beat));
      this.bars[i] = bars[i];
      this.bars[i] = this.bars[i].map((n) => {
        n.duration *= this.blength;
        n.beat *= (this.blength * 1000);
        return n;
      });
    }
    for (let i = 0; i < this.bars.length; i += 1) {
      if (!this.bars[i]) {
        this.bars[i] = [];
      }
    }
  }
  async play() {
    debug(this.bars);
    for (let i = 0; i < this.bars.length; i += 1) {
      for (let j = 0; j < this.bars[i].length; j += 1) {
        const note = this.bars[i][j];
        const synth = new Tone.Synth(this.synthSet).toMaster();
        setTimeout(() => {
          synth.triggerAttackRelease(note.note, note.duration);
        }, this.bars[i][j].beat);
      }
      await sleep(this.bpb * this.blength);
    // this.synth.triggerAttackRelease('G3', this.blength);
    // await sleep(this.blength);
    // this.synth.triggerAttackRelease('E3', this.blength);
    // await sleep(this.blength);
    // this.synth.triggerAttackRelease('E3', this.blength);
    // await sleep(this.blength);
    // await sleep(this.blength);
    // this.synth.triggerAttackRelease('F3', this.blength);
    // await sleep(this.blength);
    // this.synth.triggerAttackRelease('D3', this.blength);
    // await sleep(this.blength);
    // this.synth.triggerAttackRelease('D3', this.blength);
    }
  }
}
