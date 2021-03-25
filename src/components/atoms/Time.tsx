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
      <div className={mui["mui-textfield"]}>
        <input type="time" name="example" value="00:00"></input>
      </div>
    </div>
  );
};
export default Textfield;