import React, { useState } from "react";
import axios from "axios";
import styles from "./Nav.module.scss";
import Popup from "reactjs-popup";
import RegisterForm from './RegisterForm';
const Nav: React.FC = () => {
    const [open, setOpen] = useState(false);
    const closeModal = () => setOpen(false);
    const openModal = () => setOpen(true);

  return (
    <nav className={styles.nav}>
      <div className={styles.dropdown}>
        <div className={styles.item}>
          <svg
            version="1.1"
            id="Layer_1"
            xmlns="http://www.w3.org/2000/svg"
            x="0px"
            y="0px"
            viewBox="0 0 512 512"
          >
            <path d="M256,0c-74.439,0-135,60.561-135,135s60.561,135,135,135s135-60.561,135-135S330.439,0,256,0z" />
            <path
              d="M423.966,358.195C387.006,320.667,338.009,300,286,300h-60c-52.008,0-101.006,20.667-137.966,58.195
			C51.255,395.539,31,444.833,31,497c0,8.284,6.716,15,15,15h420c8.284,0,15-6.716,15-15
			C481,444.833,460.745,395.539,423.966,358.195z"
            />
          </svg>
          <span>-</span>
        </div>
        <div className={styles.item}>
          <svg
            height="512pt"
            viewBox="0 0 511 512"
            width="512pt"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="m361.5 392v40c0 44.113281-35.886719 80-80 80h-201c-44.113281 0-80-35.886719-80-80v-352c0-44.113281 35.886719-80 80-80h201c44.113281 0 80 35.886719 80 80v40c0 11.046875-8.953125 20-20 20s-20-8.953125-20-20v-40c0-22.054688-17.945312-40-40-40h-201c-22.054688 0-40 17.945312-40 40v352c0 22.054688 17.945312 40 40 40h201c22.054688 0 40-17.945312 40-40v-40c0-11.046875 8.953125-20 20-20s20 8.953125 20 20zm136.355469-170.355469-44.785157-44.785156c-7.8125-7.8125-20.476562-7.8125-28.285156 0-7.8125 7.808594-7.8125 20.472656 0 28.28125l31.855469 31.859375h-240.140625c-11.046875 0-20 8.953125-20 20s8.953125 20 20 20h240.140625l-31.855469 31.859375c-7.8125 7.808594-7.8125 20.472656 0 28.28125 3.90625 3.90625 9.023438 5.859375 14.140625 5.859375 5.121094 0 10.238281-1.953125 14.144531-5.859375l44.785157-44.785156c19.496093-19.496094 19.496093-51.214844 0-70.710938zm0 0" />
          </svg>
          <span onClick={openModal}>Sign up</span>
          <Popup open={open} modal closeOnDocumentClick onClose={closeModal}>
            <div className={styles.popup}>
              <RegisterForm closeModal={closeModal} />
            </div>
          </Popup>
        </div>
      </div>
    </nav>
  );
};

export default Nav;
