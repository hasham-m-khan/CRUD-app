const updateBtn = document.querySelector('#update-button')
const deleteBtn = document.querySelector('#delete-button')
const msgEl = document.querySelector('#message')
updateBtn.addEventListener('click', _ => {
  fetch('/quotes', {
    method: 'put',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      name: 'Darth Vader',
      quote: 'I find your lack of faith disturbing.'
    })
  })
  .then(res => {
    if (res.ok) return res.json()
  })
  .then(res => {
    console.log(res)
    window.location.reload(true)
  })
})

deleteBtn.addEventListener('click', _ => {
  fetch('/quotes', {
    method: 'delete',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      name: 'Darth Vader',
      quote: 'I find your lack of faith disturbing.'
    })
  })
  .then(res => {
    if (res.ok) return res.json()
  })
  .then(res => {
    if (res === 'No quote to delete') {
      msgEl.textContent = 'No Darth Vader quote to delete'
    } else {
      window.location.reload(true)
    }
  })
  .catch(err => console.log(err))
})
