export interface FormValues {
  name: string;
  email: string;
  age: number;
  password: string;
}

export type FormErrors = Partial<Record<keyof FormValues, string>>;
