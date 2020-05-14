/**
 * Make sure to import only languages used, and delete other imports and files 
 * so we can easily check which components need translations in Authoring tool
 */
import hr from './translations/hr.js';
import en from './translations/en.js';
import bg from './translations/bg.js';
import sr from './translations/sr.js';

export default 
{
  'hr': { 'pkc-name': hr },
  'en': { 'pkc-name': en },
  'bg': { 'pkc-name': bg },
  'sr': { 'pkc-name': sr },
};