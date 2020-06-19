//Function for the bar and bubble chart
function visualizations(sample) {
  
    // D3 library to read in samples.json.
    d3.json("./data/samples.json").then(function(data){
      const samples = data.samples;
      const result = samples.filter(sampleobj => sampleobj.id==sample)[0]
  
    //Bar Chart - top 10 values
      var barValue = result.sample_values.slice(0,10).reverse();
      var otu_ids_bar = result.otu_ids.slice(0,10).map((item => "OTU " + item)).reverse(); 
      var otu_labels_bar = result.otu_labels.slice(0,10).reverse();
  
      var trace_bar = {
        x: barValue,
        y: otu_ids_bar,
        text: otu_labels_bar,
        type: 'bar',
        orientation: "h",
      };
  
      var data_bar = [trace_bar];
      var layout_bar = {
        margin: {
            l: 200,
          },
      };  
  
      Plotly.newPlot("bar", data_bar, layout_bar)
    
      //Bubble Chart
        var xValues = result.otu_ids;
        var yValues = result.sample_values;
        var Size = result.sample_values;
        var B_Colors = result.otu_ids;
        var tValues = result.otu_values;
        
        var trace_bubble = {
          x: xValues,
          y: yValues,
          text: tValues,
          mode: 'markers',
          marker: {
            size: Size,
            color: B_Colors
          }
        };
    
        var data = [trace_bubble];
        var layout = {
          xaxis: {title: "OTU ID"}
        };
    
        Plotly.newPlot('bubble', data, layout)
  
    });
  }

  // Function for the panel
function DemoPanel(sample){

  d3.json("./data/samples.json").then(function(data){
  
        var sample_metadata = d3.select("#sample-metadata");
        var metadata = data.metadata;
        var result = metadata.filter(sampleobj => sampleobj.id==sample)[0]
    
    // clearing any existing metadata
        sample_metadata.text("");
        
    // `Object.entries` to add each key and value pair to the panel
        Object.entries(result).forEach(([key, value]) => {
  
          var row = sample_metadata.append("p");
          row.text(`${key}: ${value}`);
          console.log(result);
        })
      });
  }
  
 // initialize the data
function init(){
      d3.json("./data/samples.json").then(function(data){
      var selector = d3.select("#selDataset");
      var sampleNames = data.names;
      sampleNames.forEach((sample)=>{
        selector.append("option").text(sample).property("value", sample);
      })
      DemoPanel(sampleNames[0])
      visualizations(sampleNames[0])
    });
}
  
init();
      
  // Function for new Subject
  d3.selectAll("#selDataset").on("change", NewSubject);
  function NewSubject() {
  
    //dropdown menu
    var dropdownMenu = d3.select("#selDataset");
    var dataset = dropdownMenu.property("value");
  
    DemoPanel(dataset)
    visualizations(dataset)
  };
   