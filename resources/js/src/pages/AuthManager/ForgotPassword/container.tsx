import { useAuthentication } from '@hooks';
import React from 'react';

export type TContainerResetPassword = {
  handle: { handReset: (email: string) => void };
  baseProps: { text: string } | any;
  state: unknown;
};

type State = TContainerResetPassword['state'];
type Handle = TContainerResetPassword['handle'];
type BaseProps = TContainerResetPassword['baseProps'];

const ContainerLogin = (OriginComponent: (props: TContainerResetPassword) => React.JSX.Element) => {
  const NewComponent = (props: BaseProps) => {
    // import hook
    const auth = useAuthentication();

    const handReset: Handle['handReset'] = async (email) => {
      auth.forgotPassword({ email });
    };

    const handle = { handReset };
    const state = {};

    return <OriginComponent baseProps={props} state={state} handle={handle} />;
  };

  return NewComponent;
};

export default ContainerLogin;
