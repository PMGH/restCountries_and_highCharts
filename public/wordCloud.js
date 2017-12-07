var WordCloud = function(container, title, series){
  // var lines = text.split(/[,\.]+/g),
  // data = Highcharts.reduce(lines, function (arr, word) {
  //
  //   var obj = Highcharts.find(arr, function (obj) {
  //     return obj.name === word;
  //   });
  //
  //   if (obj) {
  //     obj.weight += 1;
  //   } else {
  //     obj = {
  //       name: word,
  //       weight: 1
  //     };
  //     arr.push(obj);
  //   }
  //
  //   return arr;
  // }, []);

  var chart = new Highcharts.chart({
    chart: {
      type: "wordcloud",
      renderTo: container
    },
    title: {
      text: title
    },
    series: [{
      data: series
    }]
  });
}
