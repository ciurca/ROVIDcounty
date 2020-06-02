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
                    data: weekData,
                    borderColor: 'rgb(2, 117, 216)',
                    backgroundColor: 'rgb(2, 117, 216)',
                    borderWidth: 1
                }]
            },

            // Configuration options go here
            options: {
                tooltips: {
                    enabled: true
                },
                hover: {
                    animationDuration: 1
                },
                animation: {
                    duration: 1,
                    onComplete: function () {
                        var chartInstance = this.chart,
                            ctx = chartInstance.ctx;
                        ctx.textAlign = 'center';
                        ctx.fillStyle = "rgba(0, 0, 0, 1)";
                        ctx.textBaseline = 'bottom';

                        this.data.datasets.forEach(function (dataset, i) {
                            var meta = chartInstance.controller.getDatasetMeta(i);
                            meta.data.forEach(function (bar, index) {
                                var data = dataset.data[index];
                                ctx.fillText(data, bar._model.x, bar._model.y - 5);

                            });
                        });
                    }
                }
        }
        });
    });
}
