import React, { useState } from 'react';
import { useManagerUser } from '../List/hook';
import { useUser } from './hook';
import { Data } from './type';

// Type Component
export type TComponentWrap = {
  handle: { createUser: (value: string) => void; updateUser: (value: string) => void };
  baseProps: any;
  state: { user: Data | undefined };
};

// Divide the type with each props
type State = TComponentWrap['state'];
type Handle = TComponentWrap['handle'];
type BaseProps = TComponentWrap['baseProps'];

// The wallpaper component will return state, handle action and get data api
const ComponentWrap = (OriginComponent: (props: TComponentWrap) => React.JSX.Element) => {
  const NewComponent = (props: BaseProps) => {
    // Get Detail User
    const { user, refetch } = useUser();

    const { createUserMutate, updateUserMutate } = useManagerUser();

    const createUser: Handle['createUser'] = (value) => {
      createUserMutate(value);
    };

    const updateUser: Handle['updateUser'] = (value) => {
      console.log({ value });
      updateUserMutate({ id: user?.id, data: value });
    };

    const handle = { createUser, updateUser };
    const state = { user: user };

    return <OriginComponent baseProps={props} state={state} handle={handle} />;
  };

  return NewComponent;
};

export default ComponentWrap;
