const studentName = document.getElementById("name");
const email = document.getElementById("email");
const phone = document.getElementById("phone");
const courseName = document.getElementById("courseName");

const deposit = document.getElementById("deposit");
const total = document.getElementById("total-cost");
const remaining = document.getElementById("remaining");

const statuss = document.getElementById("status");

const submit = document.getElementById("submit");

const search = document.getElementById("search");
const searchBtn = document.getElementById("search-btn");


let mode = "create";
let updateElement ;



//get remaining 
function getRemaining(){
    if(total.value !== '' || deposit.value !== ''){
        let result = +total.value - +deposit.value ; 
        remaining.value = result ;
    }else{
        remaining.value = '' ;
    }
}



//Add New data

let dataSudent;

//when reload main page 
if (localStorage.students &&localStorage.students.trim() !== "" ){
    dataSudent = JSON.parse(localStorage.students)
}else{
    dataSudent = [];
}



submit.addEventListener("click" , ()=>{
    if (!studentName.value || !email.value || !courseName.value) {
    alert("Please fill all required fields");
    return;}

    let newStudent = {
        name: studentName.value ,
        email: email.value ,
        phone: phone.value ,
        courseName: courseName.value ,
        deposit: deposit.value ,
        total: total.value ,
        remaining: remaining.value ,
        status: statuss.value
    }
    if(mode === "create"){
        //add new student information to array
        dataSudent.push(newStudent);
    }else{
        dataSudent[updateElement] = newStudent;
        mode = "create"
        submit.innerHTML = 'Add'
    }
    

    //Save to local storage
    localStorage.setItem("students" , JSON.stringify(dataSudent));

    //to clear any data when clcik on add button
    clearData();

    //show the data on the table after click add
    showData();

});


//Clear inputs after add new data

function clearData(){
    studentName.value = '';
    email.value = '';
    phone.value = '';
    courseName.value = '';
    deposit.value = '';
    total.value = '';
    remaining.value = '';
    statuss.value = '';
}

//show data in the table
function showData(){
    let table = ''
    for(let i = 0 ; i < dataSudent.length ; i++){
        table += `
            <tr>
                <td>${i+1}</td>
                <td>${dataSudent[i].name}</td>
                <td>${dataSudent[i].email}</td>
                <td>${dataSudent[i].phone}</td>
                <td>${dataSudent[i].courseName}</td>
                <td>${dataSudent[i].deposit}</td>
                <td>${dataSudent[i].total}</td>
                <td>${dataSudent[i].remaining}</td>
                <td>${dataSudent[i].status}</td>
                <td><button onclick="updateData(${i})" id="update">update</button></td>
                <td><button onclick="deleteData(${i})" id="delete">delete</button></td>
            </tr>
        `
    }

    document.getElementById('tbody').innerHTML = table ;

    let deleteAll = document.getElementById("delete-all")
    if(dataSudent.length > 0){
        deleteAll.innerHTML = `
        <button onclick='deleteAllData()'>Delete All</button>
        `
    }else{
        deleteAll.innerHTML = ''
    }
};

function deleteAllData(){
    dataSudent=[];
    localStorage.removeItem("students");
    showData();
}

//show data when reload or open the page
showData();

//delete
function deleteData(i){
    dataSudent.splice(i , 1);
    //to delete data from localstorage
    localStorage.students = JSON.stringify(dataSudent);
    //to show data after delete
    showData();
}

//update
function updateData(i){
    studentName.value = dataSudent[i].name;
    email.value = dataSudent[i].email;
    phone.value = dataSudent[i].phone;
    courseName.value = dataSudent[i].courseName;
    deposit.value = dataSudent[i].deposit;
    total.value = dataSudent[i].total;
    remaining.value =dataSudent[i].remaining;
    statuss.value = dataSudent[i].status;

    submit.innerHTML = "Update";
    mode = "update";
    updateElement = i ;


}


//search
searchBtn.addEventListener("click", ()=>{
    let searchName = search.value.toLowerCase();
    let table = ''

    for(let i = 0 ; i < dataSudent.length ; i++){
        if(dataSudent[i].name.toLowerCase().includes(searchName)){
            table += 
            `
            <tr>
                <td>${i+1}</td>
                <td>${dataSudent[i].name}</td>
                <td>${dataSudent[i].email}</td>
                <td>${dataSudent[i].phone}</td>
                <td>${dataSudent[i].courseName}</td>
                <td>${dataSudent[i].deposit}</td>
                <td>${dataSudent[i].total}</td>
                <td>${dataSudent[i].remaining}</td>
                <td>${dataSudent[i].status}</td>
                <td><button onclick="updateData(${i})" id="update">update</button></td>
                <td><button onclick="deleteData(${i})" id="delete">delete</button></td>
            </tr>
            
            `
        };
    };
    document.getElementById('tbody').innerHTML = table;

});


