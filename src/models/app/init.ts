import { take } from 'rxjs/operators';
import cookies from 'js-cookie';
import { appReady$, appTheme$, darkThemeClass, lightThemeClass, THEME_COOKIE_NAME, toggleTheme$ } from '.';
import { fetchTicketsFx$ } from '../tickets';


appReady$.on(
  fetchTicketsFx$.result$.pipe(
    take(1),
  ),
  () => true,
);

appTheme$.subscribe(theme => {
  document.body.classList.remove(lightThemeClass, darkThemeClass);
  document.body.classList.add(theme);
  cookies.set(
    THEME_COOKIE_NAME,
    theme === lightThemeClass ? 'light' : 'dark',
    { sameSite: 'strict' },
  );
});

appTheme$
  .on(toggleTheme$, currentTheme => currentTheme === lightThemeClass ? darkThemeClass : lightThemeClass);
