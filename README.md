
# Stremio-P2P
![](https://img.shields.io/badge/Status-Under%20Dev-informational.svg) ![](https://img.shields.io/badge/Type-Addon-%238B36DA.svg) ![](https://img.shields.io/badge/Build-Available-green.svg)  ![](https://img.shields.io/badge/Platform-linux%20%7C%20windwos%20%7C%20osx-inactive.svg)
Stremio-P2P is a addon for the stremio platform. It is used to share videos directly without uploading to server and other person can view the video in the stremio. 

> Stremio-Addon for hosting and watching P2P videos
> P2PClient: for hosting a video .
> P2PAddon : for stremio to see the hosted videos .

# DEMO
You can see the demo in www.youtube.com/
# Installation 🤖

## - P2PClient

[P2PClient](https://github.com/ShivamRawat0l/StremioP2P/releases/tag/1.0.0) is a software which is used to host the video file online. 

> After hosting the video to host another please close the client and then restart it 

### -- Installation : 

 - [Download](https://github.com/ShivamRawat0l/StremioP2P/releases/tag/1.0.0) the software corresponding to your operating system from here .
 - Select the file and host.
 - The video should be online.
 ### -- Errors : 
 
 - Make sure no process is running in the port 8002.
 - If not shown in the stremioAddon try closing and restarting the client.

> Watch the tutorial, if any error persist  you can raise a issue .

## - P2PAddon


[P2PClient](http://www.github.com/) is a addon for stremio which get the file hosted using P2PClient and display it on the stemioCatalog. 

### -- Installation : 

 - Open Stemio.
 - Goto addons. Top Right.
 - On the left side paste this link
 - Goto Discover
 - Movies and then P2P.
 - It would take a while and then all the video that are being hosted shows up.
 - Select any and stream it using p2pstream;
 ### -- Errors : 
 
 - ERROR:  There is no information about this.  (Fixing)


> Watch the tutorial, if any error persist  you can raise a issue .
# Where can it be used ?  👏
You don't need to spend time first uploading the video and then the receiver downloading the video. He watch the video as you upload. Therefore it is **faster** and **efficient** .
 - If you want to watch movies together with someone who is not beside you .
 - If you want to share a video with people but don't to upload the video online
 - If you need to show the video urgently to someone and dont want to upload the video and then download it. 
 - If your time matters :)

# Languages/Frameworks ✍️
This is the list of the languages/frameworks used to develop this whole repository. 
 - [x] Javascript
 - [x] HTML5
 - [x] CSS3
 - [x] Electron (P2PClient)
 - [x] XEL (Electron Components)
 - [x] StremioSDK (P2PAddon)

# How to contribute 🕵️

You should be familiar with the above mentioned  frameworks/language. Folders for both Client and the Addon    are seperated. 

## - P2PClient

Say the name of the god and type `npm install`. This may protect you from evil errors. ☠️
Goto jsonstore.io and create a new json. 
Your json would be like `www.jsonstore.io/key-value`
Store the value of `key-value` in `.env` file as 

    

    JSONSTORE="key-value"
   
Then paste the .env file for both P2PClient and the P2PAddon.

### -- File Stucture :
All the directories are subjected to market risk read the directions carefully.
The directories are either contains the ico file or the software package.
 - **main.js** contains the code of the electron app structure and the file to render 
 - **index.html** contains the html code that is rendered in the electron app. 
 - **renderer.js** is imported in index.html and contain all the code to host the video. -  




## - P2PAddon
You can also try `yarn`to install all the node packages.
### -- File Stucture :
No directory found
 - **server.js** came with the stremioSDK and contains the code to start the addon server on the localhost. 
 - **addon.js** is the main file which contains the code for the stremio addon. 


# Deploying 

## - P2PAddon

> `npm start    `

## -P2PClient
> `electron-packager ./Linux/ P2PStremio --all --appname="P2PStremio" icon="./build/icon.ico"`



# Contributers 🧤

<img src="https://avatars0.githubusercontent.com/u/27425384?s=400&u=d83889b1e4e0b27672227091b26589393333e5bc&v=4" alt="drawing" style="width:100px;"/>


> /shivamrawat0l 


# FAQ 💼

*Nothing available right now*  😅

# Follow Me
<a href="http://www.github.com/ShivamRawat0l">
<img src="https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png" width="30px">
</a>  

# Upcoming Updates

 - Option for series and others will be available
 - More feedback to the user when hosting the video
 - New Design
 - Adding MetaData to the stremioAddon
 - And Much More

![](https://img.shields.io/badge/license-MIT-green.svg)
#####  MIT License

