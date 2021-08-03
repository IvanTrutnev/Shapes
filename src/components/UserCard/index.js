import styles from './UserCard.module.css';

const UserCard = ({ data }) => {
  const { name, role, email, gitHubProfileLink, avatar } = data;
  return (
    <div className={styles.card}>
    <img src={avatar} alt={name} className={styles.avatar}/>
    <div className="container">
      <h2>{name}</h2>
      <p className="title">{role}</p>
      <p>
        <a href={`mailto:${email}`}>{email}</a>
      </p>
      <p>
        <a href={gitHubProfileLink}>GitHub Profile</a>
      </p>
    </div>
  </div>
  )
}

export default UserCard;
