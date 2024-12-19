import { Session } from 'src/session/schema/session.schema';

export type JwtRefreshPayloadType = {
  sessionId: Session['_id'];
  iat: number;
  exp: number;
};
