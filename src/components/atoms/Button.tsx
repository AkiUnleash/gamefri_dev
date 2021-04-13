import * as React from 'react';
import styles from '../../assets/scss/button.module.scss'

// このコンポーネントで扱う型宣言
type props = {
  classDiv: string,
  classButton: string,
  value: string,
  action: any
}

const Button: React.FC<props> = (props: props) => {
  return (
    <div className={styles[props.classDiv]}>
      <button className={styles[props.classButton]}
        onClick={props.action}>{props.value}</button>
    </div>
  );
};
export default Button;