window.onclick = function () {

  var chart = new CanvasJS.Chart("chartContainer", {
    animationEnabled: false,
    title: {
      text: "Infectador/Millisseconds"
    },
    axisX: {
      title: "Millisseconds",
      includeZero: true,
      scaleBreaks: {
        autoCalculate: true
      }
    },
    axisY: {
      title: "Numero de infectados",
      includeZero: true,
      scaleBreaks: {
        autoCalculate: true
      }
    },
    data: [{
      type: "line",
      xValueFormatString: "Numero de infectados",
      color: "#ff0000",
      dataPoints: PlotP
    }]
  });
  chart.render();

}



window.onload = function () {

  var chart = new CanvasJS.Chart("chartContainer", {
    animationEnabled: true,
    title: {
      text: "COVID-19 - Infectador/Millisseconds"
    },
    axisX: {
      title: "Millisseconds",
      includeZero: true,
      scaleBreaks: {
        autoCalculate: true
      }
    },
    axisY: {
      title: "Numero de infectados",
      includeZero: true,
      scaleBreaks: {
        autoCalculate: true
      }
    },
    data: [{
      type: "line",
      xValueFormatString: "Numero de infectados",
      color: "#F08080",
      dataPoints: [{ x: 0, y: 0 }]
    }]
  });
  chart.render();

}


window.onmousemove = chart.render();