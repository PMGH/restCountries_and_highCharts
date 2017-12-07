var BarChart = function(container, title, categories, series){

  var chart = new Highcharts.Chart({
    chart: {
      type: "column",
      renderTo: container
    },
    title: {
      text: title
    },
    xAxis: {
      categories: categories
    },
    series: series
  });

};
