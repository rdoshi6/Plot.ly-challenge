// Function created with the D3 library to read in samples.json
function buildMetaData(sample){

    d3.json("./data/samples.json").then(function(data){
    
      // Use d3 to select the panel with id of `#sample-metadata` and default first id
          var sample_metadata = d3.select("#sample-metadata");
          var metadata = data.metadata;
          var result = metadata.filter(sampleobj => sampleobj.id==sample)[0]
      
      // clearong any existing metadata
          sample_metadata.text("");
          
      // Use `Object.entries` to add each key and value pair to the panel
          Object.entries(result).forEach(([key, value]) => {
    
            var row = sample_metadata.append("p");
            row.text(`${key}: ${value}`);
            console.log(result);
          })
        });
    }

    // Define the function to build the charts
function buildCharts(sample) {
  
    // Fetch the sample data for the plots
    d3.json("./data/samples.json").then(function(data){
      var samples = data.samples;
      var result = samples.filter(sampleobj => sampleobj.id==sample)[0]
  
    // Build the BAR plot
      var barValue = result.sample_values.slice(0,10).reverse();
      var otu_ids_bar = result.otu_ids.slice(0,10).map((item => "OTU " + item)).reverse(); 
      var otu_labels_bar = result.otu_labels.slice(0,10).reverse();
  
   // create trace variable for the plot
   var trace_bar = {
     x: barValue,
     y: otu_ids_bar,
     text: otu_labels_bar,
     type: 'bar',
     orientation: "h",
   };
  
      // Create data variable and display
      var data_bar = [trace_bar];
      var layout_bar = {
      margin: {
          l: 100,
        },
      };  
  
      Plotly.newPlot("bar", data_bar, layout_bar)
    
      // Build the BUBBLE plot
        var xValues = result.otu_ids;
        var yValues = result.sample_values;
        var mSize = result.sample_values;
        var mClrs = result.otu_ids;
        var tValues = result.otu_values;
        
        var trace_bubble = {
          x: xValues,
          y: yValues,
          text: tValues,
          mode: 'markers',
          marker: {
            size: mSize,
            color: mClrs
          }
        };
    
        var data = [trace_bubble];
        var layout = {
          xaxis: {title: "OTU ID"}
        };
    
        Plotly.newPlot('bubble', data, layout)
  
    });
  }
  
 // Define the function to initialize the data
function init(){
      d3.json("./data/samples.json").then(function(data){
      var selector = d3.select("#selDataset");
      var sampleNames = data.names;
      sampleNames.forEach((sample)=>{
        selector.append("option").text(sample).property("value", sample);
      })
      buildMetaData(sampleNames[0])
      buildCharts(sampleNames[0])
    });
}
  
init();
      
  // Define the function when a new ID is se
  d3.selectAll("#selDataset").on("change", updatePlotly);
  function updatePlotly() {
  
    // Use D3 to select the dropdown menu
    var dropdownMenu = d3.select("#selDataset");
  
    // Assign the value of the dropdown menu option to a variable
    var dataset = dropdownMenu.property("value");
  
    buildMetaData(dataset)
    buildCharts(dataset)
  };
   