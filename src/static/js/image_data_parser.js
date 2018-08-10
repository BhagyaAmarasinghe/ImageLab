

var alteredData = { faces : [ {landmark : {}}]};
var actualData;


function fetch(){

	var formData = new FormData();

   	if(!images[imgName]){
		images[imgName] = {
			boxes : {}
		};
	}else if(!images[imgName].boxes){
		images[imgName].boxes = {}
	}
	
   	var points = images[imgName].boxes[faceLable].points;
		if(!points){
			images[imgName].boxes[faceLable].points = {};
			points = images[imgName].boxes[faceLable].points;
		}
		var pointLabels = Object.keys(face.landmark);
		for(var point_i =0; point_i < pointLabels.length; point_i++){
			points [ pointLabels [point_i] ] = {
				x : face.landmark [ pointLabels [point_i] ].x - face.face_rectangle.left,
				y : face.landmark [ pointLabels [point_i] ].y - face.face_rectangle.top
			}
		}

	if($("#image_url").val() != ""){
		formData.append('image_url', $("#image_url").val());
	}else{
		for(var i in $('input[type=file]')[0].files){
			var file = $('input[type=file]')[0].files[i];
			if(file.name == $("#img").attr("label")){
				formData.append('image_file', file);
			}
		}
	}
}

function fppToImgLabObject(fppResponse){
	var imgName = $('#img').attr("label");

	formData.append('api_key', $("#api_key").val());
	formData.append('api_secret', $("#api_secret").val());
	formData.append('return_landmark', 1);
	formData.append('return_attributes', "gender,age,headpose");

	for(var face_i in fppResponse.faces){
		var face = fppResponse.faces[face_i];
		var faceLable = face_i+1;
		images[imgName].boxes[faceLable] = {};

		images[imgName].boxes[faceLable].left = face.face_rectangle.left;
		images[imgName].boxes[faceLable].top = face.face_rectangle.top;
		images[imgName].boxes[faceLable].width = face.face_rectangle.width;
		images[imgName].boxes[faceLable].height = face.face_rectangle.height;
		images[imgName].boxes[faceLable].attributes = face.attributes;


		$.ajax({
	    url: 'https://api-us.faceplusplus.com/facepp/v3/detect',
	    data: formData,
	    type: 'POST',
	    contentType: false,
	    processData: false,
	    success: function(data) {
            actualData = data;
			deleteAllLableBoxes();
			fppToImgLabObject(data);
			drawAllBoxData();
	    },
	    error: function(err) {
	    	$("#info").text("Error in connecting face++ API. Check console for more deetail");
	    	console.error("Error in connecting face++ API", err);
	    }
	});

	}
}
