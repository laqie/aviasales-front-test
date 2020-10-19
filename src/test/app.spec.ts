import { createElement } from 'react';
import { appMounted$ } from '../models/app';
import { render } from '@testing-library/react';
import App from '../App';


describe('app model', () => {
  it('should trigger appMounted$ once on App render', () => {
    const trigger = jest
      .spyOn(appMounted$, 'trigger')
      .mockImplementation(() => {});

    const element = createElement(App, {});

    const { rerender } = render(element);
    expect(trigger).toBeCalledTimes(1);

    rerender(element);

    expect(trigger).toBeCalledTimes(1);
    trigger.mockRestore();
  });
});
