function confirmar(){
    nom = document.getElementById('nombre').value
    cla = document.getElementById('clave').value
    ema = document.getElementById('email').value
    ed = parseInt(document.getElementById('edad').value)
    img = document.getElementById('imagen').value



    let huesped = {
        nombre : nom,
        clave : cla,
        email : ema,
        edad : ed,
        imagen : img
    }

    let url= "http://localhost:5000/huespedes" 
    
    var options = {
        body: JSON.stringify(huesped),
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
    }

    fetch(url, options)
    .then(function(){
        alert("REGISTRO GUARDADO")
        window.location.href = "./huespedes.html";  //con esto indicamos que luego del registro me lleve a la pagina don estan todos los productos   
    })
    .catch(err => {
        alert("HUBO UN ERROR")
        console.log(err);
    })
}