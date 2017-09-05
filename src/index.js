import Tone from 'tone';
import { debug } from './utils';

var synth = new Tone.Synth({
	"oscillator" : {
		"type" : "pwm",
		"modulationFrequency" : 0.2
	},
	"envelope" : {
		"attack" : 0.02,
		"decay" : 0.1,
		"sustain" : 0.2,
		"release" : 0.9,
	}
}).toMaster();
// synth.triggerAttackRelease('C4', '8n');
var polySynth = new Tone.PolySynth(4, Tone.Synth).toMaster();
//play a chord

const play = async () => {
  polySynth.triggerAttackRelease(["C5", "E5", "G4", "B4"], "2n");
  // await sleep(1500);
  polySynth.triggerAttackRelease(["G5", "B5", "D4", "F4"], "2n");
}
play();
