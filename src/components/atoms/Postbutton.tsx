import * as React from 'react';
import style from '../../assets/scss/home.module.scss'

type props = {
  link: string,
}

const Postbutton: React.FC<props> = (props: props) => {

  return (
    <a href={props.link}>
      <span className={style["adddiary"]}></span>
    </a>
  );
};

export default Postbutton;

