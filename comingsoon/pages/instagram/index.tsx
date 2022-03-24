import type { NextPage } from 'next';
import Head from 'next/head';
import styles from '../../styles/Home.module.scss';
import Logo from '../../components/logo/logo';
import Qrcard from '../../components/qrcode/Qrcard';
import EventAnimation from '../../components/eventAnimation/EventAnimation';

const Home: NextPage = () => (
  <div>
    <Head>
      <title>Credigible</title>
      <meta name="description" content="Generated by create next app" />
      <link rel="icon" href="/favicon.ico" />
    </Head>

    <section className={styles.sectionCenter}>
      <div className={styles.logo}>
        <Logo />
      </div>
      <section className={styles.watermark}>
        <img src="/watermark.svg" alt="" />
      </section>

      <main className={styles.container}>

        <aside className={styles.containerText}>
          <h3 className={styles.heading}>
            Upcoming platform for
          </h3>

          <EventAnimation />

          <div className={styles.inputEmail}>
            <input type="email" placeholder="Enter Email to get notfied" />
            <button type="submit">
              <span> @</span>
              Notify me
            </button>
          </div>

          <div className={styles.discord}>

            <div className={styles.discordWatermark}>
              <img src="/discord-watermark.svg" alt="" />
            </div>

            <p>
              You dont want to miss out on
              <span> connecting </span>
              with cool people and
              <span> building </span>
              together, right ?
            </p>

            <button type="button">
              <img
                src="/discord.svg"
                alt="discord"
              />

              <h4>Join Now</h4>
            </button>
          </div>
        </aside>
        <div className={styles.qrcard}>
          <Qrcard />
        </div>
      </main>
    </section>
  </div>
);

export default Home;
