var makeRequest = function(url, callback){
  var request = new XMLHttpRequest();
  request.open("GET", url);
  request.addEventListener('load', callback);
  request.send();
}

var requestComplete = function(){
  if (this.status != 200) return;
  var jsonString = this.responseText;
  var apiData = JSON.parse(jsonString);
  wordcloudByValue(apiData, "area", 0, 2000000);
  pieChartCountriesByValue(apiData, "area", 500000, 2000000);
  wordcloudByValue(apiData, "population", 1000000, 50000000);
  pieChartCountriesByValue(apiData, "population", 100000000);
  wordcloudByValue(apiData, "gini", 50);
  pieChartCountriesByValue(apiData, "gini", 50);
}

var wordcloudByValue = function(apiData, value, minimum, maximum){
  if (minimum === undefined){
    var minimum = 0;
  }

  if (maximum === undefined){
    var maximum = 0;
    for (var country of apiData){
      if (country[value] > maximum){
        maximum = country[value];
      }
    }
  }

  var id = `${value}-wordcloud-chart`;

  var chartDiv = createDiv(id);
  document.body.appendChild(chartDiv);

  var container = document.querySelector('#' + id);
  var title = `Countries by ${value}`;
  var series = [];

  for (var country of apiData){
    var statistic = country[value];
    if (statistic >= minimum && statistic <= maximum){
      var country = {
        name: country.name,
        weight: country[value]
      }
      series.push(country);
    }
  }
  new WordCloud(container, title, series);
}

var pieChartCountriesByValue = function(apiData, value, minimum, maximum){
  if (minimum === undefined){
    var minimum = 0;
  }

  if (maximum === undefined){
    var maximum = 0;
    for (var country of apiData){
      if (country[value] > maximum){
        maximum = country[value];
      }
    }
  }

  var id = `${value}-pie-chart`;

  var chartDiv = createDiv(id);
  document.body.appendChild(chartDiv);

  var container = document.querySelector('#' + id);
  var title = `Countries by ${value}`;
  var series = [{
    name: `Countries by ${value}`,
    data: []
  }];

  for (var country of apiData){
    var statistic = country[value];
    if (statistic >= minimum && statistic <= maximum){
      var country = {
        name: country.name,
        y: country[value]
      }
      series[0].data.push(country);
    }
  }
  new PieChart(container, title, series);
}

// var createInput = function(){
//   var newInput = document.createElement('input');
// return newInput;
// }

var createDiv = function(id, divText){
  var newDiv = document.createElement('div');
  newDiv.id = id;
  newDiv.innerText = divText;
  return newDiv;
}

// var wordChart = function(apiData){
//   var id = 'countryName-word-chart'
//   var chartDiv = createDiv(id);
//   document.body.appendChild(chartDiv);
//   var container = document.querySelector('#' + id);
//   var title = '';
//   var text = '';
//
//   for (var country of apiData){
//     text += country.name + ", ";
//   }
//
//   new WordCloud(container, title, text);
// }


var app = function(){
  var url = "https://restcountries.eu/rest/v2/all";
  makeRequest(url, requestComplete);
}

window.addEventListener('load', app);
