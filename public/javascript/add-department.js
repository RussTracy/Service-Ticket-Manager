(function () {
    'use strict';
    window.addEventListener('load', function () {
        // Fetch all the forms we want to apply custom Bootstrap validation styles to
        var forms = document.getElementsByClassName('needs-validation');
        // Loop over them and prevent submission
        var validation = Array.prototype.filter.call(forms, function (form) {
            form.addEventListener('submit', function (event) {
                if (form.checkValidity() === false) {
                    event.preventDefault();
                    event.stopPropagation();
                }
                form.classList.add('was-validated');

            }, false);
        });
    }, false);
})();

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