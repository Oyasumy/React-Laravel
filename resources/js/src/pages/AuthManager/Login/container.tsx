import React, { useState } from 'react';

import { useAuthentication } from '@hooks';

export type TContainerLogin = {
  handle: { handleLogin: (email: string, password: string) => void };
  baseProps: { text: string };
  state: unknown;
};

type State = TContainerLogin['state'];
type Handle = TContainerLogin['handle'];
type BaseProps = TContainerLogin['baseProps'];

const ContainerLogin = (OriginComponent: (props: TContainerLogin) => React.JSX.Element) => {
  const NewComponent = (props: BaseProps) => {
    // import hook
    const auth = useAuthentication();

    const handleLogin: Handle['handleLogin'] = async (email, password) => {
      auth.signIn({ email, password });
    };

    const handle = { handleLogin };
    const state = {};

    return <OriginComponent baseProps={props} state={state} handle={handle} />;
  };

  return NewComponent;
};

export default ContainerLogin;
