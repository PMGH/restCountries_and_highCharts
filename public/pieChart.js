var PieChart = function(container, title, series){
  // Highcharts.Chart is like a factory for charts
  var chart = new Highcharts.Chart({
    chart: {
      type: "pie",
      renderTo: container
    },
    title: {
      text: title
    },
    series: series
  });
};
