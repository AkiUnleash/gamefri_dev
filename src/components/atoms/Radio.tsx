import * as React from 'react';
import mui from '../../assets/css/mui.module.css'

// このコンポーネントで扱う型宣言
type props = {
  class: string,
  values: { key: string; value: string; }[],
  setValue: React.Dispatch<React.SetStateAction<string>>
  selectValue: string
}

const Radio: React.FC<props> = (props: props) => {
  return (
    <div className={mui["mui-radio"]}>
      {props.values.map((p, index) => {
        return (
          <label className={props.class} key={index}>
            <input id={"optionsRadios" + index}
              checked={p.key === props.selectValue}
              type="radio"
              name="optionsRadios"
              value={p.key}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                props.setValue(e.target.value)
              }} />
            {p.value}
          </label>
        )
      })}
    </div >
  );
};

export default Radio;
