const proxyurl = "https://cors-anywhere.herokuapp.com/";
const url = "https://www.graphs.ro/json.php";
fetch(proxyurl + url)
	.then(function(resp) {
		return resp.json();
	})
	.then(function(data) {
		let mydate = new Date(data.covid_romania[0].reporting_date);
        document.getElementById("last-update").innerHTML = mydate.toDateString();
        let casesToday = data['covid_romania'][0]['new_cases_today'];
        document.title = `${casesToday} cases today in Romania`
        document.getElementById("cases-today").innerHTML = casesToday;
	});

function searchCases() {
    var searched = document.getElementById('searchInput').value;
    const proxyurl = "https://cors-anywhere.herokuapp.com/";
    const url = "https://www.graphs.ro/json.php";
    fetch(proxyurl + url)
    .then(function(resp) {
        return resp.json();
    })
    .then(function(data) {
        for (x in data.covid_romania[0]['county_data']){
            if (data.covid_romania[0]['county_data'][x]['county_name'] == searched || data.covid_romania[0]['county_data'][x]['county_name'].toLowerCase() == searched || data.covid_romania[0]['county_data'][x]['county_name'].toUpperCase() == searched) {
                //document.getElementById("searchInput").className = "form-control is-invalid";
                document.getElementById("searchedCases").innerHTML = `Total cases ${data.covid_romania[0]['county_data'][x]['county_name']}: ~${data.covid_romania[0]['county_data'][x]['total_cases']}`;
            }
        }
    });
}
function dropCases(countyName, countyCases) {
    document.getElementById("dropCases1").innerHTML = `Total cases ${countyName}: ~${countyCases}`;
}

fetch(proxyurl + url)
    .then(function(resp) {
        return resp.json();
    })
    .then(function(data) {
        for(var i in data.covid_romania[0]['county_data']) {
            var id = data.covid_romania[0]['county_data'][i]['county_name'];
            var opt = document.createElement("A");
            document.getElementById("dropCases").innerHTML += `<a class="dropdown-item" onclick="dropCases('${id}', ${data.covid_romania[0]['county_data'][i]['total_cases']}); mapF(${i});">${id}</a>`;
        }
    });
