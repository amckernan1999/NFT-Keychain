import {Fragment, useState} from "react";
import MainDrawer from './menu/MainDrawer';

export default function App({user, logoutAction}) {
  const mainPageTitle = "title?";
  const button1 = "Collection";
  const button2 = "Settings";

  return (
      <Fragment>
        <MainDrawer title={mainPageTitle} button1={button1} button2={button2} logoutAction={logoutAction}/>
      </Fragment>
  )

}