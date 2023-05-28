import styles from './About.module.css';
import { Link } from 'react-router-dom';

const About = () => {
  return (
    <div className={styles.about}>
      <h2>
        Sobre o Charlie <span>Blog</span>
      </h2>
      <p>
        Este projeto foi desenvolvido com React no Front-end e Firebase no
        Back-end. <br />
        Foram dedicadas muitas horas para que podessemos chegar a este nível,
        espero que gostem, um forte abraço de toda a equipe, Charlie Brow jr.
        &copy;
      </p>
      <Link to="/posts/create" className="btn">
        Criar post
      </Link>
    </div>
  );
};

export default About;
