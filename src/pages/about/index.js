import { Link } from "react-router-dom";

import UserCard from '../../components/UserCard';

import styles from './about.module.css';

const About = () => {
  const user = {
    name: 'Ivan Trutnev',
    role: 'Software Developer',
    email: 'ivantrutnev815@gmail.com',
    gitHubProfileLink: 'https://github.com/IvanTrutnev',
    avatar: 'https://avatars.githubusercontent.com/u/12071109?v=4'
  }
  return (
    <>
    <div className={styles['about-section']}>
      <h1>About</h1>
      <p>Program that allow you draw paralelogram by creating 3 point in any place of screen.</p>
      <p>After createing 3 point application draws paralelogram with 1 point in mass center.</p>
      <Link to="/" className={styles['link-to-canvas']}>Go to canvas</Link>
    </div>

    <h2 className={styles.author}>Autor</h2>

    <div className={styles['profile-row']}>
      <UserCard data={user}/>
    </div>
  </>
  )
}

export default About;
