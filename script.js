var selectedRow = null;

//Show alerts
function showAlert(message, className){
    const div = document.createElement("div");
    div.className = `alert alert-${className}`;

    div.appendChild(document.createTextNode(message));
    const container = document.querySelector(".container");
    const main = document.querySelector(".main");
    container.insertBefore(div, main);

    setTimeout(() => document.querySelector(".alert").remove(), 3000)
}

// Clear All Fields

function clearFields(){
    document.querySelector("#firstName").value = "";
    document.querySelector("#lastName").value = "";
    document.querySelector("#phNum").value = "";
    document.querySelector("#email").value = "";

}

// Add data
document.querySelector("#student-form").addEventListener("submit", (e) =>{
    console.log("test");
    e.preventDefault();

    //Get form values
    const firstName = document.querySelector("#firstName").value;
    const lastName = document.querySelector("#lastName").value;
    const phNum = document.querySelector("#phNum").value;
    const email = document.querySelector("#email").value;

    // Validate
    if(firstName == " " || lastName == " " || phNum == " " || email == " "){
        showAlert("Please fill all the fields", "danger");
    }
    else
    if(selectedRow == null){
        const list = document.querySelector("#student-list");
        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${firstName}</td>
            <td>${lastName}</td>
            <td>${phNum}</td>
            <td>${email}</td>
            <td>
            <a href="#" class="btn btn-warning btn-sm edit">Edit</a>
            <a href="#" class="btn btn-danger btn-sm delete">Delete</a>
            </td>
        `;

        list.appendChild(row);
        selectedRow = null;
        showAlert("Data Added", "success");
    }
    else{
        selectedRow.children[0].textContent = firstName;
        selectedRow.children[1].textContent = lastName;
        selectedRow.children[2].textContent = phNum;
        selectedRow.children[3].textContent = email;
        selectedRow = null;
        showAlert("Info Edited", "info");
    }
    clearFields();

});

// Edit Data

document.querySelector("#student-list").addEventListener("click", (e) =>{

    target = e.target;
    if(target.classList.contains("edit")){
        selectedRow = target.parentElement.parentElement;
        document.querySelector("#firstName").value = selectedRow.children[0].textContent;
        document.querySelector("#lastName").value = selectedRow.children[1].textContent;
        document.querySelector("#phNum").value = selectedRow.children[2].textContent;
        document.querySelector("#email").value = selectedRow.children[3].textContent;
    }
});

// Delete Data

document.querySelector("#student-list").addEventListener("click", (e) =>
{
    target = e.target;
    if(target.classList.contains("delete")){
        target.parentElement.parentElement.remove();
        showAlert("Data Deleted", "danger");
    }
});