import { extendTheme } from '@chakra-ui/react'

const theme = extendTheme({
  fonts: {
    body: 'Inter, system-ui, sans-serif',
    heading: 'Work Sans, system-ui, sans-serif',
  },
  colors: {
    discord: '#7289da',
  },
  shadows: {
    largeSoft: 'rgba(60, 64, 67, 0.15) 0px 2px 10px 6px;',
  },
  styles: {
    global: {
      'html, #__next': {
        height: '100%',
      },
      '#__next': {
        display: 'flex',
        flexDirection: 'column',
      },
      '.body': {
        // todo check how to do this without breaking the site
        height: '100%', // Push footer to bottom
        overflowY: 'scroll', // Always show scrollbar to avoid flickering
      },
      html: {
        scrollBehavior: 'smooth',
      },
    },
  },
  config: {
    useSystemColorMode: false,
    initialColorMode: 'dark',
    cssVarPrefix: 'inspektre-ui',
  },
})

export default theme;