x = 0
y = 0
apple = ""
draw_apple = ""
var SpeakData = ""
var number = 0
var SpeechRecognition = window.webkitSpeechRecognition
var recognition = new SpeechRecognition()
screenwidth = window.innerWidth
screenheight = window.innerHeight
function preload()
{
    apple = loadImage("image-removebg-preview.png")
}
function start()
{
    document.getElementById("status").innerHTML = "Voice recognizer is listening, try saying a shape"
    recognition.start()
}
recognition.onresult = function(event)
{
    console.log(event)
    var content = event.results[0][0].transcript
    document.getElementById("status").innerHTML = "The voice recognizer has detected the following word(s): " + content
    number = Number(content)
    if(Number.isInteger(number))
    {
        document.getElementById("status").innerHTML = "Started drawing "+number+" apple(s)..."
        draw_apple = "set"
    }
    else
    {
        document.getElementById("status").innerHTML = "Didn't recognize any number... Have you tried going under 1 million?"
    }
}
function setup()
{
    canvas = createCanvas(screenwidth, screenheight - 150)
}
function draw()
{
    if(draw_apple == "set")
    {
        for (let i = 0; i < number; i++)
        {
            x = Math.floor(Math.random() * screenwidth)
            y = Math.floor(Math.random() * screenheight)
            image(apple, x, y, 50, 50)
            document.getElementById("status").innerHTML = "Drew "+i+" apple(s)"
        }
        document.getElementById("status").innerHTML = "Successfully drew "+number+" apple(s)"
        SpeakData = number + " apples drawn."
        speak()
        draw_apple = ""
    }
}
function speak()
{
    var Syntensis = window.speechSynthesis
    var UtterThis = new SpeechSynthesisUtterance(SpeakData)
    Syntensis.speak(UtterThis)
    SpeakData = ""
}