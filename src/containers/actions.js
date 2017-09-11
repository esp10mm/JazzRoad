import { name as reducer } from './reducer';
import { debug } from '../utils';

export const hi = () => (
  (dispatch) => {
    dispatch({ type: `hi_${reducer}`, data: 2 });
  }
);

export const updateWindowDime = () => (
  (dispatch) => {
    const width = window.innerWidth;
    const height = window.innerHeight;
    dispatch({ type: `updateWindowDime_${reducer}`, data: { width, height } });
  }
);
