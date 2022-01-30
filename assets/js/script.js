// use moment.js to creat the current time
var currentDate=new Date();
$("#currentDay").text(moment().format('MMMM Do YYYY, h:mm:ss a'));

startHour=4;
endHour=10;

// add time slot row
var creatTimeRow=function(timepoint){
    timeEl=$("<li>")
        .addClass("hour row justify-content-around")
        .attr("id",i)
        // console.log(i);

    timeBlockEl=$("<p>")
        .addClass("time-block col-4 col-md-2")
        .text(moment.utc(i*3600*1000).format('HH:mm'));
    spanEl=$("<span>")
        .addClass("past description col-8 col-md-9")
        .attr("id","task-description");
    saveBtnEl=$("<button>")
        .addClass("saveBtn col-12 col-md-1")
        .text("Save");

    timeEl.append(timeBlockEl,spanEl,saveBtnEl);
    $(".timetable").append(timeEl);
}

//Storage the data
function dataStorage(contentID,taskContent){
    localStorage.setItem(contentID,JSON.stringify(taskContent))
}

//Load the data
function dataLoading(){
    for (var i=startHour;i<endHour;i++){
        
        var id="#"+i;
        // console.log(id)

        var taskContent=JSON.parse(localStorage.getItem(i));
        console.log(taskContent)

        var passage=$(id).children("task-description").class();
        console.log(passage)
        
        // console.log(passage)
        // passage.text(taskContent);
        // console.log(passage.text(taskContent))
    }    
}

// dataLoading();

for(var i=startHour;i<endHour;i++){
    creatTimeRow(i)    
}

$(".row").on("click","span",function(){
    taskText=$(this).text().trim()

    taskTextInput=$("<textarea>")
        .addClass("past description col-8 col-md-9")
        .attr("id","task-description")
        .val(taskText);

    $(this).replaceWith(taskTextInput);
})

$(".row").on("blur","textarea",function(){
    taskText=$(this).parent().children("#task-description").val().trim();
    console.log(taskText)

    taskTextSpan=$("<span>")
        .addClass("past description col-8 col-md-9")
        .attr("id","task-description")
        .val(taskText);
    
    //$(this).parent().children("#task-description").replaceWith(taskTextSpan);
})

$(".row").on("click","button",function(){
    var contentID=$(this).parent().attr("id");
    // console.log(contentID);
    var taskContent=$(this).siblings("#task-description").val().trim();
    // console.log(taskContent);

    dataStorage(contentID,taskContent);
})