// Source code that sends data to localStore every time the submit button gets clicked;
// namely event handler.
document.getElementById('issueImputForm').addEventListener('submit', saveIssue);

function saveIssue(e){
    var issueDesc = document.getElementById('issueDescInput').value;
    var issueSeverity = document.getElementById('issueSeverityInput').value;
    var issueAssignedTo = document.getElementById('issueAssignedToInput').value;
    var issueId = chance.guid();
    var issueStatus = 'Open';

    var issue = {
        id: issueId,
        description: issueDesc,
        severity: issueSeverity,
        assignedTo: issueAssignedTo,
        status: issueStatus
    }

    if(localStorage.getItem('issues') === null){
        var issues = [];
        issues.push(issue);
        localStorage.setItem('issues', JSON.stringify(issues));
    } else {
        var issues = JSON.parse(localStorage.getItem('issues'));// insert new object. Generate an array and assign it to 'issues'.
        issues.push(issue);
        localStorage.setItem('issues', JSON.stringify(issues));
    }

    document.getElementById('issueInputForm').reset(); // removes values in the form.
    fetchIssues();// new element is in localStorage, list output needs to be regenerated.
    // new element needs to be included in the output list as well.
    e.preventDefault();
}

function fetchIssues(){
    var issues = JSON.parse(localStorage.getItem('issues'));
    var issuesList = document.getElementById('issuesList');

    issuesList.innerHTML = '';
    for(var i = 0; i < issues.length; i++){
        var id = issues[i].id
        var desc = issues[i].description
        var severity = issues[i].severity
        var assignedTo = issue[i].assignedTo
        var status = issues[i].status

        issuesList.innerHTML +=   '<div class="well">'+
                                  '<h6>Issue ID: ' + id + '</h6>'+
                                  '<p><span class="label label-info">' + status + '</span></p>'+
                                  '<h3>' + desc + '</h3>'+
                                  '<p><span class="glyphicon glyphicon-time"></span> ' + severity + '</p>'+
                                  '<p><span class="glyphicon glyphicon-user"></span> ' + assignedTo + '</p>'+
                                  '<a href="#" onclick="setStatusClosed(\''+id+'\')" class="btn btn-warning">Close</a> '+
                                  '<a href="#" onclick="deleteIssue(\''+id+'\')" class="btn btn-danger">Delete</a>'+
                                  '</div>';
    }
}