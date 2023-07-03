let form = document.querySelector('#github-form')

form.addEventListener("submit", (e) => {
  e.preventDefault();
  
  let search = document.getElementById('search').value
  fetch(`https://api.github.com/search/users?q=${search}`).then((resp)=>{
    return resp.json()
  }).then((res) => {
      addInfo(res.items)
    });
});

function addInfo(data){

  data.forEach(x => {

    let elem = document.createElement('img')
    elem.src = x.avatar_url;
    

    let username = document.createElement('p')
    username.textContent = x.login;


    let grav = document.createElement('img')
    grav.src = x.gravatar_id

    let link = document.createElement('a')
    link.textContent = x.url

    link.addEventListener('click', y => {
    fetch(`https://api.github.com/users/${x.login}/repos`).then((resp)=>{
          return resp.json()
    }).then((res) => {
          res.forEach(a => {
            let linking = document.createElement('a')
            linking.textContent = a.html_url 
            linking.src = a.html_url

            document.querySelector('#repos-list').appendChild(document.createElement('br'))
            document.querySelector('#repos-list').appendChild(linking)
            document.querySelector('#repos-list').appendChild(document.createElement('br'))
          });
    });
});


    
    


    document.querySelector('#user-list').appendChild(link)
    document.querySelector('#user-list').appendChild(username);
    document.querySelector('#user-list').appendChild(elem);
    document.querySelector('#user-list').appendChild(document.createElement('br'));
    /*
    newDiv.appendChild(elem)
    document.body.appendChild(username)
    document.body.appendChild(grav)
    document.body.appendChild(link)
    */
  });
}

