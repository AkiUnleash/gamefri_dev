import * as React from 'react';
import styles from '../../assets/scss/atoms/errormessage.module.scss'

// このコンポーネントで扱う型宣言
type props = {
  message: string,
}

const Errormessage: React.FC<props> = (props: props) => {
  return (
    <div className={styles["error-message"]}>
      {props.message}
    </div>
  );
};
export default Errormessage;