

//STEP 1: Building Options Dropdown Box
var selection = d3.select("#selDataset");
function buildOptions() {
    d3.json("samples.json").then((importedData) => {
    var data = importedData[0];
    // var sampleID = data.names;

    
    // var option = selection.select("option")
    // for (var i = 0; i < sampleID.length; i++) {
     
    //   selection.append("option").text(sampleID[i]);
    
    data.names.forEach((name) => {
        var appendOption = selection.append("option").text(name).attr('value',name);
    });
    
    getData();
  });
}

//STEP 2: Get data from Json file
var sampleValues=[];
var otuIDs = [];
var otuLabels = [];
var sampleID=[]
function getData() {
    d3.json("samples.json").then((importedData) => {
        var data = importedData[0];
        console.log(data);

        //Take out sample as an array
        var samples = data.samples;
        //console.log(samples.length)

        // //Take out sample_value as an array & slice to top 10
        // sampleValues = samples.map(object => object.sample_values);
        // sampleValues = sampleValues.map(object => object.slice(0,10));
        // otuIDs = data.samples.map(object => object.otu_ids.slice(0,10));
        // otuLabels = data.samples.map(object => object.otu_labels.slice(0,10));
        // sampleID = data.names;

        sampleValues = samples.map(object => object.sample_values);
        sampleValues = sampleValues.map(object => object.slice(0,10));
        //console.log(sampleValues);
        otuIDs = data.samples.map(object => object.otu_ids.slice(0,10));
        //console.log(otuIDs)
        otuLabels = data.samples.map(object => object.otu_labels.slice(0,10));
        //console.log(otuLabels)
        sampleID = data.names;

        buildPlot(otuIDs, sampleValues, otuLabels, 0);
        
    })    
};

//STEP 3: build plot
function buildPlot(otuIDs, sampleValues, otuLabels, sampleIndex) {
    
    //Convert ID to strings, in order to plot yaxis
    var strOtuIDs=[]
    for (i=0; i<153; i++) {
        strOtuIDs.push(String(otuIDs[i]));
    };

    //Create create yaxis names
    var IDs=strOtuIDs[sampleIndex].split(",")
    for (i=0; i<IDs.length; i++) {
    IDs[i] = `OTU${IDs[i]}`;
    };
    
    var trace1 = {
        x: sampleValues[sampleIndex],
        y: IDs,
        type: "bar",
        text: otuLabels[sampleIndex],
        orientation: 'h'
    };

    var data=[trace1];

    var layout = {
            title: "Bar Chart"
    };

    Plotly.newPlot("bar", data, layout);

};

buildOptions();

function optionChanged(chosen) {
 
    console.log(chosen);
    //console.log(sampleValues);

    // d3.json("samples.json").then((importedData) => {
    //     var data1 = importedData[0];
    //     console.log(data1);

        // //Take out sample as an array
        // var samples = data.samples;

    //     // //Take out sample_value as an array & slice to top 10
    //     var sampleValues = samples.map(object => object.sample_values);
    //     sampleValues = sampleValues.map(object => object.slice(0,10));
    //     var otuIDs = data.samples.map(object => object.otu_ids.slice(0,10));
    //     var otuLabels = data.samples.map(object => object.otu_labels.slice(0,10));
    //     var sampleID = data.names;
        
        
        for (var i=0; i<otuIDs.length; i++) {
            if (parseInt(chosen) === parseInt(sampleID[i]) ) {
                var IndexOption = i;
                //console.log(IndexOption, "found")
            }

        //console.log(IndexOption);
        };

    buildPlot(otuIDs, sampleValues, otuLabels, IndexOption);

    
}

//d3.select("#selDataset").on("change", handleChange);
