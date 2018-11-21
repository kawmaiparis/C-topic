$(function() {
  var ctx = $("#storage-chart");
  var chart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: ["Hard Drive", "Solid State Drive", "DDR4 RAM"],
      datasets: [{
        label: 'Average latency (ms)',
        data: [15.4, 0.034, 0.0000000781],
        backgroundColor: [
          '#f44336',
          '#ffc107',
          '#4caf50'
        ]
      }]
    },
    options: {
      maintainAspectRatio: false,
      legend: {
        display: false
      },
      animation: {
        duration: 7000
      },
      scales: {
        yAxes: [{
          scaleLabel: {
            display: true,
            labelString: 'Average latency (ms)'
          },
          type: 'logarithmic',
          tics: {
            beginAtZero: true
          }
        }]
      }
    }
  });
});
