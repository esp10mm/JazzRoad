import { Map } from 'immutable';

const INIT_STATE = Map({ hi: 0 });
const NAME = 'metronome';

const funcs = {};

funcs[`hi_${NAME}`] = (state, data) => {
  return state.set('hi', state.get('hi') + data);
}

export const reducer = (state = INIT_STATE, action) => {
  if (funcs[action.type]) {
    return funcs[action.type](state, action.data);
  }
  return state;
};

export const name = NAME;
