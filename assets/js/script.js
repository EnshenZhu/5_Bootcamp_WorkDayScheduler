// use moment.js to creat the current time
var currentDate=new Date();
$("#currentDay").text(moment().format('MMMM Do YYYY, h:mm:ss a'));

startHour=4;
endHour=22;

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
        .addClass("present description col-8 col-md-9")
        .attr("id","task-description");
    saveBtnEl=$("<button>")
        .addClass("saveBtn col-12 col-md-1")
        .text("Save");

    timeEl.append(timeBlockEl,spanEl,saveBtnEl);
    $(".timetable").append(timeEl);
}

var realTimeColor=function(){
    var currentTime=moment().hour(); //check the current time with the moment.js
    // console.log(currentTime);

    $(".timetable").find(".time-block").each(function(){
        var listedTime=parseInt(this.textContent);
        // console.log(listedTime)

        if (currentTime > listedTime){
            $(this).siblings("#task-description").removeClass('present');
            $(this).siblings("#task-description").addClass('past');
        }
        
        else if(currentTime < listedTime) {
            $(this).siblings("#task-description").removeClass('present');
            $(this).siblings("#task-description").addClass('future');
        }
    })
}

for(var i=startHour;i<endHour;i++){
    creatTimeRow(i);
    realTimeColor();    
}

//Storage the data
function dataStorage(contentID,taskContent){
    localStorage.setItem(contentID,JSON.stringify(taskContent))
}

//Load the data
function dataLoading(){
    for (var i=startHour;i<endHour;i++){
        
        var id="#"+i;
        console.log(id)
        console.log(typeof(id))

        var taskContent=JSON.parse(localStorage.getItem(i));
        console.log(taskContent)

        // var passage=document.querySelector(".timetable").children[i-startHour].children[1]
        var passage=$(id).find("span")
        console.log(passage)
        
        passage.text(taskContent);
        // console.log(passage.text(taskContent))
    }    
}

dataLoading();

$(".row").on("click","span",function(){
    taskText=$(this).text().trim()

    taskTextInput=$("<textarea>")
        .addClass("present description col-8 col-md-9")
        .attr("id","task-description")
        .val(taskText);

    $(this).replaceWith(taskTextInput);

    // auto focus new element
    taskTextInput.trigger("focus");

    realTimeColor(); //reformat the color bar
})

$(".row").on("blur","textarea",function(){
    taskText=$(this).val()

    taskTextSpan=$("<span>")
        .addClass("present description col-8 col-md-9")
        .attr("id","task-description")
        .text(taskText);

    $(this).replaceWith(taskTextSpan)

    realTimeColor(); //reformat the color bar

})

$(".row").on("click","button",function(){
    var contentID=$(this).parent().attr("id");
    // console.log(contentID);
    var taskContent=$(this).siblings("#task-description")[0]
        .textContent;    

    dataStorage(contentID,taskContent);

    realTimeColor(); //reformat the color bar

})