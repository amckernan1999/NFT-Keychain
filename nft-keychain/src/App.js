import {Fragment, useState} from "react";
import MainDrawer from './menu/MainDrawer';

export default function App({user, logoutAction}) {
  const mainPageTitle = "NFT KEYCHAIN";
  const collectionsButton = "Collections";
  const settingsButton = "Settings";

  return (
      <Fragment>
        <MainDrawer mainPageTitle={mainPageTitle} collectionsButton={collectionsButton} settingsButton={settingsButton} logoutAction={logoutAction}/>
      </Fragment>
  )

}