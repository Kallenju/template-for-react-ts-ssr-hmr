import React from 'react';

interface ILayoutProps {
  children?: React.ReactNode;
}

export function Layout({ children }: ILayoutProps): React.ReactElement {
  return <article>{children}</article>;
}
