export const delay = (ms: number) => new Promise<void>(resolve => setTimeout(resolve, ms));

const divmod = (n: number, d: number) => [Math.trunc(n / d), n % d];

export const humanizeMinutes = (minutes: number, withDays: boolean = false): string => {
  let days = 0, hours;

  if (withDays) {
    [days, minutes] = divmod(minutes, 60 * 24);
  }

  [hours, minutes] = divmod(minutes, 60);

  return [
    days ? `${days}д` : '',
    hours ? `${hours}ч` : '',
    minutes ? `${minutes}м` : '',
  ].join(' ');
};

export const getFormattedTime = (date: Date) => {
  return date.toLocaleTimeString('ru', {
    timeZone: 'UTC',
    hour: 'numeric',
    minute: 'numeric',
  });
};

export const addMinutes = (date: Date, minutes: number) => {
  return new Date(date.getTime() + minutes * 60 * 1000);
};

const createCountFormatter = (one: string, two: string, few: string) => {
  const titles = [one, two, few];

  return (n: number) => {
    const cases = [2, 0, 1, 1, 1, 2];

    return titles[
      n % 100 > 4 && n % 100 < 20
        ? 2
        : cases[n % 10 < 5 ? n % 10 : 5]
      ];
  };
};

const stopsCountFormatter = createCountFormatter('пересадка', 'пересадки', 'пересадок');

export const stopsFormatter = (n: number) => {
  switch (n) {
    case 0:
      return `Без ${stopsCountFormatter(n)}`;
    default:
      return `${n} ${stopsCountFormatter(n)}`;
  }
};

