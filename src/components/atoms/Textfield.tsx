import * as React from 'react';
import mui from '../../assets/css/mui.module.css'

// このコンポーネントで扱う型宣言
type props = {
  type: string,
  placeholder: string,
  id: string,
  value: string,
  setValue: React.Dispatch<React.SetStateAction<string>>
  label: string
}

const Textfield: React.FC<props> = (props: props) => {

  return (
    <div className={mui["mui-textfield"]}>
      <input type={props.type} placeholder={props.placeholder}
        id={props.id}
        defaultValue={props.value}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          props.setValue(e.target.value)
        }} />
      <label>{props.label}</label>
    </div>
  );
};
export default Textfield;