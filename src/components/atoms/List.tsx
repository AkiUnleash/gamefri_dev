import * as React from 'react';
import mui from '../../assets/css/mui.module.css'

type Textfieldprops = {
  dataSource: string[],
  setValue: React.Dispatch<React.SetStateAction<string | "-">>,
  label?: string
}

const List = (props: Textfieldprops): JSX.Element => {

  return (
    <div className={mui["mui-select"]}>
      <select onChange={(e) => props.setValue(e.target.value.toString())} >
        {props.dataSource.map((y, index) => {
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