import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { store } from './store/index.ts'
import { Provider } from 'react-redux'
import AppWrapper from './AppWrapper.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store} >
      <AppWrapper />
    </Provider>
  </StrictMode>,
)
