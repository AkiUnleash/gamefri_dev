import * as React from 'react';
import * as styles from '../assets/scss/todoList.scss';
import logo from "../assets/images/logo.png"
import logo_svg from "../assets/images/logo.svg"


const TodoList = (): JSX.Element => {
    return (
        <div>
            <div className={styles.title}>Template</div>
            <img src={logo} />
            <img src={logo_svg} />
        </div>
    );
};

export default TodoList;
