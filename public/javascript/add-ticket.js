async function newTicketHandler(event) {
    event.preventDefault();

    const title = document.querySelector('input[name="ticket-title"]').value;
    const description = document.querySelector('textarea[name="ticket-description"]').value;
    const department_id = document.querySelector('select[id="ticket-department"]').value;
    const priority_id = document.querySelector('select[id="ticket-priority"]').value;
    const status_id = 1;

    const response = await fetch(`/api/tickets`, {
        method: 'POST',
        body: JSON.stringify({
            title,
            description,
            department_id,
            status_id,
            priority_id
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


function openTheForm() {
    document.getElementById("popupForm").style.display = "block";
}

function closeTheForm() {
    document.getElementById("popupForm").style.display = "none";
}

document.querySelector('.new-ticket-form').addEventListener('submit', newTicketHandler);