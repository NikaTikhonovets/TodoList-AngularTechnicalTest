import { Category } from '@enums/category.enum';

export interface Task {
  id: number;
  label: string;
  description: string;
  category: Category;
  done: boolean | string;
}
