import * as React from 'react';
import mui from '../../assets/css/mui.module.css'

type Textfieldprops = {
  value: string[],
  label?: string
}

const List = (props: Textfieldprops): JSX.Element => {

  return (
    <div className={mui["mui-select"]}>
      <select>
        {props.value.map((y, index) => {
          return <option key={index}>{y}</option>
        })}
      </select>
      {props.label && (
        <label>{props.label}</label>
      )}
    </div>
  );
};

export default List;