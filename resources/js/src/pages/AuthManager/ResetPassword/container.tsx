import React from 'react';

import { useAuthentication } from '@hooks';

export type TContainerResetPassword = {
  handle: { handReset: (email: string, token: string, password: string, password_confirmation: string) => void };
  baseProps: { text: string } | any;
  state: unknown;
};

type State = TContainerResetPassword['state'];
type Handle = TContainerResetPassword['handle'];
type BaseProps = TContainerResetPassword['baseProps'];

const ContainerWrap = (OriginComponent: (props: TContainerResetPassword) => React.JSX.Element) => {
  const NewComponent = (props: BaseProps) => {
    // import hook
    const auth = useAuthentication();

    const handReset: Handle['handReset'] = async (email, token, password, password_confirmation) => {
      auth.resetPassword({ email, token, password, password_confirmation });
    };

    const handle = { handReset };
    const state = {};

    return <OriginComponent baseProps={props} state={state} handle={handle} />;
  };

  return NewComponent;
};

export default ContainerWrap;
