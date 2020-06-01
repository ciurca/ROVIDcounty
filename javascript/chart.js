function mapF(id){
    fetch(proxyurl1 + url1)
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
        if (window.bar != undefined){
            window.bar.destroy();
        }
        window.bar = new Chart(ctx, {
            // The type of chart we want to create
            type: 'bar',
            // The data for our dataset
            data: {
                labels: labels,
                datasets: [{
                    label: label,
                    borderColor: 'rgb(2, 117, 216)',
                    backgroundColor: 'rgb(2, 117, 216)',
                    data: weekData,
                }]
            },

            // Configuration options go here
            options: {
                scales: {
                    xAxes: [{
                        display: false
                    }],
                 yAxes: [{
                        ticks: {
                            beginAtZero: true
                        }
                    }]
            }
        }
        });
    });
}
