const shell = require('electron').shell;
const remote = require('electron').remote
var express = require('express')
var fs = require("fs")
const thumb = require('node-video-thumb')
var localtunnel = require('localtunnel');
const pathone = require("path");
const ngrok = require('ngrok');
const dotenv= require("dotenv")
dotenv.config();
var tunnel
var typeofthevideo
var serverrunning
var server
var path
var url

serverrunning = false
typeofthevideo = 'none'
path = null


const app = express()


function writedata(link, type) {
    fetch("https://www.jsonstore.io/"+process.env.JSONSTORE).then(a => a.json()).then((b) => {
        switch (type) {

            case "Movies":
                b.result.result[0].movies.push(link)
                break;
            case "Series":
                b.result.result[1].series.push(link)
                break;
            case "Other":
                b.result.result[2].other.push(link)
                break;
        }
        fetch("https://www.jsonstore.io/"+process.env.JSONSTORE, {
            body: JSON.stringify(b.result),
            headers: {
                "Content-Type": "application/json"
            },
            method: "POST"
        })
    })

}
async function deletemylink(link, type) {

    await fetch("https://www.jsonstore.io/"+process.env.JSONSTORE).then(async (a) => a.json()).then(async (b) => {
        switch (type) {
            case "Movies":
                b.result.result[0].movies = b.result.result[0].movies.filter(function (value, index, arr) {

                    return value != link;

                });
                break;
            case "Series":
                b.result.result[1].series = b.result.result[1].series.filter(function (value, index, arr) {

                    return value != link;

                });
                break;
            case "Other":
                b.result.result[2].other = b.result.result[2].other.filter(function (value, index, arr) {

                    return value != link;

                });
                break;
        }

        await fetch("https://www.jsonstore.io/"+process.env.JSONSTORE, {
            body: JSON.stringify(b.result),
            headers: {
                "Content-Type": "application/json"
            },
            method: "POST"
        })
    })
}



document.querySelector(".file-status").style.background = 'red';
if (path == null || path == undefined)
    document.querySelector(".hostbutton").disabled = true;
else
    document.querySelector(".hostbutton").disabled = false;

document.querySelector("#File").onchange = function (e) {
    document.querySelector(".hostbutton").disabled = false;

    path = e.target.files[0].path


    document.querySelector(".file-path").innerHTML = e.target.files[0].name.substring(0, 25) + ` <div class="file-status"></div>`;
    document.querySelector(".nameVideo").value = e.target.files[0].name;

    document.querySelector(".file-status").style.background = 'green';
}
document.getElementById('drag-file').ondrop = (e) => {
    e.preventDefault();

    for (let f of e.dataTransfer.files) {
        path = f.path;
        document.querySelector(".file-path").innerHTML = f.name + ` <div class="file-status"></div>`;
        document.querySelector(".file-status").style.background = 'green';
        document.querySelector(".nameVideo").value = f.name;

        document.querySelector(".hostbutton").disabled = false;
    }

    return false;
};


document.querySelector(".exitbutton").addEventListener('click', function exit() {
   
    let w = remote.getCurrentWindow()
    w.close()
});



function openurl() {
    shell.openExternal('localhost:8081');
}


var urlmain;



