export interface IInputController {
  label?: string;
  type?: "text" | "number" | "password";
  isTouched: boolean;
  error: string;
  register: any;
  placeholder: string;
  defaultName?: string;
  value: string | number;
  extraStyle?: string;
  valuta?: boolean;
  valutaOptions?: Array<Option>;
}

type Option = {
  label: string;
  value: string;
};
