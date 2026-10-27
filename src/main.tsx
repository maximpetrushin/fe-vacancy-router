import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {BrowserRouter} from "react-router";
import {createTheme, type MantineColorsTuple, MantineProvider} from "@mantine/core";
import '@mantine/core/styles.css';
import {Provider} from 'react-redux'
import {store} from './store/store.ts'
import App from './App.tsx'


const primary: MantineColorsTuple = [
    "#eef2ff",
    "#dbe4ff",
    "#bac8ff",
    "#91a7ff",
    "#748ffc",
    "#597ef7",
    "#4263eb",
    "#364fc7",
    "#2f44ad",
    "#24368f",
];

const black: MantineColorsTuple = [
    '#0F0F10',
    '#0F0F10',
    '#0F0F10',
    '#0F0F10',
    '#0F0F10',
    '#0F0F10',
    '#0F0F10',
    '#0F0F10',
    '#0F0F10',
    '#0F0F10',
]


const background: MantineColorsTuple = [
    '#F6F6F7',
    '#F6F6F7',
    '#F6F6F7',
    '#F6F6F7',
    '#F6F6F7',
    '#F6F6F7',
    '#F6F6F7',
    '#F6F6F7',
    '#F6F6F7',
    '#F6F6F7',
]

const lightGray: MantineColorsTuple = [
    'rgba(15, 15, 16, 0.3)',
    'rgba(15, 15, 16, 0.3)',
    'rgba(15, 15, 16, 0.3)',
    'rgba(15, 15, 16, 0.3)',
    'rgba(15, 15, 16, 0.3)',
    'rgba(15, 15, 16, 0.3)',
    'rgba(15, 15, 16, 0.3)',
    'rgba(15, 15, 16, 0.3)',
    'rgba(15, 15, 16, 0.3)',
    'rgba(15, 15, 16, 0.3)',
]

const theme = createTheme({
    colors: {
        primary,
        black,
        lightGray,
        background,

    },
    primaryColor: 'primary',
});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
      <BrowserRouter>
          <Provider store={store}>
              <MantineProvider theme={theme}>
                  <App />
              </MantineProvider>
          </Provider>
      </BrowserRouter>
  </StrictMode>,
)
