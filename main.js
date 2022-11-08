camera = document.getElementById("camera");
Webcam.set({
    width: 350,
    height: 300,
    image_format: 'png',
    png_quality: 90
});
Webcam.attach("#camera");


function take_snapshot()
{
    Webcam.snap(function(data_url){
        document.getElementById("result").innerHTML = '<img id = "captured_image" src ="'+data_url+'"/>';

    });
}
console.log("ml5 version", ml5.version);
classifier=ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/nWoV6oekN/model.json', modelLoaded);
function modelLoaded()
{
    console.log("model loaded");
}
function check()
{
    //comparess images and compares them and got result will compare the images
    img = document.getElementById("captured_image");
    classifier.classify(img, gotResult);
}
function gotResult(error, results)
{
    //throws error message in case of error
    if(error)
    {
        console.error(error)
    }
    //
    else
    {
        console.log(results);
        //sets "result_object_name" with result with most accuracy
        document.getElementById("result_object_name").innerHTML = results[0].label;
        //toFixed shows all the number of digits after the decimal and shows the percentage
        document.getElementById("result_object_accuracy").innerHTML = results[0].confidence.toFixed(3)*100 + "  %";
    }
}