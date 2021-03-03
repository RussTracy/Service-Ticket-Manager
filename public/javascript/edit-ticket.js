async function editTicketHandler(event) {
    event.preventDefault();

    const title = document.querySelector('input[name="edit-ticket-title"]').value;
    const description = document.querySelector('textarea[name="edit-ticket-description"]').value;
    const department_id = document.querySelector('select[id="edit-ticket-department"]').value;
    const priority_id = document.querySelector('select[id="edit-ticket-priority"]').value;
    const status_id = document.querySelector('select[id="edit-ticket-status"]').value;
    const ticket_id = $('.editBtn').attr('id');

    const response = await fetch(`/api/tickets/${ticket_id}`, {
        method: 'PUT',
        body: JSON.stringify({
            title,
            description,
            department_id,
            priority_id,
            status_id
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    });

    if (response.ok) {
        document.location.replace('/dashboard');
    }
    else {
        alert(response.statusText);
    }
}

function resetTicketHandler() {
    $('#editTicketModal').modal('hide');
}

function editTicket(ev) {
    // Traverse up until root hit or DIV with ID found
    while (ev && (ev.tagName != "DIV" || !ev.id))
        ev = ev.parentNode;
        if (ev) // Check we found a DIV with an ID
    $('#editTicketModal').modal('show');
    fetch(`/api/tickets/${ev.id}`)
        .then(response => response.json())
        .then(data => {
            const title = document.querySelector('input[name="edit-ticket-title"]');
            title.value = data.title;
            const description = document.querySelector('textarea[name="edit-ticket-description"]');
            description.value = data.description;
            const department_id = document.querySelector('select[id="edit-ticket-department"]');
            department_id.value = data.department.id;
            const priority_id = document.querySelector('select[id="edit-ticket-priority"]');
            priority_id.value = data.priority.id;
            const status_id = document.querySelector('select[id="edit-ticket-status"]');
            status_id.value = data.status.id;
            $('.editBtn').attr('id', ev.id);
        })
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        });
}

document.querySelector('.edit-ticket-form').addEventListener('submit', editTicketHandler);
document.querySelector('.edit-ticket-form').addEventListener('reset', resetTicketHandler);