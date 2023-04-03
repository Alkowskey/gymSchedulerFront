import { createHTTPServer } from '@trpc/server/adapters/standalone';
import cors from 'cors';
import { mainRouter } from './router/router';
import { connectToDatabase } from './services/database.service';

connectToDatabase().then(() => {
  createHTTPServer({
    middleware: cors(),
    router: mainRouter,
    createContext() {
      console.log('context 3');
      return {};
    },
  }).listen(2022);
});

