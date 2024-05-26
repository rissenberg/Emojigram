interface IChatBase {
  id: string,
  created?: Date,
}

// interface IChatDialog extends IChatBase {
//   type: 'dialog';
//   user_id: number;
// }

interface IChatGroup extends IChatBase {
  type: 'group';
  users_ids: number[];
  avatar: string;
  name: string;
}

export type IChat = IChatGroup;