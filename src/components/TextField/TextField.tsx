import React from 'react';
import styles from './TextField.module.scss';
import { TextFieldProps } from './TextField.types';

const TextField: React.FC<TextFieldProps> = ({
  id,
  placeholder,
  value,
  onChange,
  type = "text",
}) => {

  return (
    <input
      id={id || ""}
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className={styles.TextField}
    />
  );
}

export { TextField };
