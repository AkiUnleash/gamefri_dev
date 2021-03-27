import * as React from 'react';
import styles from '../../assets/scss/button.module.scss'

type props = {
  classDiv: string,
  classButton: string,
  value: string,
  action: any
}

const Button = (props: props): JSX.Element => {
  return (
    <div className={styles[props.classDiv]}>
      <button className={styles[props.classButton]}
        onClick={props.action}>{props.value}</button>
    </div>
  );
};
export default Button;