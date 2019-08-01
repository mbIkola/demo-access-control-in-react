// PermissionsProvider.js
import React, { Component } from "react";
import PropTypes from "prop-types";
import hoistStatics from "hoist-non-react-statics";

class PermissionsProvider extends React.Component {
  static propTypes = {
    permissions: PropTypes.array.isRequired,
  };

  static contextTypes = {
    permissions: PropTypes.array,
  };

  static childContextTypes = {
    permissions: PropTypes.array.isRequired,
  };

  getChildContext() {
    // maybe you want to transform the permissions somehow
    // maybe run them through some helpers. situational stuff
    // otherwise just return the object with the props.permissions
    // const permissions = doSomething(this.props.permissions);
    // maybe add some validation methods
    return { permissions: this.props.permissions };
  }

  render() {
    return React.Children.only(this.props.children);
  }
}

const withPermissions = Component => {
  const C = (props, context) => {
    const { wrappedComponentRef, ...remainingProps } = props;

    return (
      <Component permissions={context.permissions} {...remainingProps} ref={wrappedComponentRef} />
    );
  };

  C.displayName = `withPermissions(${Component.displayName || Component.name})`;
  C.WrappedComponent = Component;
  C.propTypes = {
    wrappedComponentRef: PropTypes.func
  };

  C.contextTypes = {
    permissions: PropTypes.array.isRequired
  };

  return hoistStatics(C, Component);
};

export { PermissionsProvider as default, withPermissions };
