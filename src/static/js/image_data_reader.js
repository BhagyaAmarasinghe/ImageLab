function readPointsFile(input) {
    if (input.files && input.files[0]) {
        var pointFile = input.files[0];

        var reader = new FileReader();
        reader.onload = function (e) {
            /* if(pointFile.name.endsWith(".pts")){
                loadPts(e.target.result);
            }else */ if(pointFile.name.endsWith(".json")){
                loadJson(e.target.result);
            }else if(pointFile.name.endsWith(".fpp")){
                loadFpp(e.target.result);
            }else if(pointFile.name.endsWith(".xml")){
                loadXml(e.target.result);
            }else{
                console.log("Not supported");
            }
        };

        reader.readAsText(input.files[0]);
    }
    input.value = null;
}

function download(data, filename, type) {
    var blobData = new Blob([data], {type: type + ";charset=utf-8"})
    saveAs(blobData, filename);
}

function readImageFile(f){
    if(f.type.startsWith("image")){
        var reader = new FileReader();
        reader.onload = function (e) {
            var imgData = {
                name : f.name,
                data: e.target.result
            };
            imagesData[f.name] = imgData
            addToSlider(imgData);
        }
        reader.readAsDataURL(f);
    }
}