import { Session } from 'src/session/schema/session.schema';
import { User } from 'src/users/schema/user.schema';

export type JwtPayloadType = Pick<User, '_id' | 'role'> & {
  sessionId: Session['_id'];
  iat: number;
  exp: number;
};
