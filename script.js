function covidCases() {
    fetch("https://covid19.geo-spatial.org/api/dashboard/getCasesByCounty")
    .then(function(resp) {
        return resp.json();
    })
    .then(function(data) {
        document.getElementById("casesms").innerHTML = data.data.data[6]['total_county'];
    });
}
function searchCases() {
    var searched = document.getElementById('searchInput').value;
    fetch("https://covid19.geo-spatial.org/api/dashboard/getCasesByCounty")
    .then(function(resp) {
        return resp.json();
    })
    .then(function(data) {
        for (x in data.data.data){
            if (data.data.data[x]['county'] == searched || data.data.data[x]['county'].toLowerCase() == searched || latinize(data.data.data[x]['county']) == searched || latinize(data.data.data[x]['county']).toLowerCase() == searched || latinize(data.data.data[x]['county']) == searched) {
                //document.getElementById("searchInput").className = "form-control is-invalid";
                document.getElementById("searchedCases").innerHTML = `Total cases ${data.data.data[x]['county']}: ~${data.data.data[x]['total_county']}`;
            } else {
               // document.getElementById("searchInput").className = "form-control  is-invalid";
            }
        }
    });
}
function dropCases(countyName, countyCases) {
    document.getElementById("dropCases1").innerHTML = `Total cases ${countyName}: ~${countyCases}`;
}
fetch("https://covid19.geo-spatial.org/api/dashboard/getCasesByCounty")
    .then(function(resp) {
        return resp.json();
    })
    .then(function(data) {
        for (var i in data.data.data) {
            var id = data.data.data[i]['county'];
            // var name = employee1[i].name;
            var opt = document.createElement("A");
            document.getElementById("dropCases").innerHTML += `<a class="dropdown-item" onclick="dropCases('${id}', ${data.data.data[i]['total_county']})">${id}</a>`;
            }
    });