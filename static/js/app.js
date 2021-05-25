var metaSelection = d3.select("#sample-metadata")

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

//define all variable outside function, so they are global and can be used with different function.
var sampleValues=[];
var sampleValuesAll=[];
var otuIDs = [];
var otuLabels = [];
var sampleID=[];
var otuIDsAll=[];
var otuLabelsAll=[];

var metaAge=[];
var metaBbtype=[];
var metaEthnicity=[];
var metaGender=[];
var metaLocation=[];
var metaWfreq=[];
function getData() {
    d3.json("samples.json").then((importedData) => {
        var data = importedData[0];
        console.log(data);

        var samples = data.samples;

        //get all the data required from sample
        sampleValuesAll = samples.map(object => object.sample_values);
        sampleValues = sampleValuesAll.map(object => object.slice(0,10));
        otuIDs = data.samples.map(object => object.otu_ids.slice(0,10));
        otuIDsAll = data.samples.map(object => object.otu_ids);
        otuLabels = data.samples.map(object => object.otu_labels.slice(0,10));

        sampleID = data.names;

        //get all the data required from metaData
        metaAge = data.metadata.map(object => object.age);
        metaBbtype = data.metadata.map(object => object.bbtype);
        metaEthnicity = data.metadata.map(object => object.ethnicity);
        metaGender = data.metadata.map(object => object.gender);
        metaLocation = data.metadata.map(object => object.location)
        metaWfreq = data.metadata.map(object => object.wfreq);

        buildPlot(otuIDs, sampleValues, otuLabels, 0);
        
    })    
};

//STEP 3: build plot
function buildPlot(otuIDs, 
                    sampleValues, 
                    otuLabels, 
                    sampleIndex) {
    
    //Convert ID to strings, in order to plot yaxis
    var strOtuIDs=[]
    for (i=0; i<153; i++) {
        strOtuIDs.push(String(otuIDs[i]));
    };

    //Create create yaxis names
    var IDs=strOtuIDs[sampleIndex].split(",")
    var bubbleID=[]
    for (i=0; i<IDs.length; i++) {
    bubbleID.push(IDs[i]);
    IDs[i] = `OTU${IDs[i]}`;
    };
    
    // ====== Plot Bar Chart =======
    var trace1 = {
        x: sampleValues[sampleIndex],
        y: IDs,
        type: "bar",
        text: otuLabels[sampleIndex],
        orientation: 'h'
    };

    var data=[trace1];

    var layout = {
            title: "Top 10 OTUs",
            height: 600,
            width: 600
    };

    Plotly.newPlot("bar", data, layout);

    //====== Plot bubble chart, display all samples======
    var trace2 = {
        x: otuIDsAll[sampleIndex],
        y: sampleValuesAll[sampleIndex],
        mode: 'markers',
        text: otuLabels[sampleIndex],
        marker: {
          color: otuIDsAll[sampleIndex],
          opacity: [1, 0.8, 0.6, 0.4],
          size: sampleValuesAll[sampleIndex]
        }
      };
      
      var data2 = [trace2];
      
      var layout2 = {
        title: 'All OTUs',
        showlegend: false,
        height: 600,
        width: 1200
      };
      
      Plotly.newPlot('bubble', data2, layout2);

    //=====Create MetaData list
    metaSelection.append("ul")
    metaSelection.append("li").text(`age: ${metaAge[sampleIndex]}`);
    metaSelection.append("li").text(`bbtype: ${metaBbtype[sampleIndex]}`);
    metaSelection.append("li").text(`ethnicity: ${metaEthnicity[sampleIndex]}`);
    metaSelection.append("li").text(`gender: ${metaGender[sampleIndex]}`);
    metaSelection.append("li").text(`location: ${metaLocation[sampleIndex]}`);
    metaSelection.append("li").text(`wfreq: ${metaWfreq[sampleIndex]}`);  

};

buildOptions();

function optionChanged(chosen) {
    console.log(chosen);
        
        //Find matching value choosen, return index number for ploting.
        for (var i=0; i<otuIDs.length; i++) {
            if (parseInt(chosen) === parseInt(sampleID[i]) ) {
                var IndexOption = i;
            }
        };
    
    buildPlot(otuIDs, sampleValues, otuLabels, IndexOption);
}
