export interface IUsefullLinkWithDetails {
  id: string;
  name: string;
  url: string;
  description: string;
  isFeatured: boolean;
  createdAt: string;
  category: {
    id: string;
    name: string;
    order: number;
  };
  createdBy: {
    id: string;
    name: string;
    surname: string;
  };
}

export type IFindOneUsefullLinkWithDetailsResponse = IUsefullLinkWithDetails;
