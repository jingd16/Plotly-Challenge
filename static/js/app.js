//Use the D3 library to read in samples.json
d3.json("samples.json").then((importedData) => {
    var data = importedData[0];
   //console.log(data);

    //Take out sample as an array
    var samples = data.samples;
    //console.log(samples);

    //Take out sample_value as an array
    sampleValues = samples.map(object => object.sample_values);
    
    //Slice data to top 10 only
    sampleValues = sampleValues.map(object => object.slice(0,10));
    
    var otuIDs = data.samples.map(object => object.otu_ids.slice(0,10));

   
    var strOtuIDs=[]
    for (i=0; i<10; i++) {
        strOtuIDs.push(String(otuIDs[i]));
    };

   var IDs=strOtuIDs[0].split(",")
   console.log(IDs);

   for (i=0; i<10; i++) {
       IDs[i] = `OTU ${IDs[i]}`;
   };

    var otuLabels = data.samples.map(object => object.otu_labels.slice(0,10));
    //console.log(strOtuIDs);
    //console.log(otuLabels[0]);
    //console.log(sampleValues[0]);
    
    var trace1 = {
        x: sampleValues[0],
        y: IDs,
        type: "bar",
        orientation: 'h'
    };

    var data=[trace1];

    var layout = {
            title: "Bar Chart"
    };

    Plotly.newPlot("bar", data, layout);

});