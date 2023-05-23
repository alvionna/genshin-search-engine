import styles from '../styles/layout.module.css';
import SearchInput from './SearchInput';

export default function Layout({ children }) {
  return (
    <div className={styles.container}>
      <SearchInput></SearchInput>
      {children}
    </div>
  
  );
}