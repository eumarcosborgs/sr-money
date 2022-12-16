export const theme = {
  colors: {
    white: '#fff',

    'green-300': '#00B37E',
    'green-500': '#00875F',
    'green-700': '#015F43',

    'red-300': '#F75A68',
    'red-500': '#AB222E',
    'red-700': '#7A1921',

    'neutral-100': '#eef1f5',
    'neutral-200': '#f5f5f5',
    'neutral-300': '#cfd7e3',
    'neutral-400': '#afbdd0',
    'neutral-500': '#a1a7ae',
    'neutral-600': '#4d4f51',
    'neutral-700': '#393e48',
    'neutral-800': '#202329',
    'neutral-900': '#18171d',
  },
  radius: {
    card: '0.5rem',
    popover: '1rem',
    modal: '1rem',
    notification: '0.5rem',
  },
  layers: {
    base: 1,
    alwaysOnTop: 2,
  },
  shadow: {
    'green-300': '#002c1f',

    'red-300': '#5e2329',
    'red-500': '#440c11',

    'neutral-500': '#a1a7ae20',
  },
  fontSizes: {
    disclaimer: '1.2rem',
    small: '1.4rem',
    paragraph: '1.6rem',
    subtitle: '2.2rem',
    title: '3.2rem',
  },
  dropShadow: {
    card: '0 0 10rem 1rem rgba(0, 0, 0, 0.1)',
    popover: '0 0 10rem 1rem rgba(0, 0, 0, 0.1)',
  },
} as const
