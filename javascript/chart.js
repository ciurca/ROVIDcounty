function mapF(id){
    fetch('https://www.graphs.ro/json.php')
    .then(function(resp) {
        return resp.json();
    })
    .then(function(data) {
        function dateF(x){
            var date = new Date(data.covid_romania[x]['reporting_date']);
            var month = date.toLocaleString('default', { month: 'short' });
            return month + " " + date.getDate()
        };
        var countyId = id;
        function data1(day){
            return data.covid_romania[day]['county_data'][countyId]['new_cases_today'];
        }
        var weekData = [data1(6), data1(5), data1(4), data1(3), data1(2), data1(1), data1(0)];
        var label = `${data.covid_romania[0]['county_data'][countyId]['county_name']} weekly`;
        var labels = [dateF(6), dateF(5), dateF(4), dateF(3), dateF(2), dateF(1), dateF(0)];
        var ctx = document.getElementById('myChart').getContext('2d');
        chart.destroy();
        var chart = new Chart(ctx, {
            // The type of chart we want to create
            type: 'bar',
            // The data for our dataset
            data: {
                labels: labels,
                datasets: [{
                    label: label,
                    backgroundColor: [
                        "rgb(255, 99, 132)",
                        "rgb(255, 159, 64)",
                        "rgb(255, 205, 86)",
                        "rgb(75, 192, 192)",
                        "rgb(54, 162, 235)",
                        "rgb(153, 102, 255)",
                        "rgb(201, 203, 207)"
                    ],
                    borderColor: 'rgb(255, 99, 132)',
                    data: weekData
                }]
            },

            // Configuration options go here
            options: {}
        });
    });
}
