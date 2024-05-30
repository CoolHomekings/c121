Webcam.set({
    width: 350,
    height: 300,
    image_format: 'png',
    png_quality: 90
});

camera = document.getElementById("camera");
Webcam.attach('#camera')

function take_snapshot() {
    Webcam.snap(function (data_uri) {
        document.getElementById("result").innerHTML = '<img id="captured_image" src="' + data_uri + '"/>';
    })
}

console.log('ml5version: ', ml5.version)

classifier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/s2pvvwcjn/model.json', modelLoaded)

function modelLoaded() {
    console.log("modelLoaded")
}

function speak() {
    var synth = window.speechSynthesis;
    speak_data_1 = "First prediction is " + prediction_1;
    speak_data_2 = "Second prediction is " + prediction_2;
    var utterThis = new SpeechSynthesisUtterance(speak_data_1 + speak_data_2);
    synth.speak(utterThis);
}

function check()
{
    img=document.getElementById("captured_image")
    classifier.classify(img,gotResult)
}

function gotResult(error,results)
{
    if(error) 
        {
            console.log(error)
        }
        else
        {
            console.log(results);
            document.getElementById("result_emotion_name").innerHTML= results[0].label
            document.getElementById("result_emotion_name2").innerHTML= results[1].label
            prediction_1=results[0].label
            prediction_2=results[1].label
            speak()
            if(prediction_1=="Happy")
                {
                    document.getElementById("update_emoji").innerHTML="&#128522"
                }
            if(prediction_1=="Angry")
                {
                    document.getElementById("update_emoji").innerHTML="&#128548"
                }
            if(prediction_1=="Sad womp womp")
                {
                    document.getElementById("update_emoji").innerHTML="&#128532"
                }    
            if(prediction_2=="Happy")
                {
                    document.getElementById("update_emoji2").innerHTML="&#128522"
                }
            if(prediction_2=="Angry")
                {
                    document.getElementById("update_emoji2").innerHTML="&#128548"
                }
            if(prediction_2=="Sad womp womp")
                {
                    document.getElementById("update_emoji2").innerHTML="&#128532"
                }        
        }
}