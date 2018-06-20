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

var imgSelector = function(data){
    var obj = parser.parse(data,{
        ignoreAttributes : false,
        attributeNamePrefix : "",
    });

    var image = obj.dataset.images.image;

    if(!Array.isArray(image)){
        image = [image];
    }

    for(var index=0; index < image.length; index++){
        var pathArr = image[index].file.split(/\\|\//);
        var imgName = pathArr[ pathArr.length -1 ];
        var boxes = image[ index ].box;
        var boxObject = [];
        if(boxes){
            if(!Array.isArray(boxes)){
                boxes = [boxes];
            }
            for(var b_index =0; b_index < boxes.length; b_index++){
                var currentBox = boxes[ b_index ];

                boxObject .push({
                    id : "rect" + b_index,
                    label: currentBox.label,
                    type: "rect",
                    bbox : {
                        x: currentBox.left,
                        y: currentBox.top,
                        h: currentBox.height,
                        w: currentBox.width,
                    },
                    points : [
                        currentBox.left, 
                        currentBox.top, 
                        currentBox.width, 
                        currentBox.height
                    ],
                    attributes : [],
                    featurePoints: []
                })
                if(currentBox.part){
                    if(!Array.isArray(currentBox.part)){
                        currentBox.part = [currentBox.part];
                    }

                    for(var p_index=0; p_index< currentBox.part.length; p_index++){
                        var pointlabel = currentBox.part[p_index].name || p_index+1;

                        boxObject[b_index].featurePoints.push({
                            id: "point" + p_index,
                            x: currentBox.part[p_index].x,
                            y: currentBox.part[p_index].y,
                            label: pointlabel
                        })
                    }
                }
            }
        }

        if(labellingData[imgName]){
            labellingData[imgName].shapes =  boxObject;
        }
    }

}
