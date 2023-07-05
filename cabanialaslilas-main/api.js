let dataBank = document.querySelector("#dataBank")

fetch("https://www.dolarsi.com/api/api.php?type=valoresprincipales")
.then((response) => response.json())
.then((data)=>{
     console.log(data[0])
    data.forEach((info) => {
        let content = document.createElement("div")
         content.innerHTML = `
         <h4> La Cotizacion actual del: ${info.casa.nombre} es ${info.casa.venta}</h4> `
         dataBank.append(content)
    }) 
    
})