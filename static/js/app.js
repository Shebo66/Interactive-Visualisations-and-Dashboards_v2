d3.json('samples.json').then((data)=>{
    console.log(data)
data.names.forEach((id)=>{
var dropdown=d3.select('#selDataset')
dropdown.append('option').text(id).property('value',id)

})
displaycharts(data.names[0])
})

function displaycharts(id){
    console.log(id)
d3.json('samples.json').then((data)=>{
var filteredarray=data.samples.filter(obj=>obj.id==id)
console.log(filteredarray)

var bardata=[{
x: filteredarray[0].sample_values.slice(0,10).reverse(),
y: filteredarray[0].otu_ids.slice(0,10).map(o=>'OTU '+o).reverse(),
text: filteredarray[0].otu_labels.slice(0,10).reverse(),
type: 'bar', 
orientation: 'h'
}]
var barlayout={
title: 'Top Ten Bacteria Cultures'

}
Plotly.newPlot('bar', bardata, barlayout)

var bubbledata=[{
    x: filteredarray[0].otu_ids,
    y: filteredarray[0].sample_values,
    text: filteredarray[0].otu_labels,
    mode: 'markers', 
    marker: {size: filteredarray[0].sample_values, color: filteredarray[0].otu_ids}
    }]
    var bubblelayout={
    title: 'Bacteria Cultures per Sample'
    
    }
    Plotly.newPlot('bubble', bubbledata, bubblelayout)
var metadata=data.metadata.filter(obj=>obj.id==id)
var panel=d3.select('#sample-metadata')
panel.html('')
Object.entries(metadata[0]).forEach(([key,value])=>{
panel.append('h6').text(key+': '+value)

})
    })      

}
function optionChanged(id){
displaycharts(id)
}