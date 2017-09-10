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
    // this.synthSet = {
    //   oscillator : {
    //     type : 'pwm',
    //     modulationFrequency : 0.2
    //   },
    //   envelope : {
    //     attack : 0.02,
    //     decay : 0.1,
    //     sustain : 0.2,
    //     release : 0.9,
    //   }
    // };
    this.synth = new Tone.PolySynth(6, Tone.Synth).toMaster();
    // this.synth = new Tone.Synth({
    //   "oscillator" : {
    //     "type" : "pwm",
    //     "modulationFrequency" : 0.2
    //   },
    //   "envelope" : {
    //     "attack" : 0.02,
    //     "decay" : 0.1,
    //     "sustain" : 0.2,
    //     "release" : 0.9,
    //   }
    // }).toMaster();


    let barsLength = 0;
    for (const k in bars) {
      const i = parseInt(k, 10);
      barsLength = i > barsLength ? i : barsLength;
      bars[i].sort((a, b) => (a.beat - b.beat));
      this.bars[i] = bars[i];
      this.bars[i] = this.bars[i].reduce((r, v) => {
        const time = v.beat * this.blength * 1000;
        const duration = v.duration * this.blength;
        const key = `${time}:${duration}`;
        if(!r[key]) {
          r[key] = [];
        }
        r[key].push(v.note);
        // r[key] = v.note;
        return r;
      }, {});
    }
    for (let i = 0; i < this.bars.length; i += 1) {
      if (!this.bars[i]) {
        this.bars[i] = [];
      }
    }
  }
  async play() {
    const TIME_B4_PLAY = 1000;

    for (let i = 0; i < this.bars.length; i += 1) {
      for (const key in this.bars[i]) {
        const time = parseFloat(key.split(':')[0]);
        const duration = parseFloat(key.split(':')[1]);
        const notes = this.bars[i][key];

        setTimeout(() => {
          // var synth = new Tone.Synth().toMaster();
          // synth.triggerAttackRelease(notes, duration);
          this.synth.triggerAttackRelease(notes, duration);
        }, time + TIME_B4_PLAY + (i * this.bpb * this.blength * 1000));
      }
    }
  }
}
