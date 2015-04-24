$(document).ready(function(){
	
	var newData = [];
	
	var request = {
		type: "GET", 
		url: "http://localhost:3000/expenses",
		dataType: "JSON", 
		success: function(response) {
			console.log(response[0].month);
			console.log(response[0].amount);

			for (var i = 0; i < response.length; i++) {
				date = response[i].month;
				price = response[i].amount;

				newItem = {
					x: [],
					y: []
				};
				newItem.x = date;
				newItem.y = price;

				newData.unshift(newItem);
			};
 

			console.log(newItem);

			initializeHighChart();
		}
	};

	$.ajax(request);

	function initializeHighChart() {
		var highChartConfig = {
			chart: {
				type: 'line'
			},
			xAxis: {
				type: 'datetime',
				category: ["2015-01", "2015-02"]
			},
			series: [{
				name: 'new series',
				data: [7.0, 8]
			}]
		};

		$('#graphs').highcharts(highChartConfig)
	}

});


