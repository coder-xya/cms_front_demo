import type { IAccount } from '@/types';
import xyaRequest from '..';

// 帐号登录
export function accountLoginRequest(account: IAccount) {
  return xyaRequest.post({
    url: '/login',
    data: account,
  });
}
// 用户信息
export function getUserInfoById(id: string) {
  return xyaRequest.get({
    url: `/users/${id}`,
  });
}
// 用户权限菜单
export function getUserMenusByRoleId(id: number) {
  return xyaRequest.get({
    url: `/role/${id}/menu`,
  });
}
