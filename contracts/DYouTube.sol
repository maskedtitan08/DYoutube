// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

contract DYouTube{
    uint public videoCount=0;
    string public name = "Video";

    struct Video{
        uint id;
        string cid;
        string title;
        address author;
    }

    event videoUploaded(
        uint id,
        string cid,
        string title,
        address author
    );

    mapping(uint=>Video) public videos;
     

    // constructor() public {

    // }
    

    function uploadVideo(string memory _videoHash,string memory _title) public {
        require(msg.sender!=address(0),"Author address donot exist");
        require(bytes(_videoHash).length!=0 && bytes(_title).length>0 , "Invalid input");

        videos[videoCount] = Video(videoCount,_videoHash,_title,msg.sender);
        emit videoUploaded(videoCount,_videoHash,_title,msg.sender);
        videoCount++;
        
    }
} 