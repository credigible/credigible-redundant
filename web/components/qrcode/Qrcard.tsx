// import Image from 'next/image';
import styles from './qrcode.module.scss';

const Qrcard = () => (
  <div className={styles.card}>
    <section className={styles.imgContainer}>
      <img
        src="qr.svg"
        alt="qr.svg"
      />
    </section>

    <div className={styles.qrinfo}>
    <section className={styles.desc}>
      <p className={styles.light}>To:</p>
      <p className={styles.bold}>You!</p>
      <p className={styles.space}>&emsp;</p>
      <p className={styles.light}>Description:</p>
      <p>
        Exciting
        <strong> Rewards </strong>
        and
        <strong> Verifiable Certificate</strong>
        , like this on completion of Events and Projects
      </p>
    </section>

    <section className={styles.logo}>
      <svg width="167" height="2" viewBox="1 0 500 1" fill="none" xmlns="http://www.w3.org/2000/svg">
        <line x1="500" y1="0.25" y2="0.25" stroke="white" strokeWidth="2" />
      </svg>
      <span className={styles.light}>&emsp; Certificate </span>
      <img
        src="logo-white.svg"
        alt="logo"
      />
    </section>
    </div>
  </div>
);

export default Qrcard;
