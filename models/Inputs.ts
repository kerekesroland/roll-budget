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
  extraContainerStyle?: string;
}

export interface IIconSelector {
  label?: string;
  error: string;
  register: any;
  setValue: Function;
  defaultValue?: string;
  extraStyle?: string;
}

type Option = {
  label: string;
  value: string;
};
