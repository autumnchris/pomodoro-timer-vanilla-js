import getLocalStorage from './getLocalStorage';
import setToLocalStorage from './setToLocalStorage';

export default function getBreakValue(value) {
  if(value) setToLocalStorage('breakValue', value);
  return getLocalStorage('breakValue') || 5;
}