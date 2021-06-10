import React, { useState, useEffect, useRef } from 'react';
import point from '../../assets/images/point/point.svg'
import styles from '../../assets/scss/molecules/selfmenu.module.scss'
import { dataUpdate } from '../../common/backend/model';
import { serverTime } from '../../common/firebase/firebase';

type props = {
  documents1: string
  documents2: string
}

const SelfMenu: React.FC<props> = (props: props) => {

  const [isOpen, setIsOpen] = useState(false)
  const menuRef: any = useRef()

  const clickHandler = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault()

    dataUpdate({ delete_at: serverTime }, {
      colection1: "user",
      documents1: props.documents1,
      colection2: "posts",
      documents2: props.documents2,
    })
  }

  useEffect(() => {
    isOpen && menuRef.current.focus()
  }, [isOpen])

  return (
    <div className={styles["selfmenu"]} >
      <div>
        <img alt="Sub menu" src={point} onClick={() => setIsOpen(isOpen ? false : true)} />
        {isOpen &&
          <ul
            ref={menuRef}
            className={styles["selfmenu__window"]} >
            <li >
              <button
                className={styles["selfmenu__button"]}
                onClick={(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => { clickHandler(e) }}>
                削除</button></li>
          </ul>
        }
      </div>
    </div>
  )
}

export default SelfMenu