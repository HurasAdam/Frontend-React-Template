export interface IFolderArticleCreator {
  id: string;
  name: string;
  surname: string;
}

export interface IFolderArticle {
  id: string;
  title: string;
  label: "important" | null;
  createdAt: string;
  createdBy: IFolderArticleCreator;
}

export interface IFolderDetails {
  id: string;
  name: string;
  description: string;
  color: string;
  createdAt: string;
}

export interface IFindByFolderResponse {
  folder: IFolderDetails;
  articles: IFolderArticle[];
}
