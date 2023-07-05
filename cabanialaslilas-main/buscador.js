let buscador = document.getElementById('buscador');
buscador.addEventListener('keyup', e=>{
    if(buscador.matches('#buscador')){
        document.querySelectorAll('.fila').forEach(registro =>{
            registro.textContent.toLocaleLowerCase().includes(buscador.value)
            ? registro.classList.remove('filtro')
            : registro.classList.add('filtro');
        })
    }
});