function generateLabelSelectionBox(){
    var elementStr = "<select class='form-control'>"
    labels.forEach(function(label,index){
        if(alteredData.faces[0].landmark[label]){
            elementStr += "<option disabled value='"+label+"'>"+index + " " + label+"</option>"    
        }else{
            elementStr += "<option value='"+label+"'>"+index + " " + label+"</option>"
        }
    });

    elementStr += "</select>";

    return elementStr;

}


var loadProjectFile = function(data){
    labellingData = nimn.parse(nimnSchema, data);
}

function readDataFile(e){
    var input = e.srcElement;
    if (input.files && input.files[0]) {
        var dataFile = input.files[0];
        
        var reader = new FileReader();
        reader.onload = function (e) {
          if(dataFile.name.endsWith(".jpg")){
                loadProjectFile(e.target.result);
            }else if(dataFile.name.endsWith(".png")){
                loadFpp(e.target.result);
            }else if(dataFile.name.endsWith(".xml")){
                loadDlibXml(e.target.result);
            }else{
                console.log("Not supported");
            }
        };

        reader.readAsText(input.files[0]);
    }
    input.value = null;
}

