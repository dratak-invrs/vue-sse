import { EventSource } from 'mocksse';
import { createApp  } from 'vue';
import VueSSE from '../src/index';

Object.defineProperty(global, 'window', {
  value: {
    EventSource,
  },
});

const app = createApp({});

app.config.devtools = false;
app.config.productionTip = false;

app.use(VueSSE);
