console.log(location.search);
var args = location.search.substr(1).split('&');
console.log(args);

var parts = []
for(let i = 0; i <args.length; ++i){
    parts[i] = args[i].split('=');
}
console.log(parts)

document.getElementById('id').value = decodeURIComponent(parts[0][1])
document.getElementById('nombre').value = decodeURIComponent(parts[1][1])
document.getElementById('clave').value = decodeURIComponent(parts[2][1])
document.getElementById('email').value = decodeURIComponent(parts[3][1])
document.getElementById('edad').value = decodeURIComponent(parts[4][1])
document.getElementById('imagen').value = decodeURIComponent(parts[5][1])

function modificar(){
    let id = document.getElementById("id").value
    let n = document.getElementById("nombre").value
    let c = document.getElementById("clave").value
    let e = document.getElementById("email").value
    let ed = document.getElementById("edad").value
    let i = document.getElementById("imagen").value

    let huesped = {
        nombre: n,
        clave: c,
        email: e,
        edad: ed,
        imagen: i
    }
    let url = "http://localhost:5000/huespedes/"+id
    var options = {
        body: JSON.stringify(huesped),
        method: 'PUT',
        headers: {'Content-Type': 'application/json'},
        redirect: 'follow'
    }
    fetch(url, options)
        .then(function(){
            alert("Registro Modificado")
            window.location.href = "./huespedes.html";
        })
        .catch(err => {
            console.error(err);
            alert("Error al Modificar")
        })
}