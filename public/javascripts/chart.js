function initChart () {
  initHost ('host1');
}

var seriesOptions = [
  { strokeStyle: 'rgba(255, 0, 0, 1)', fillStyle: 'rgba(255, 0, 0, 0.1)', lineWidth: 3 },
  { strokeStyle: 'rgba(0, 255, 0, 1)', fillStyle: 'rgba(0, 255, 0, 0.1)', lineWidth: 3 },
  { strokeStyle: 'rgba(0, 0, 255, 1)', fillStyle: 'rgba(0, 0, 255, 0.1)', lineWidth: 3 },
  { strokeStyle: 'rgba(255, 255, 0, 1)', fillStyle: 'rgba(255, 255, 0, 0.1)', lineWidth: 3 }
];

var dataSets = null;

// Set up the chart.
function initHost (hostId) {
    
    // Initialize an empty TimeSeries for each CPU.
    dataSets = [new TimeSeries(), new TimeSeries(), new TimeSeries(), new TimeSeries()];

    // Build the timeline.
    var millisPerPixel = 20;
    var millisPerLine = 1000;
    var timeline = new SmoothieChart ({ //millisPerPixel: 20,
					grid: {
					    strokeStyle      : '#555555',
					    lineWidth        : 1,
					    millisPerLine    : millisPerLine,
					    verticalSections : 4 
					}
				      });

    // Add the time series to the chart.
    for (var i = 0; i < dataSets.length; i++) {
	timeline.addTimeSeries (dataSets[i], seriesOptions[i]);
    }
    
    // Start the chart.
    timeline.streamTo(document.getElementById(hostId + 'Cpu'), 100);
}

instrumentationApp.factory ('charts', function () {
    return { 
	addData : function (i, time, value) {
	    console.log ("cat " + i + "time "+  time + "value " +  value);
	    dataSets[i].append(time, value);
	}
    };
});
