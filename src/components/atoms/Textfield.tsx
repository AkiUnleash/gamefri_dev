import * as React from 'react';
import mui from '../../assets/css/mui.module.css'

type Textfieldprops = {
  type: string,
  placeholder: string,
  id: string,
  value: string,
  setValue: React.Dispatch<React.SetStateAction<string>>
  label: string
}

const Textfield = (props: Textfieldprops): JSX.Element => {
  return (
    <div className={mui["mui-textfield"]}>
      <input type={props.type} placeholder={props.placeholder}
        id={props.id}
        defaultValue={props.value}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          props.setValue(e.target.value)
        }}
      />
      <label>{props.label}</label>
    </div>
  );
};
export default Textfield;