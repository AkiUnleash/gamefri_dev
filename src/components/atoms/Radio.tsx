import * as React from 'react';
import mui from '../../assets/css/mui.css'

type props = {
  class: string,
  values: {
    key: string;
    value: string;
  }[],
  setValue: React.Dispatch<React.SetStateAction<string>>
}

const Radio = (props: props): JSX.Element => {
  return (
    <div className={mui["mui-radio"]}>

      {props.values.map((p, index) => {
        return (
          <label className={props.class} key={index}>
            <input id={"optionsRadios" + index} type="radio" name="optionsRadios" value={p.key} />{p.value}
          </label>
        )
      })}

    </div >
  );
};
export default Radio;
