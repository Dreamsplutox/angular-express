// IMPORTS

const express = require("express");
const cors = require("cors");
const http = require('http');
// const https = require('https');
const fs = require('fs');
const xml2js = require('xml2js');
var request = require('request');
const axios = require('axios');

// DEFINE GLOBALS 

// credentials
var username = "";
var password = "";

// Function to get the jasper server credentials from the configuration file
function getConfigurationVariables(){
  fs.readFile('configuration.txt', 'utf8' , (err, data) => {
    if (err) {
      console.error(err);
      process.exit(1);
    }
    var lines = data.split(/\r?\n/);
    // if one line is empty, exit
    for(i = 0; i < lines.length; i++){
      if(lines[i].split("=")[1] == ""){
        console.log("Error, the configuration file is incorrect. All fields must be filled");
        process.exit(1);
      }
    }
    // try to fill all configuration variables
    try{
      username = lines[0].split("=")[1];
      password = lines[1].split("=")[1];
    }catch(error){
      console.log("error : "+error);
      process.exit(1);
    }
  })
}

getConfigurationVariables();

// PRECONFIG

const app = express();

// //authorize all origins
// var corsOptions = {
//   origin: "*"
// };

// app.use(cors(corsOptions));
// parse requests of content-type - application/json
app.use(express.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));


// ROUTES

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to the node.js Jasper API application." });
});

// export all reports inside a folder to the format you want
// get list of jasper jobs route
app.get("/export_reports_folder/:id", (req, res) => {
  const params = req.params.id;
  console.log("params => "+params);
  //split params to get arguments for the request
  var splitted_params = params.split("*");
  var folder = splitted_params[0].replace(/[+]/g, "/");
  var export_format = splitted_params[1];
  // var report_uri = splitted_params[2].replace(/[+]/g, "/");
  // var report_name = report_uri.split("/");
  // report_name = report_name[report_name.length-1];
  var report_params = splitted_params[2];
  // var export_format = splitted_params[4];


  console.log("folder : "+ folder);
  console.log("export_format "+ export_format);
  console.log("report_params "+ report_params);



  //first, get all reports uri from the folder
  console.log("get all report uri from the fodler");

  //create btoa variable (credentials used by default here)
  var btoa = Buffer.from(username + ":"+password, 'binary').toString('base64');

  //define a function to call several times a http request depending of the result of another request
  // a counter will help us to know which report we need to export
  function exportReports(all_reports_uri, counter){
    //if counter is equal to the reports uri list, exit the function
    if(counter == all_reports_uri.length){
      console.log("All reports have been exported, exit");
      return ;
    }
    
    var current_report_uri = all_reports_uri[counter][0];
    console.log("current report uri type "+ typeof current_report_uri);

    //increment counter for the next occurence
    counter += 1;


    // return axios({
    //   url: 'http://srvreporting-01:8080/jasperserver-pro/rest_v2/reports'+current_report_uri+'.'+export_format+'?'+report_params,
    //   method: 'get',
    //   headers: {
    //     Accept: 'application/pdf',
    //     'Content-Type': 'application/pdf',
    //     mode: 'no-cors'
    //   }
    // })
    //   .then(response => response.blob())
    //   .then(blob => {
    //     var url = window.URL.createObjectURL(blob)
    //     var a = document.createElement('a')
    //     a.href = url
    //     a.download = fileName
    //     a.click()
    //     a.remove()
    //     setTimeout(() => window.URL.revokeObjectURL(url), 100)
    // });


    var options = {
      'method': 'GET',
      'url': 'http://srvreporting-01:8080/jasperserver-pro/rest_v2/reports'+current_report_uri+'.'+
      export_format+'?'+report_params,
      "rejectUnauthorized": false,
      //"responseType": "blob",
      "encoding": null,
      'headers': {
        //use our base64 credentials
        'Authorization': 'Basic '+btoa,
        'Content-Type': 'application/pdf',
        'Cookie': 'userLocale=fr_FR'
      },
    };

    var my_response = request(options, function (error, response) {
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
        //console.log("body length "+response.body.length);
        console.log("response code "+ response.statusCode);
        //get the filename to give a valid PDF names
        var report_name = current_report_uri.split("/");
        report_name = report_name[report_name.length-1];

        console.log("update response headers");
        //Store the PDF response to a file

        fs.writeFileSync("reports/"+report_name+".pdf", response.body, "binary");

      }
    });

    // console.log("my_response attrib : " + Object.getOwnPropertyNames(my_response));
    // console.log("headers : "+ my_response.headers["Content-Type"]);

  }

  //keep the result of the query => all uri of reports inside the folder
  all_reports_uri = [];

  var options = {
    'method': 'GET',
    'url': 'http://srvreporting-01:8080/jasperserver-pro/rest_v2/resources?folderUri='+folder+'&type=reportUnit',
    "rejectUnauthorized": false,
    'headers': {
      //use our base64 credentials
      'Authorization': 'Basic '+btoa,
      'Content-type': 'application/json',
      //'encoding' : null,
      'Cookie': 'userLocale=fr_FR'
    }
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
      //convert XML response to JSON
      xml2js.parseString(response.body, (err, json) => {
          if(err) {
              throw err;
          }
          //only keep report uri
          var lookup = json["resources"]["resourceLookup"];
          // feed the report_collection variable with all uri
          for(i = 0; i < lookup.length; i++){
              all_reports_uri.push(lookup[i].uri);
              //console.log("report collection "+i+" = "+report_collection[i]);
          }
          console.log(all_reports_uri);
          //if all_reports_uri is empty, don't call antoher request and trigger an error
          if(all_reports_uri.length == 0){
            console.log("Erreur, aucun rapport trouvé dans le dossier indiqué");
          }else{
            //else, call the exportReports function
            exportReports(all_reports_uri, 0);
          }

      });
    }
  });
});

// set port, listen for requests
const PORT = process.env.PORT || 8082;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});