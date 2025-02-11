import { createApp } from 'vue'
import { createPinia } from 'pinia'
import 'vuetify/styles'
import { ptBR } from 'date-fns/locale'
import '@mdi/font/css/materialdesignicons.css'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import router from '@/routes/router'
import App from '@/App.vue'

const vuetify = createVuetify({
  locale: {
    // locale: 'pt-BR',
    locale: 'en',
  },
  icons: {
    defaultSet: 'mdi',
  },
  components,
  directives,
  theme: {
    themes: {
      light: {
        dark: false,
        colors: {
          primary: '#13005A', // Azul escuro
          secondary: '#00337C', // Azul
          terciary: '#1C82AD', // Azul claro
          quaternary: '#03C988', // Verde
          background: '#EEEEEE', /// Cinza
        },
      },
    },
  },
})

const app = createApp(App)

app.use(createPinia())

app.use(vuetify)

app.use(router)

app.mount('#app')
