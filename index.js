import { leerInput,pausa,inquirerMenu, ListadoLugares } from "./helpers/inquirer.js";
import Busquedas from "./models/busquedas.js";
import 'dotenv/config.js';
import colors from 'colors';


const main = async() => {
    let opt = 1;
    const busquedas = new Busquedas();


    do{
        opt = await inquirerMenu();
        switch (opt) {
            case 1:
                //Mostrar mensaje
                const termino = await leerInput('Ciudad: ');             
                //Buscar los lugares
                const lugares =await busquedas.ciudad(termino);
                //Seleccionar el lugar
                const id = await ListadoLugares(lugares);
                if(id==='0') continue;

                const lugarSel = lugares.find(l => l.id === id);
                
                //Guardar en DB
                busquedas.agregarHistorial(lugarSel.nombre);    

                //Clima
                const clima = await busquedas.climaLugar(lugarSel.lat, lugarSel.lng);
                //Mostrar resultados
                console.clear();
                console.log('\nInformación de la ciudad\n'.green);
                console.log('Ciudad: '.green,lugarSel.nombre);
                console.log('Lat: '.green,lugarSel.lat);
                console.log('Lng: '.green,lugarSel.lng);
                console.log('Temperatura: '.green,clima.temp);
                console.log('Mínima: '.green,clima.min);
                console.log('Máxima: '.green,clima.max);
                console.log('Como está el clima: '.green,clima.desc);
            break;
            case 2:
                console.clear();
                console.log('\nHistorial\n'.green);
                busquedas.historialCapitalizado.forEach((lugar, i)=>{
                    const idx = `${i+1}.`.green;
                    console.log(`${idx} ${lugar}`);
                });
            break;
            case 0:
                console.log('Saliendo...');
            break;
            default:
                break;
        }
        if(opt!=0) await pausa();
    }while(opt!==0);

};

main();