import * as React from 'react';
import mui from '../../assets/css/mui.module.css'

// このコンポーネントで扱う型宣言
type props = {
  placeholder: string,
  class: string,
  id: string,
  value: string,
  setValue: React.Dispatch<React.SetStateAction<string>>
  label: string
}

const Textarea: React.FC<props> = (props: props) => {
  return (
    <div className={mui["mui-textfield"]}>
      <textarea placeholder={props.placeholder}
        className={props.class}
        id={props.id}
        // defaultValue={props.value}
        value={props.value}
        onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
          props.setValue(e.target.value)
        }}
      />
      <label>{props.label}</label>
    </div>
  );
};
export default Textarea;