// IMPORTS

const express = require("express");
const cors = require("cors");
const https = require('https');
const http = require('http');
const fs = require('fs');

// PRECONFIG

var options = {
  key: fs.readFileSync('privkey.pem'),
  cert: fs.readFileSync('cert.pem')
};
var privateKey = fs.readFileSync("privkey.pem");
var certificate = fs.readFileSync("cert.pem");
var fullchain = fs.readFileSync("fullchain.pem");

const app = express();

//authorize all origins
var corsOptions = {
  origin: "*"
};

app.use(cors(corsOptions));
// parse requests of content-type - application/json
app.use(express.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// ROUTES

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to the node.js REST Jasper application." });
});

// get jasper index.html route
app.get("/jobs", (req, res) => {
  
  var request = require('request');
  var options = {
    'method': 'GET',
    'url': 'https://srvreporting.arnaudjasper2.tk:8443/jasperserver-pro/rest_v2/jobs',
    "rejectUnauthorized": false,
    'headers': {
      'Authorization': 'Basic amFzcGVyYWRtaW46amFzcGVyYWRtaW4=',
      'Cookie': 'userLocale=fr_FR'
    }
  };
  
  request(options, function (error, response) {
    if (error){
      res.json(error)
      throw new Error(error);
    }
    console.log(response.body);
    res.json(response.body);
  });
});

// get list of jasper jobs route
app.get("/jobsparameterizedschedule/:id", (req, res) => {
  const params = req.params.id;
  console.log("params => "+params);
  //split params to get arguments for the request
  var splitted_params = params.split("&")
  var mail = splitted_params[0];
  var btoa = splitted_params[1];
  var report_uri = splitted_params[2].replace(/[+]/g, "/");
  var report_name = report_uri.split("/");
  report_name = report_name[report_name.length-1];
  var report_params = splitted_params[3].split("µ");
  var export_format = splitted_params[4];
  var report_params_dict = {};

  //insert data inside our report_params_dict
  for(var i = 0; i < report_params.length; i++){
    var report_params_split = report_params[i].split("=");
    //split[0] = parameter and split[1] = value
    report_params_dict[report_params_split[0]] = [report_params_split[1]];
  }

  //logs
  // console.log("report name = "+ report_name);
  // console.log("print schedule report params dict");
  // for(var key in report_params_dict){
  //   console.log("key = "+key+" val = "+report_params_dict[key]);
  // }
  // console.log("\nStringify dict =>\n"+JSON.stringify(report_params_dict));
  // console.log("mail " + mail + "\nbtoa " + btoa + "\nreport_uri "+report_uri);
  // console.log("params = "+params);

  var jobData = '{ \
        "version": 2, \
        "username": "jasperadmin", \
        "label": "publisher_123_report", \
        "description": "", \
        "creationDate": "2015-12-30T02:02:40.382+03:00", \
        "trigger": { \
            "simpleTrigger": { \
              "id": "1770", \
              "misfireInstruction": "0", \
              "startType": "1", \
              "timezone": "Europe/Paris", \
              "version": "0", \
              "occurrenceCount": "1" \
            } \
        }, \
        "source": { \
              "reportUnitURI": "'+report_uri+'", \
              "parameters": { \
                 "parameterValues": '+JSON.stringify(report_params_dict)+' \
              } \
        }, \
        "baseOutputFilename": "'+report_name+'", \
        "outputLocale": "", \
        "mailNotification": { \
            "subject": "rapport jasper '+report_name+'", \
            "messageText": "", \
            "toAddresses": { \
                "address": ["'+mail+'"] \
            }, \
            "ccAddresses": { \
                "address": [] \
            }, \
            "bccAddresses": { \
                "address": [] \
            }, \
            "includingStackTraceWhenJobFails" : false, \
            "resultSendType" : "SEND_EMBED", \
            "skipEmptyReports" : true, \
            "skipNotificationWhenJobFails" : false \
        }, \
        "outputTimeZone": "Europe/Paris", \
        "repositoryDestination": { \
            "version": 0, \
            "folderURI": "/temp", \
            "sequentialFilenames": false, \
            "overwriteFiles": true, \
            "outputDescription": "", \
            "timestampPattern": null, \
            "saveToRepository": false, \
            "defaultReportOutputFolderURI": null, \
            "usingDefaultReportOutputFolderURI": false, \
            "outputLocalFolder": null \
        }, \
        "outputFormats": { \
            "outputFormat": ["'+export_format+'"] \
        } \
    }';

  var request = require('request');
  var options = {
    'method': 'PUT',
    'url': 'https://srvreporting.arnaudjasper2.tk:8443/jasperserver-pro/rest_v2/jobs',
    "rejectUnauthorized": false,
    'headers': {
      //use our base64 credentials
      'Authorization': 'Basic '+btoa,
      'Content-type': 'application/json',
      'Cookie': 'userLocale=fr_FR'
    },
    "body" : jobData
  };
  
  request(options, function (error, response) {
    if (error || response.body == ""){
      //if we have an error object with properties, change the res.json
      if(response.body != ""){
        console.log(getOwnPropertyNames(error));
        res.json("ERREUR : "+error["message"]);
      }else{
        res.json("ERREUR : aucune réponse récupérée, vous n'avez peut être pas les droits suffisants");
      }
      //throw new Error(error);
    }else{
      console.log(response.body);
      res.json(response.body);
    }
  });
});

// // set port, listen for requests
// const PORT = process.env.PORT || 8085;
// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}.`);
// });

https.createServer({
  key: fs.readFileSync('privkey.pem'),
  cert: fs.readFileSync('fullchain.pem')  
}, app)
.listen(8085, function(){
  console.log("Server is running on port 8085")
});