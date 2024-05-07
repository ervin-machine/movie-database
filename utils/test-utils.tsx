import React, { PropsWithChildren } from 'react'
import { render } from '@testing-library/react'
import type { RenderOptions } from '@testing-library/react'
import { Provider } from 'react-redux'
import history from '../src/utilities/history'
import configureStore from '../src/store/configureStore'
import { TMDBListState } from '../src/containers/TMDBList/store/reducers'
import { ConnectedRouter } from 'connected-react-router'
import { HashRouter } from 'react-router-dom'

// This type interface extends the default options for render from RTL, as well
// as allows the user to specify other things such as initialState, store.


interface ExtendedRenderOptions extends Omit<RenderOptions, 'queries'> {
    initialState?: Partial<TMDBListState>
  store?:  any
}

export function renderWithProviders(
  ui: React.ReactElement,
  {
    initialState = {},
    // Automatically create a store instance if no store was passed in
    store = configureStore(initialState, history),
    ...renderOptions
  }: ExtendedRenderOptions
) {
  function Wrapper({ children }: PropsWithChildren<{}>): JSX.Element {
    return <Provider store={store}>
    <ConnectedRouter history={history}>
        <HashRouter>
          {children}
        </HashRouter>
    </ConnectedRouter>
  </Provider>
  }

  return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) }
}