import React from 'react';
import LoadingOverlay from 'react-loading-overlay'
import BounceLoader from 'react-spinners/BounceLoader'
 
export default function MyLoader({ active, children }) {

    console.log("MyLoader", active, children);
    active = true;
    let text = "Loading restaurants in your location";
  return (
    <LoadingOverlay
      active={active}
      spinner={<BounceLoader />}
   
    >
      {children}
    </LoadingOverlay>
  )
}