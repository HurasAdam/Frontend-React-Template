export interface ILinkCategory {
  id: string;
  name: string;
  order: number;
}

export interface ILink {
  id: string;
  name: string;
  url: string;
  isFeatured: boolean;
  category?: ILinkCategory;
}

export interface IUsefullLinkWithDetails {
  id: string;
  name: string;
  url: string;
  description: string;
  isFeatured: boolean;
  createdAt: string;
  category: ILinkCategory;
  createdBy: {
    id: string;
    name: string;
    surname: string;
  };
}

export type IFindOneUsefullLinkWithDetailsResponse = IUsefullLinkWithDetails;
export type IFindWithCategoryResponse = ILink[];
