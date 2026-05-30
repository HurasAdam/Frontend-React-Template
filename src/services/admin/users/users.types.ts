export interface IUserWithDetails {
  id: string;
  name: string;
  surname: string;
  email: string;
  isActive: boolean;
  lastLogin: string;
  mustChangePassword: boolean;
  createdAt: string;
  role: {
    id: string;
    name: string;
    iconKey: string;
    labelColor: string;
  };
}

export type IFindOneWithDetailsResponse = IUserWithDetails;
