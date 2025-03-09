import getLocalStorage from './getLocalStorage';
import setToLocalStorage from './setToLocalStorage';

export default function getWorkValue(value) {
  if(value) setToLocalStorage('workValue', value);
  return getLocalStorage('workValue') || 25;
}