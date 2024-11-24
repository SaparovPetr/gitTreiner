import React, { memo } from 'react';

import styles from './modal.module.css';

export const Layout = memo(({ children }: React.PropsWithChildren) => (
  <div className={styles.layoutComponent}>{children}</div>
));
