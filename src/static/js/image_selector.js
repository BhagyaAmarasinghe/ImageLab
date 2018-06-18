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
