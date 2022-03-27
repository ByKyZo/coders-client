import { TPreloadedState } from '@redux/store';
import { EnhancedStore } from '@reduxjs/toolkit';
import { render as rtlRender, RenderOptions } from '@testing-library/react';
import React, { JSXElementConstructor, ReactElement } from 'react';
import { Provider } from 'react-redux';
import { initStore } from '../../redux/store';

interface RenderReduxParams {
  preloadedState?: TPreloadedState;
  store?: EnhancedStore;
  renderOptions?: RenderOptions;
}

function render(
  ui: ReactElement<any, string | JSXElementConstructor<any>>,
  {
    preloadedState,
    store = initStore(preloadedState),
    ...renderOptions
  }: RenderReduxParams = {}
) {
  function Wrapper({ children }: any) {
    return <Provider store={store}>{children}</Provider>;
  }
  return rtlRender(ui, { wrapper: Wrapper, ...renderOptions });
}

export * from '@testing-library/react';
export { render };

