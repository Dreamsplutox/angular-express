# angular-jasper-API-express

In this node.js express application, you will find miscallenous API routes to execute usefull processes with the Jasper API.

For example, when you'll go to the route "http://localhost:8082/export_reports_folder/parameters"
You will have every reports contained on the specified folder with customized options (choosed in "parameters") inside your "downloads" folder.

## Mandatory packages

express
cors
xml2js

Install them by running the "npm install" command

## Configuration

Update the configuration.txt file with your Jasper credentials

example :
 
username=jasperadmin
password=jasperadmin

## Features

### Export all reports of a folder (with options)

Route : "http://localhost:8082/export_reports_folder/parameters"

Parameters should be passed in this format : 

your_folder_uri_with_slash_replaced_by_+\*your_export_format\*inputControl_1=value_1&inputControl_2=value_2 ...

Here is a sample for a folder with billing reports :
http://localhost:8082/export_reports_folder/+reports+billing\*pdf\*BeginDateO=MONTH-1&EndDateO=MONTH-1