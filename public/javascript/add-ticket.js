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

async function newTicketHandler(event) {
    event.preventDefault();

    const title = document.querySelector('input[id="create-ticket-title"]').value;
    const description = document.querySelector('textarea[id="create-ticket-description"]').value;
    const department_id = document.querySelector('select[id="create-ticket-department"]').value;
    const priority_id = document.querySelector('select[id="create-ticket-priority"]').value;
    const status_id = 1;
    const email_id = document.getElementById("create-user-email").value;

    console.log(email_id)

    const response = await fetch(`/api/tickets`, {
        method: 'POST',
        body: JSON.stringify({
            title,
            description,
            department_id,
            status_id,
            priority_id,
            email_id
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    });

    if (response.ok) {
        document.location.replace('/dashboard');
    }
    else {
        return false;
    }
}


document.querySelector('#create-ticket-form').addEventListener('submit', newTicketHandler);