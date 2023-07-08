import { useState, useEffect } from "react";
import ABI from "./artifacts/contracts/DYouTube.sol/DYouTube.json";
import Main from "./Main2"
import Navbar from "./Navbar"
import './App.css'
import { ethers } from "ethers";
// import AWS from 'aws-sdk';
// import fs from 'fs';
import axios from 'axios';

const App = () => {

  const [account, setAccount] = useState(""); // to display current account connected
  const [videos, setVideos] = useState([]);  // to store all videos list from contract
  const [contract, setContract] = useState(null); // to store instance of contract
  const [videosCount, setVideosCount] = useState(null); // to run for loop to store values in array
  const [loading, setLoading] = useState(true);
  const [latestHash, setLatestHash] = useState(null);
  const [latestTitle, setLatestTitle] = useState(null);
  const [buffer, setBuffer] = useState(null);
  const [connected, setConnected] = useState(true);
  const[provider,setProvider] = useState(null);

  useEffect(() => {
    if (account && contract) {
      loadBlockchainData(contract, account);
    }
  }, [account, contract]);
  

  const loadWeb3 = async () => {
    let signer = null;
    if (window.ethereum == null) {
      console.log("No Metamask detected");
      const provider = ethers.getDefaultProvider();
      setProvider(provider);

    }
    else {
      const provider = new ethers.BrowserProvider(window.ethereum);
      setProvider(provider);
      console.log(provider);
      window.ethereum.on("chainChanged", () => {           // when chain changed window reload
        window.location.reload();
      });                                                     // these scripts are provided by metamask taaki hm jb bhi account change krein to automatically site pr refresh ho jaaye

      window.ethereum.on("accountsChanged", () => {        // when account change window relaod
        window.location.reload();
      });
      signer = await provider.getSigner();
      const account = await signer.getAddress();
      setAccount(account);
      // console.log(account);
      const contractAddress = "0x83aA421735994123aBC86eCa817b801879bB90bf";
      const contract = new ethers.Contract(contractAddress, ABI.abi, signer);
      setConnected(false);
      setContract(contract);
      // console.log(contract);
    }
  };
  // console.log(connected);
  // console.log(contract);
  // console.log(account);
  // console.log(provider);

  const loadBlockchainData = async (contract,account) => {
    console.log(account);
    // const networkId = await provider.getNetwork().chainId;
    // const networkData = ABI.networks[networkId];
    if (account) {
      try {
        console.log(contract);
        const videosCount = await contract.videoCount();
        setVideosCount(videosCount);

        for (let i = videosCount; i >= 0; i--) {
          const video = await contract.videos(i);
          setVideos(prevVideos => [...prevVideos, video]);
        }

        //Setting the last video uploaded as defualt
        const latest = await contract.videos(videosCount);
        setLatestHash(latest.cid);
        setLatestTitle(latest.title);
        setLoading(false);
      }
      catch (error) {
        console.log(`Error fetching data from smartcontract ${error}`);
      }
    }
    else {
      alert("Contract not deployed to detected network Connect to polygon zkevm network");
    }
  }




  const captureFile = event => {
    event.preventDefault();
    const file = event.target.files[0];
    const reader = new window.FileReader();
    reader.readAsArrayBuffer(file);

    reader.onloadend = () => {
      // setBuffer(Buffer(reader.result));
      setBuffer(event.target.files[0]);
      console.log('buffer', file);
    };
  };

const pinataApiKey = "1a7e927eca155a9ef5b1";
const pinataSecretApiKey = "5a28d331f17c953326050b03ecb24edba458f7ee644f9ac45e8c4acb45dce5e2";

const uploadVideo = async (title) => {
  console.log('Submitting file to IPFS...');

  const formData = new FormData();
  formData.append("file", buffer);

  try {
    const resFile = await axios({
      method: "post",
      url: "https://api.pinata.cloud/pinning/pinFileToIPFS",
      data: formData,
      headers: {
        pinata_api_key: pinataApiKey,
        pinata_secret_api_key: pinataSecretApiKey,
        "Content-Type": "multipart/form-data",
      },
    });

    const ipfsHash = resFile.data.IpfsHash;
    setLoading(true);
    await contract.uploadVideo(ipfsHash, title).send({ from: account });
    setLoading(false);
    alert("video uploaded successfully");
    setBuffer(null);
    window.location.reload();
  } catch (error) {
    console.error(error);
    setLoading(false);
  }
};

  const changeVideo = (hash, title) => {
    setLatestHash(hash);
    setLatestTitle(title);
  };




  return (
    <>
      <div>
        {/* <button type="" className="connectBTN" onClick={() => loadWeb3()} disabled={!connected}> {connected ? "Connect Metamask" : "Connected"}</button> */}
        {/* <button type="" className="connectBTN" onClick={() => loadBlockchainData()} disabled={!connected}> {connected ? "Load Data" : "Laoded"}</button> */}
        <Navbar account={account} loadWeb3={loadWeb3} connected={connected}/>
        {loading
          ? <div id="loader"><p>Loading...</p></div>
          : <Main
            videos={videos}
            uploadVideo={uploadVideo}
            captureFile={captureFile}
            changeVideo={changeVideo}
            latestHash={latestHash}
            latestTitle={latestTitle}
          />
        }

      </div>

    </>
  )
}

export default App
