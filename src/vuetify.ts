import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import { aliases, mdi } from 'vuetify/iconsets/mdi'
import '@mdi/font/css/materialdesignicons.css' // Ensure you are using css-loader

const vuetify = createVuetify({
  components,
  directives,
  icons: {
    defaultSet: 'mdi',
    aliases,
    sets: {
      mdi,
    },
  },
  theme: {
    themes: {
      dark: {
        colors: {
          background: '#021720',//'#111a24', // Dark charcoal for the main background, matching the dark areas of the image
          surface: '#202c3d',//'#16212d', 
          primary: '#236fc1',
          secondary: '#CCCCCC',
          accent: '#FFD700',
          error: '#FF5252',
          info: '#2196F3',
          success: '#4CAF50',
          warning: '#FB8C00'
        },
      },
    },
    defaultTheme: 'dark',
  },
})

export { vuetify }
