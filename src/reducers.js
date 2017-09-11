import { combineReducers } from 'redux';
import { reducer as general } from './containers';
import { reducer as metronome } from './containers/Metronome';

export default combineReducers({
  metronome, general
});
