import { createTRPCReact } from '@trpc/react-query';
import { AppRouter } from '../../../server/router/router';
export const trpc: any = createTRPCReact<AppRouter>(); // TODO - fix that type casting
