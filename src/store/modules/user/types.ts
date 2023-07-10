export type RoleType = '' | '*' | 'admin' | 'user';
export interface UserState {
  nickname?: string;
  headPortrait?: string;
  permission?: string;
  role: RoleType;
}
