function validate() {
    let name = document.forms['form']['name'];
    let telephone = document.forms['form']['telephone'];
    if (name.value == "" || telephone.value == "") {
        alert("Please fill all the fields");
        return false;
    }
}
let toUpdate;
let toDelete;
let update = document.querySelectorAll("[data-event='update']");
for (let el of update) {
    el.addEventListener('click', (e) => {
        toUpdate = e.target.parentElement.parentElement;
        let row = toUpdate.childNodes[0].parentElement.innerText.split(/\s+/);
        console.log(row);

        let name = document.getElementById('name-update');
        let telephone = document.getElementById('telephone-update');
        let radio = document.forms['updateForm'][row[3]];

        name.value = row[1];
        telephone.value = row[2];
    });
}

let updateBtn = document.getElementById('update-button');
updateBtn.addEventListener('click', () => {
    let nameVal = document.getElementById('name-update').value;
    let telephoneVal = document.getElementById('telephone-update').value;
    let radio = document.querySelector('#updateForm input[type="radio"]:checked').value;
    let idtoUpdate = toUpdate.getAttribute('data-id');
    console.log("clicked udpate");
    fetch('update', {
        method: 'put',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({'_id': idtoUpdate, 'name': nameVal, 'telephone': telephoneVal, 'gridRadios': radio})
    });
    location.reload(true);
});

let deleteElems = document.querySelectorAll("[data-event='delete']");
for (let del of deleteElems) {
    del.addEventListener("click", (e) => {
        let deletethi = e.target.parentElement.parentElement.getAttribute('data-id');
        console.log(deletethi);
        fetch('delete', {
          method:'delete',
          headers:{
            'Content-Type':'application/json'
          },
          body: JSON.stringify({'_id':deletethi})
        })
        location.reload(true);
    })

}
