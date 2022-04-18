import {Fragment, useState} from "react";
import MainDrawer from './menu/MainDrawer';

export default function App({user, logoutAction}) {
  const mainPageTitle = "title?";
  const [button1, setButton1] = useState("first button")
  const [button2, setButton2] = useState("second button")

  return (
      <Fragment>
        <MainDrawer title={mainPageTitle} button1={button1} button2={button2} logoutAction={logoutAction}/>
      </Fragment>
  )

}