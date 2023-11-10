import styles from './loading.module.css'

import { TailSpin } from 'react-loader-spinner';

function LoadingComponent() {
    return ( 

<div className={styles.loading}>
    <TailSpin
  height="80"
  width="80"
  color="#5B0888"
  ariaLabel="tail-spin-loading"
  radius="1"
  wrapperStyle={{}}
  wrapperClass=""
  visible={true}
/>
</div>


     );
}

export default LoadingComponent;