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
			title: {
				text: "DAILY EXPENSES",
			},
			xAxis: {
				type: 'datetime',
				category: ["2015-01", "2015-02", "2015-03", "2015-04", "2015-04", "2015-05", "2015-05", "2015-06"]
			},
			series: [{
				name: 'Expenses',
				data: [10000, 525.09, 200.05, 234.67, 890, 456.9, 3500.00, 50.50, 7]
			}]
		};

		$('#graphs').highcharts(highChartConfig)
	}

});


