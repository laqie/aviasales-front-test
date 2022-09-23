import { ObservableEvent, ObservableStore } from '@carex/core';
import { combineLatest } from 'rxjs';
import { debounceTime, distinctUntilChanged, map, startWith } from 'rxjs/operators';
import { fetchSearchIdFx$, fetchTicketsFx$ } from '../tickets';
import { darkTheme, theme } from '../../stitches.config';
import cookies from 'js-cookie';


export const THEME_COOKIE_NAME = 'APP_THEME';
export const lightThemeClass = theme.className;
export const darkThemeClass = darkTheme.className;

function getInitialTheme() {
  const cookieTheme = cookies.get(THEME_COOKIE_NAME);
  if (!cookieTheme) {
    const isPreferDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    return isPreferDark ? darkThemeClass : lightThemeClass;
  }

  return cookieTheme === 'dark' ? darkThemeClass : lightThemeClass;
}


export const appMounted$ = new ObservableEvent();
export const appReady$ = new ObservableStore(false);
export const pending$ = combineLatest(
  [fetchTicketsFx$.pending$, fetchSearchIdFx$.pending$],
).pipe(
  map(states => states.some(Boolean)),
  distinctUntilChanged(),
  debounceTime(100),
  startWith(true),
);


export const appTheme$ = new ObservableStore<string>(getInitialTheme());
export const toggleTheme$ = new ObservableEvent();
export const isLightTheme$ = appTheme$.pipe(
  map(theme => theme === lightThemeClass),
  distinctUntilChanged(),
);
