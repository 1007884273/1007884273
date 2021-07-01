const cotizarSeguro = ()=>{
    let marca = document.querySelector("#marca").value;
    let year = document.querySelector("#year").value;
    let basico = document.querySelector("#basico");
    let completo = document.querySelector("#completo");
     
    let divResumen=document.querySelector("#resumen");
    let divResultado=document.querySelector("#resultado");
    divResultado.style.display="none";
    let plan="";
    
    if(basico.checked){
        plan="basico";
        
    }else if ( completo.checked){
        plan="completo";
    }

   

    if(marca===""){
        mostrarError("#msj-error-cotizador","Por favor seleccione la marca");
        return;
    }else if(year===""){
        mostrarError("#msj-error-cotizador","Por favor seleccione el año");
        return;
    }else if(plan===""){
        mostrarError("#msj-error-cotizador","Por favor seleccione el tipo de plan");
        return;
    }

    let cotizacion={marca,year,plan}

    document.querySelector("#msj").style.display="none";
    
    divResumen.style.backgroundColor="fff";
    divResumen.style.display="block";

    divResumen.innerHTML=`<div style='text-align:center'><img src="cargando.gif" width=300 height=200></div>`;
    
    setTimeout(()=>{
        divResumen.style.backgroundColor="#00838F";
        divResumen.innerHTML=`<h2>Resumen de la cotizacion</h2>
        <ul>
            <li>Marca:    ${mayuscula(marca)}</li>
            <li>Plan :    ${mayuscula(plan)}</li>
            <li>Año del auto:    ${year}</li>
        </ul>`;
        let cotizacionFinal=cotizar(cotizacion);
        divResultado.style.display="block";
        divResultado.className="divResumen";
       divResultado.innerHTML=`<p clas="textoCotizacion">$ ${cotizacionFinal}</p>`;

 


    },2000);

    //modelo para la cotizacion
    
}

const cotizar=(cotizacion)=>{
    const {marca,year,plan}=cotizacion;

    let resultado=2000;

    const diferenciaYear=diferencia(year);
    resultado-=((diferenciaYear*3)*resultado )/100;
    
    resultado=calcularMarca(marca)*resultado;
   
    const incrementoPlan=obtenerPlan(plan)
    resultado=parseFloat(incrementoPlan*resultado).toFixed(2);
   
    return resultado;
  
}
const obtenerPlan=plan=>{
    return(plan=='basico')?1.20:1.50 ;

}

//calcular marca
const calcularMarca=marca=>{
    let incremento;

    switch(marca){
        case'europeo':incremento=1.30;break;
        case'americano':incremento=1.15;break;
        case'asiatico':incremento=1.05;break;     
    }
    return incremento;

}

//funcion para la diferencia del año con el año actual
const diferencia=(year)=>{
    return new Date().getFullYear()-year;
}

//funcionp para que la primera letra sea mayuscula
const mayuscula=(palabra)=>{
    return palabra.charAt(0).toUpperCase()+palabra.slice(1);
    
}


//funcion pra retornar el error cuando no elijan todos los campos
const mostrarError =(elemento,mensaje)=>{
    divError=document.querySelector(elemento);
    divError.innerHTML=`<p class="alert alert-danger error">${mensaje}</p>`;
    setTimeout(()=>{divError.innerHTML=``;},3000);
}