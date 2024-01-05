
export class Bill  {
  id?: number;
  description?: string;
  dueDate?: Date;
  payDate?: Date;
  amount?: number;
  type: string = "RECEITA";
  category?: Category = new Category();
  person?: Person = new Person();
  notes?: string;
}

export class Person  {
  id?: number;
  name?: string;
  active?: boolean;
  address?: Address = new Address();
}

export class Address  {
  street?: string;
  number?: string;
  complement?: string;
  neighborhood?: string;
  city?: string;
  state?: string;
  pobox?: string;
}

export class Category  {
  id?: number;
  name?: string;
}
