async function deleteFormHandler(event) {
    event.preventDefault();
    const id = this.getAttribute("data-department-id");

    const response = await fetch(`/api/departments/${id}`, {
        method: 'DELETE'
    });

    if (response.ok) {
        document.location.replace('/departments/');
    } else {
        alert(response.statusText);
    }
}

async function newDepartmentHandler(event) {
    event.preventDefault();

    const department_name = document.querySelector('input[id="create-department-name"]').value;

    const response = await fetch(`/api/departments`, {
        method: 'POST',
        body: JSON.stringify({
            department_name,
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    });

    if (response.ok) {
        document.location.replace('/departments');
    }
    else {
        return false;
    }
}

document.querySelector('#create-department-form').addEventListener('submit', newDepartmentHandler);

document.querySelectorAll(".delete-department").forEach(department =>
    department.addEventListener("click", deleteFormHandler)
)