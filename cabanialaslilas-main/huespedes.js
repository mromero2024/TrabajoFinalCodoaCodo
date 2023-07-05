const { createApp } = Vue

  createApp({
    data(){
        return{
            url:"http://127.0.0.1:5000/huespedes",
            huespedes:[],
            error:false,
            cargando:true
        }
    },
    //se llama despues de la instancia que haya
    //terminado de ´procesar todas las operaciones relacionadas con el estado
    created(){
        this.fetchData(this.url)
    },
    methods:{
        fetchData(url){
            //Aca se consume la api del backend
            fetch(url)
                .then(response => response.json())
                .then(data =>{
                    this.huespedes = data;
                    this.cargando = false
                })
                .catch(err =>{
                    console.error(err);
                    this.error=true
                })
        },
        eliminar(huesped){
            swal({
                title: "Esta seguro?",
                icon: "warning",
                buttons: true,
                dangerMode: true,
                className: "estilo_modal",
                
                })
              .then((willDelete) => {
                if (willDelete) {
                    const url = "http://localhost:5000/huespedes/" + huesped;
                    var options = {
                    method: 'DELETE',
                    className: "estilo_modal",
                    
                }
                fetch(url, options)
                    .then(res => res.text()) //o res.json()
                    .then(res => {       
                    location.reload();
                })
                    swal("El registro fue borrado", {
                    icon: "success",  
                    className: "estilo_modal"  
                  });
                } 
              });         
        }
    }
  }).mount("#app")

  