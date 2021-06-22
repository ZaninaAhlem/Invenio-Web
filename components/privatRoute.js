import React from "react";
import Router from "next/router";
import cookie from "js-cookie";
import { parse } from "cookie";

import { NextPageContext } from "next";
import { IncomingMessage } from "http";

const login = "/login";

const checkUserAuthentication = (req) => {
  const serverCookie = req?.headers.cookie;

  let token;

  if (process.browser) {
    token = localStorage.getItem("userToken");
  }
  return !!token;
  // if (serverCookie) {
  //   jwt = parse(serverCookie).jwt;
  // } else {
  //   jwt = cookie.get("token");
  // }
  // return !!jwt;
};

const WithPrivateRoute = (WrappedComponent) => {
  const hocComponent = ({ ...props }) => <WrappedComponent {...props} />;

  hocComponent.getInitialProps = async ({ res, req }) => {
    const isLoggedIn = checkUserAuthentication(req);

    if (!isLoggedIn) {
      // if (res) {
      //   res?.writeHead(302, {
      //     Location: login,
      //   });
      //   res?.end();
      // } else {
      //   Router.replace(login);
      // }
    } else if (WrappedComponent.getInitialProps) {
      const wrappedProps = await WrappedComponent.getInitialProps(isLoggedIn);

      return { ...wrappedProps, isLoggedIn };
    }

    return { isLoggedIn };
  };

  return hocComponent;
};

export default WithPrivateRoute;
