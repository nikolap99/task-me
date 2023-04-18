type TextFieldProps = {
  id?: string;
  placeholder?: string;
  onChange: (value: string) => void;
  value: string;
  type?: string;
}

export type { TextFieldProps };