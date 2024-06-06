import React from 'react';

export const Layout = ({ children }: React.PropsWithChildren) => (
  <div className='container small'>
    <div>{children}</div>
  </div>
);
