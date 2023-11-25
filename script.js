const form = document.getElementById("form");
const recordsContainer = document.getElementById("records-container");
const createButton = document.querySelector("#form button");

let formState = "CREATE";  // tis has 2 values create and update

let empId = 1000;
const employeesList = [];


const onSubmitForm = (event) =>  {
    event.preventDefault();
    const employee = {
        employeeId: ++empId,
        name: event.target.name.value,
        salary: event.target.salary.value,
        role: event.target.role.value,
        team: event.target.team.value,
        companyName: event.target.companyName.value
    }
    if(formState==="CREATE"){
        addNewEmployeeRecord(employee);
    }
     else if(formState==="UPDATE"){
        // update the employee corresponding record
        formState="CREATE"
        createButton.innerText="Create Employee";
     }

    // when we feel the from..next time form need to reset
    form.reset();
}

function deleteRecord(event){

    if(formState==="UPDATE"){
        alert("please update the record before delete anything");
        return;
    }
    // delete button refernce
    const deleteButton = event.target;

    const record = deleteButton.parentNode.parentNode;
    record.remove(); // remove tr element from the dom tree

    const currentEmployeeId = parseInt(editButton.getAttribute("data-empid"));

    for (let i = 0; i < employeesList.length; i++) {
        // "1001" === 1001
        if (currentEmployeeId === employeesList[i].employeeId) {
            fillFormWithData(employeesList[i]);
            break;
        }
    }
}

function fillFormWithData(employee){

    // employeeId: ++empId,
    // name: event.target.name.value,
    // salary: event.target.salary.value,
    // role: event.target.role.value,
    // team: event.target.team.value,
    // companyName: event.target.companyName.value

    for(let key in employee){
        if(key !=="employeeId"){
        form[key].value = employee[key];
        }
    }

    createButton.innerText="Update Employee";
    formState = "UPDATE";

}

function editRecord(event){
    const editButton = event.target;
    const currentEmployeeId = parseInt(editButton.getAttribute("data-empid"));
    for( let i=0;i<employeesList.length;i++)
    {
        if(currentEmployeeId === employeesList[i].employeeId){
            fillFormWithData(employeesList[i])
            break;
        }
    }
}

function addNewEmployeeRecord(employee){
    // takes employee object as input
    // adds that object asa a record inside the table
    // creat table row and append inside recordscontainer
     const record = document.createElement("tr");
     for(let key in employee){
        const cell = document.createElement("td");
        cell.innerText = employee[key];
        record.appendChild(cell);
     }
     
     const optionsCell = document.createElement("td");

      const editIcon = document.createElement("span");
      editIcon.className = "material-icons";
      editIcon.innerText = "edit";
      editIcon.setAttribute("data-empId", employee.employeeId);
      editIcon.addEventListener("click", editRecord);

      const deleteIcon = document.createElement("span");
      deleteIcon.className = "material-icons";
      deleteIcon.innerText = "delete";
      deleteIcon.setAttribute("data-empId", employee.employeeId);
      deleteIcon.addEventListener("click", deleteRecord);

      optionsCell.append(editIcon,deleteIcon);
      record.appendChild(optionsCell);

     recordsContainer.appendChild(record);
     employeesList.push(employee);
}


form.addEventListener("submit" , onSubmitForm);