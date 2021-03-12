import * as React from 'react';
import mui from '../../assets/css/mui.css'

type props = {
  placeholder: string,
  class: string,
  id: string,
  value: string,
  setValue: React.Dispatch<React.SetStateAction<string>>
  label: string
}

const Textarea = (props: props): JSX.Element => {
  return (
    <div className={mui["mui-textfield"]}>
      <textarea placeholder={props.placeholder}
        className={props.class}
        id={props.id}
        defaultValue={props.value}
        onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
          props.setValue(e.target.value)
        }}
      />
      <label>{props.label}</label>
    </div>
  );
};
export default Textarea;