function runaserver() {

    if (document.querySelector(".Movies").toggled) {
        typeofthevideo = "Movies"
    } else if (document.querySelector(".Series").toggled) {
        typeofthevideo = "Series"
    } else if (document.querySelector(".Others").toggled) {
        typeofthevideo = "Other"
    } else {
        alert("Please select a category");
        return;
    }
    if (serverrunning) {
        document.querySelector(".hostbutton").textContent = "STOP";
        document.querySelector(".connections").innerHTML = `<div class="connection-status"></div>` + `Disconnected`;
        document.querySelector(".connection-status").style.background = 'red';


    } else {
        document.querySelector(".hostbutton").textContent = "HOST";
        document.querySelector(".connections").innerHTML = `<div class="connection-status"></div>` + `Connected`;
        document.querySelector(".connection-status").style.background = 'green';


    }
    if (serverrunning == false) {

       

        document.querySelector(".hostbutton").textContent = "STOP";
        serverrunning = true;
        
        app.get("/", (req, res) => {



            const stat = fs.statSync(path)
            const fileSize = stat.size
            const range = req.headers.range
            if (range) {
                const parts = range.replace(/bytes=/, "").split("-")
                const start = parseInt(parts[0], 10)
                const end = parts[1] ?
                    parseInt(parts[1], 10) :
                    fileSize - 1
                const chunksize = (end - start) + 1
                const file = fs.createReadStream(path, {
                    start,
                    end
                })
                const head = {
                    'Content-Range': `bytes ${start}-${end}/${fileSize}`,
                    'Accept-Ranges': 'bytes',
                    'Content-Length': chunksize,
                    'Content-Type': 'video/mkv',
                }
                res.writeHead(206, head);
                file.pipe(res);
            } else {
                const head = {
                    'Content-Length': fileSize,
                    'Content-Type': 'video/mkv',
                }
                res.writeHead(200, head)
                fs.createReadStream(path).pipe(res)
            }
        });
        app.get("/image",async (req,res)=>{
            try {
                await fs.unlinkSync(pathone.join(__dirname,"./image/image.png"))
                //file removed
              } catch(err) {
                await console.error(err)
              }
            const options = {
                source:path,
                target:pathone.join(__dirname,"./image/image.png"),
                width: 700,   // thumb's width
                height: 900,   // thumb's height
                seconds: 3    // seconds from start
              }
               
              
               await  thumb(options)
           await  res.sendFile(pathone.join(__dirname, "./image/image.png"));
            })
            app.get("/",(res,req)=>{
            req.send("wOrking") ; 
         })
        app.get("/data", (req, res) => {
            if (document.querySelector(".Movies").toggled) {
                typeofthevideo = "Movies"
            } else if (document.querySelector(".Series").toggled) {
                typeofthevideo = "Series"
            } else if (document.querySelector(".Others").toggled) {
                typeofthevideo = "Other"
            }

            const meta = {
                name: document.querySelector(".nameVideo").value,
                description: document.querySelector(".description").value,
                type: typeofthevideo,
            }
            res.send(meta);
        })

        server = app.listen(8002, async () => {
            console.log("LISTENING 8002")

            url = await ngrok.connect({
                proto: 'http', // http|tcp|tls, defaults to http
                addr: 8002, // port or network address, defaultst to 80// custom binary path, eg for prod in electron
            });
            await writedata(url, typeofthevideo)

        })
    } else {
        document.querySelector(".hostbutton").textContent = "HOST";
        serverrunning = false;
        deletemylink(url, typeofthevideo)
        server.close()

    }

    var data


    a = async function (type) {
        await fetch("https://www.jsonstore.io/"+process.env.JSONSTORE).then(a => a.json())
            .then(b => {
                data = b;
            })
        switch (type) {
            case "Movies":
                for (i = 1; i < data.result.result[0].movies.length; i++) {

                    await fetch(data.result.result[0].movies[i]).then(async (a) => {
                        console.log(a)
                        if (a.status == 404) {
                            console.log("DELTEING")
                            await deletemylink(data.result.result[0].movies[i], type)
                        }


                    })
                }
                break;
            case "Series":
                for (i = 1; i < data.result.result[1].series.length; i++) {
                   
                    await fetch(data.result.result[1].series[i]).then(async (a) => {
                      
                        if (a.status == 404)
                            console.log(type);
                        await deletemylink(data.result.result[1].series[i], type)


                    })
                }
                break;
            case "Other":
                break;
        }
        for (i = 1; i < data.result.result[2].other.length; i++) {

            await fetch(data.result.result[2].other[i]).then(async (a) => {
                if (a.status == 404)
                    await deletemylink(data.result.result[2].other[i], type)


            })
        }
    }
    a(typeofthevideo)
}