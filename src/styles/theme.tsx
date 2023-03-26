import { extendTheme } from '@chakra-ui/react';

export const theme = extendTheme({
  colors: {
    green: {
      light: '#3ACB06'
    },
    cardBg: {
      dark: '#565555'
    }
  },
  fonts: {
    heading: 'Roboto',
    body: 'Roboto',
  },
  components: {
    FormLabel: {
      baseStyle: {
        paddingTop: "1rem",
        margin: '0',
        fontSize: '2xl',
        fontWeight: 'bold'
      }
    },
    Text: {
      variants: {
        card: {
          bg: 'white',
          color: 'blackAlpha.900',
          paddingX: '0.75rem',
          paddingY: '0.4rem',
          borderRadius: '4px'
        }
      }
    },
    Select: {
      baseStyle: {
        field: {
          backgroundColor: 'white',
          color: 'blackAlpha.700'
        },
        icon: {
          color: 'blackAlpha.900',
        }
      }
    }
  },
  styles: {
    global: {
      body: {
        bg: '#FEFEFE',
        color: 'blackAlpha.900',
      },
      option: {
        color: 'red'
      }
    },
  }
});
