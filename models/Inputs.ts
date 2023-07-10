export interface IInputController {
  label?: string;
  type?: "text" | "number" | "password";
  isTouched: boolean;
  error: string;
  register: any;
  placeholder: string;
  defaultName?: string;
  value: string | number;
}
