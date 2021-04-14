import * as React from 'react';
import mui from '../../assets/css/mui.module.css'

// このコンポーネントで扱う型宣言
type props = {
  dataSource: string[],
  setValue: React.Dispatch<React.SetStateAction<string | "-">>,
  label?: string
}

const List: React.FC<props> = (props: props) => {

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