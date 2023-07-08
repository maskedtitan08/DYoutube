// import React from 'react';
// // import Identicon from 'identicon.js';
// import dvideo from './assets/react.svg';

// const Navbar = ({ account }) => {
//   return (
//     <nav className="navbar navbar-dark fixed-top bg-dark flex-md-nowrap p-0 shadow text-monospace">
//       {/* <a
//         className="navbar-brand col-sm-3 col-md-2 mr-0"
//         href="http://www.dappuniversity.com/bootcamp"
//         target="_blank"
//         rel="noopener noreferrer"
//       > */}
//         <img src={dvideo} width="30" height="30" className="d-inline-block align-top" alt="" />
//         &nbsp;DYouTube
//       {/* </a> */}
//       <ul className="navbar-nav px-3">
//         <li className="nav-item text-nowrap d-none d-sm-none d-sm-block">
//           {/* {account && ( */}
//             {/* // <React.Fragment> */}
//               {/* <small className="text-secondary"> */}
//                 {/* <small id="account">Account : {account}</small> */}
//                 {/* <p id="account"> Account : {account ? account : "not connected"}</p> */}
//               {/* </small> */}

//               {/* just add small icon beside the account */}
//               {/* <img
//                 className="ml-2"
//                 width="30"
//                 height="30"
//                 src={`data:image/png;base64,${new Identicon(account, 30).toString()}`}
//                 alt=""
//               /> */}

              
//             {/* // </React.Fragment> */}
//           {/* )} */}
//         </li>
//       </ul>
//     </nav>
//   );
// };

import React from 'react';
import dvideo from './assets/react.svg';
import "./Navbar.css";
const Navbar = ({account,loadWeb3,connected}) => {
  return(
    <>
      <div className="navbar">
        <img src={dvideo} className="img" width="30px" height="30px" />
        <p>DYouTube</p>
        {/* <button type="" className="connectBTN" onClick={() => loadWeb3()} disabled={!connected}> {connected ? "Connect Metamask" : "Connected"}</button> */}
        <button type="" className="connectBTN" onClick={() => loadWeb3()} disabled={!connected}> {connected ? "Connect Metamask" : account.length === 42 ? `${account.slice(0, 6)}...${account.slice(-3)}` : account}</button>
        {/* <p id="account"> Account : {account ? account : "not connected"}</p> */}
        {/* {account && (
          <p className="account">Account : {account ? account:"not conneccted"} </p>
        )} */}
      </div>
    </>
  );
};



export default Navbar;
