export interface Book {
  id?: string;
  title: string;
  author: string;
  year: number;
  coverBase64: string;
  description: string;
  comments?: Comment[];
  createdAt?: Date;
}
