import React from 'react';
import InitialChoice from '../../../assets/svg/InitialChoice';
import styles from './Option.module.css';

const Option = () => {
  return (
    <div className={styles.InitialChoicePrismContainer}>
      <div className={styles.SvgContainerChoice}>
        <InitialChoice />
      </div>
    </div>
  );
};

export default Option;
