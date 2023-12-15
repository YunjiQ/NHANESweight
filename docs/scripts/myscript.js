// add your JavaScript/D3 to this file
function calculateBMI(weight, height) {
  return weight*703 / (height * height);
}

function updateBMI() {
  const weight = document.getElementById('weight').value;
  const height = document.getElementById('height').value;
  const bmi = calculateBMI(weight, height).toFixed(1);

  const bmiIndicator = d3.select('#bmi-indicator');
  bmiIndicator.style('background-color', getBMIColor(bmi));

  bmiIndicator.text(bmi);

  const scale = d3.scaleLinear()
    .domain([15, 40])
    .range([0, 600]);

  const position = scale(bmi);
  const indicatorWidth = parseInt(bmiIndicator.style('width'));

  bmiIndicator.style('left', `${position - indicatorWidth / 2}px`);
}

function getBMIColor(bmi) {
  if (bmi < 18.5) return 'lightblue';
  if (bmi < 25) return 'green';
  if (bmi < 30) return 'yellow';
  return 'red';
}

// Initial setup for the BMI scale
const svgWidth = 600;
const svgHeight = 50;
const svg = d3.select("#bmi-chart")
  .attr("width", svgWidth)
  .attr("height", svgHeight);

const categories = [
  { min: 15, max: 18.5, color: 'lightblue', label: 'Underweight'},
  { min: 18.5, max: 25, color: 'green', label: 'Healthy Weight'},
  { min: 25, max: 30, color: 'yellow', label: 'Overweight'},
  { min: 30, max: 40, color: 'red', label: 'Obese'},
];

const xScale = d3.scaleLinear()
  .domain([15, 40])
  .range([0, svgWidth]);

categories.forEach(function(category) {
  svg.append('rect')
    .attr('x', xScale(category.min))
    .attr('width', xScale(category.max) - xScale(category.min))
    .attr('height', svgHeight)
    .attr('fill', category.color);

  svg.append('text')
    .attr('x', (xScale(category.min) + xScale(category.max)) / 2)
    .attr('y', 35)
    .attr('text-anchor', 'middle')
    .attr('fill', 'black')
    .attr('font-size', '12px')
    .text(category.label);
});

categories.forEach(function(category, index) {
  d3.select('#bmi-chart-container').append('div')
    .attr('class', 'bmi-label')
    .style('left', `${xScale(category.min)}px`)
    .text(category.min);

  if (index === categories.length - 1) {
    d3.select('#bmi-chart-container').append('div')
      .attr('class', 'bmi-label')
      .style('left', `${xScale(category.max)}px`)
      .text(category.max);
  }
});



const bardata_lose = [
  { value: 225, text: "more vege, less sugar, low carbs, less fat" },
  { value: 179, text: "more vege, less sugar" },
  { value: 176, text: "more vege" }
];
const bardata_maintain = [
  { value: 213, text: "no preference"},
  { value: 107, text: "more vege" },
  { value: 79, text: "more vege, less sugar"}
];


const bar_svg = d3.select("div#plot")
  .append("svg")
  .attr("width", 700)
  .attr("height", 150);

function updateBarChart(data, color) {
  bar_svg.selectAll("rect").remove();
  bar_svg.selectAll("text").remove();

  const bars = bar_svg.selectAll("rect")
    .data(data)
    .enter()
    .append("rect")
    .attr("x", 250)
    .attr("y", (d, i) => i * 25 + 10)
    .attr("width", d => d.value)
    .attr("height", 20)
    .attr("fill", color);

  const texts = bar_svg.selectAll("text")
    .data(data)
    .enter()
    .append("text")
    .attr("x", 255)
    .attr("y", (d, i) => i * 25 + 25)
    .text(d => d.text)
    .attr("fill", "black")
    .attr("font-size", "12px");
}


d3.select("div#question").selectAll("input")
  .on("click", function(d) {
    const value = d3.select(this).property("value");
    if (value === "lose") {
      updateBarChart(bardata_lose, "lightblue");
    } else if (value === "maintain") {
      updateBarChart(bardata_maintain, "lightgreen");
    }
  });



