

var jobData = '{ \
        "baseOutputFilename": "EmployeeReportSample", \
        "description": "Sample desctiption", \
        "label": "Sample Job Name", \
        "outputFormats": { \
            "outputFormat": [ \
                "PDF" \
            ] \
        }, \
        "outputTimeZone": "America/Los_Angeles", \
        "repositoryDestination": { \
            "folderURI": "/temp" \
        }, \
        "source": { \
            "parameters": { \
                "parameterValues": { \
                } \
            }, \
            "reportUnitURI": "/adhoc/topics/Employees" \
        }, \
        "trigger": { \
            "simpleTrigger": { \
                "occurrenceCount": 1, \
                "startDate": "2050-10-26 10:00", \
                "startType": 2, \
                "timezone": "America/Los_Angeles" \
            } \
        } \
    }';

function scheduleReport1(){
    alert("test import external javascript == OK");
    fetch ('http://localhost:4200/jasperserver-pro/rest_v2/jobs', {
        method: 'PUT',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Basic ' + btoa("jasperadmin|organization_1:jasperadmin"),
            'X-REMOTE-DOMAIN': '1'
        },
        body: jobData
    })
    .then(response => response.json())
    .catch(error => console.error('Schedule Error:', error))
    .then(response => {
        console.log('Schedule Success:', JSON.stringify(response));
        alert('Job scheduled.');
    });
}

function scheduleReport2(){
    console.log("starting job schedule action.");
    fetch ('http://localhost:4200/jasperserver-pro/rest_v2/jobs', {
        method: 'PUT',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Basic ' + btoa("jasperadmin|organization_1:jasperadmin"),
            'X-REMOTE-DOMAIN': '1'
        },
        body: jobData
    })
    .then(response => response.json())
    .catch(error => console.error('Schedule Error:', error))
    .then(response => {
        console.log('Schedule Success:', JSON.stringify(response));
        alert('Job scheduled.');
    });
}