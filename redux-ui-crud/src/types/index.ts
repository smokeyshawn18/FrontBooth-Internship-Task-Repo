import { UserFormData } from "../schema/user.schema";

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  createdAt: string;
}

export interface UserFormProps {
  title: string;
  submitText: string;
  initialData?: UserFormData;
  onSubmit: (data: UserFormData) => void;
}
