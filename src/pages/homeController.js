export const getData = async () => {
    const res = await fetch('http://localhost:8080/');
    const data = await res.json()
    setFetchedData(data)
    console.log(data);
}

export const addNotes = async (noteTxt) => {
    await fetch('http://localhost:8080/', {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            "item": noteTxt
        })
    }).then((res) => {
        console.log("Added API Response...", res)
        alert('Added successfully!!!')
        getData();
        setNoteTxt('')
    }).catch((err) => { console.log(err) })
}

export const delNotes = async (id) => {
    await fetch('http://localhost:8080/delete', {
        method: 'DELETE',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            "delId": id
        })
    }).then((data) => {
        alert('deleted successfully!!!')
        console.log('Delete API Response...', data);
        getData();
    }).catch((err) => { alert(err) })
}

export const updateNote = async (id) => {
    const newData = prompt('please enter new value here');
    await fetch('http://localhost:8080/update', {
        method: 'PUT',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            "itemId": id,
            "newNote": newData,
        })
    }).then((data) => {
        alert('updated successfully!!!')
        console.log('Delete API Response...', data);
        getData();
    }).catch((err) => { alert(err) })
}