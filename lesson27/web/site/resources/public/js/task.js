function registerDelete(tokenClient) {
    const button = document.querySelector("#b1")
    button.onclick = handleClick
    console.log('button:', button)

    async function handleClick() {
        alert('click')
        const taskId = window.location.pathname.split('/').pop()
        console.log(taskId)
        

        const uriDelete = `/api/tasks/${taskId}`
        const options = { 
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${tokenClient}`
            }
        }
        const rsp = await fetch(uriDelete,  options)
        if(rsp.ok) {
            alert(`Task with id ${taskId} deleted`)
            window.location = '/tasks'
        }
    }

}

