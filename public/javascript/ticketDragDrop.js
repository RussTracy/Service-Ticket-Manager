function allowDrop(ev) {
  ev.preventDefault();
}

function drag(ev) {
  ev.dataTransfer.setData("text", ev.target.id);
}

async function drop(ev) {
  ev.preventDefault();
  let dataID = ev.dataTransfer.getData("text");
  ev.currentTarget.appendChild(document.getElementById(dataID));

  const status_id = ev.currentTarget.id

  // console.log(data);

  const response = await fetch(`/api/tickets/${dataID}`, {
    method: 'PUT',
    body: JSON.stringify({
      status_id
    }),
    headers: {
      'Content-Type': 'application/json'
    }
  });

  if (response.ok) {
    document.location.replace('/dashboard');
  } else {
    alert(response.statusText);
  }

}