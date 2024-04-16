//유저가 값을 입력한다
//+버튼을 클릭하면 할일이 추가된다.
// 유저가 delete 버튼을 누르면 할일이 삭제
// check 버튼을 누르면 할일이 끝나면서 밑줄이 간다
/// 1 check 버튼을 클릭하는 순간 true, false
// 2 true면 끝난 걸로 간주하고 밑줄 보여주기
// 3 false 이면 안끝난 걸로 간주하고 그대로
// 진행중 끝남 탭을 누르면, 언더바 이동
// 끝남 탭은, 끝난 아이템만, 진행중 탭은 진행중이 아이템만 나오게
// 전체탭을 누르면 다시 전체 아이템으로 돌아옴


let taskInput = document.getElementById("task-input");
let addButton = document.getElementById("add-button");
let tabs = document.querySelectorAll(".task-tabs div");
let underLine = document.getElementById("under-line");
let taskList = [];
let mode = 'all';
let filterList = [];

addButton.addEventListener("click",addTask)
addButton.addEventListener("click",function(){
    taskInput.value=""
});

taskInput.addEventListener("keypress",function(event){
    if(event.key === "Enter"){
        event.preventDefault();
        document.getElementById("add-button").click();
    }
})

taskInput.addEventListener("keyup",function(event){
    if (taskInput.value !== ""){
        addButton.disabled = false;
    } else {
        addButton.disabled = true;
    }
})

addButton.disabled = true;

for(let i=1; i<tabs.length; i++){
    tabs[i].addEventListener("click",function(event){
        filter(event)
    });
    tabs[i].addEventListener("click",(event)=>
    lineIndicator(event));
}

function addTask() {
    let task = {
        id: randomIDGenerate(),
        taskContent: taskInput.value,
        isComplete: false
    }

 
    
    taskList.push(task); 
    console.log(taskList);
    render();
    addButton.disabled = true;
}

function render() {
    let list = [];
    if(mode === "all") {
        list = taskList;
    } else if(mode === "ongoing" || mode === "done") {
        list = filterList;
    }
    
    
    let resultHTML = '';
    for(let i = 0; i < list.length; i++) {
        if(list[i].isComplete == true) {
            resultHTML += `<div class="task">
            <div class="task-done">${list[i].taskContent}</div>
            <div>
                <button onclick = "toggleComplete('${list[i].id}')">CHECK</button>
                <button onclick = "deleteTask('${list[i].id}')">DELETE</button>
            </div>
        </div>`;
        } else {
            resultHTML += `<div class="task">
            <div>${list[i].taskContent}</div>
                <div>
                    <button onclick = "toggleComplete('${list[i].id}')">CHECK</button>
                    <button onclick = "deleteTask('${list[i].id}')">DELETE</button>
                </div>
            </div>`;
        }
    }
    document.getElementById("task-board").innerHTML = resultHTML;
}

function toggleComplete(id) {
    console.log("id:",id)
    for(let i=0;i<taskList.length;i++){
        if(taskList[i].id == id){
            taskList[i].isComplete = !taskList[i].isComplete; 
            break;
        }
    }
    render(); 
    console.log(taskList)
}

function deleteTask(id) {
    for(let i=0;i<taskList.length; i++){
        if(taskList[i].id == id){
            taskList.splice(i,1);
            break;
            
        }
    }
    for(let i=0;i<filterList.length; i++){
        if(filterList[i].id == id){
            filterList.splice(i,1);
            break;
        }
    }
    render();
    console.log(taskList);
}

function filter(event) {
    /*
    if (e) {
        mode = e.target.id;
        underLine.style.width = e.target.offsetWidth + "px";
        underLine.style.left = e.target.offsetLeft + "px";
        underLine.style.top =
          e.target.offsetTop + (e.target.offsetHeight - 4) + "px";
      }
      */
      filterList = [];
    mode = event.target.id;
    
    if(mode === "all") {
        //전체 리스트를 보여줌
        render();
    } else if(mode === "ongoing") {
        //진행 중인 아이템을 보여줌
        //task.isComplete = false
        for(let i = 0; i < taskList.length; i++) {
            if(taskList[i].isComplete === false) {
                filterList.push(taskList[i]);
            }
        }
        render();
        console.log("진행중",filterList);
    } else if(mode === "done") {
        //끝나는 케이스
        //task.isComplete = true
        for(let i = 0; i < taskList.length; i++) {
            if(taskList[i].isComplete === true) {
                filterList.push(taskList[i]);
            }
        }
        render();
    }
}

function randomIDGenerate() {
    return '_' + Math.random().toString(36).substring(2, 9);
}

function lineIndicator(e){
    underLine.style.left = e.currentTarget.offsetLeft + "px";
    underLine.style.width = e.currentTarget.offsetWidth + "px";
    underLine.style.top = e.currentTarget.offsetTop + e.currentTarget.offsetHeight -3+ "px";
}