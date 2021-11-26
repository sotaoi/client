import React from 'react';
import { Errors } from '@sotaoi/contracts/errors';
import { Helper } from '@sotaoi/client/helper';
import { View, Text } from 'react-native';

const ErrorComponent = (props: { error: Error }): null | React.ReactElement => {
  switch (true) {
    case props.error instanceof Errors.NotFoundView:
      if (Helper.isMobile()) {
        return (
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>Not Found</Text>
            <Text>We did not find what you were looking for</Text>
          </View>
        );
      }
      return (
        <section className={'p-4'}>
          <h3>Not Found</h3>
          <hr />
          <p>We did not find what you were looking for</p>
        </section>
      );
    case props.error instanceof Errors.ComponentFail:
      return <section>Error encountered</section>;
    case props.error instanceof Errors.NotFoundLayout:
    default:
      if (Helper.isMobile()) {
        return (
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>This is fatal</Text>
            <Text>{JSON.stringify(props.error)}</Text>
          </View>
        );
      }
      return (
        <section className={'p-4'}>
          <h3>This is fatal</h3>
          <hr />
          <p>{JSON.stringify(props.error)}</p>
        </section>
      );
  }
};

export { ErrorComponent };
