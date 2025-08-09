import type { IAccount } from '@/types';
import xyaRequest from '..';

export default function accountLoginRequest(account: IAccount) {
  return xyaRequest.post({
    url: '/login',
    data: account,
  });
}
