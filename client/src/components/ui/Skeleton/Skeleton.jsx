import clsx from 'clsx';
import styles from './Skeleton.module.css';


const Skeleton = ({ height = 16, width = '100%', rounded = true }) => (
  <div 
    className={clsx(styles.skel, { [styles.rounded]: rounded })}
    style={{ height, width }}
  />
);

export default Skeleton;
