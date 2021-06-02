var updateBtns = document.getElementsByClassName('update-cart')

for (i=0; i < updateBtns.length; i++){
    updateBtns[i].addEventListener('click', function(){
        var dishId = this.dataset.product
        var action = this.dataset.action
        console.log('dishId: ', dishId, 'Action: ', action)

        console.log('USER:', user)
        if (user == 'AnonymousUser'){
            console.log('User is not authenticated')
        }else{
            updateUserOrder(dishId, action)
        }
    })
}


function updateUserOrder(dishId, action){
    console.log('User is authenticated, sending data...')
    var url ='/update_item/'
    fetch(url, {
        method: 'POST',
        headers:{
            'Content-Type':'application/json',
            'X-CSRFToken': csrftoken,
        },
        body:JSON.stringify({'dishId': dishId, 'action': action})

    })
    .then((response) =>{
        return response.json();
    })
    .then((data) => {
        console.log('Data: ', data)
        location.reload()
    });
}