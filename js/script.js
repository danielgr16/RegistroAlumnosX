            //create CSV file data in an array

            var matricula;
            var nombre;
            var apellido;
            var matriculaMasivoMoodle = [];
            var nombreMasivoMoodle = [];
            var apellidoMasivoMoodle = [];
            var csvFileDataMoodle = [];
            var csvFileDataOffice = [];
            var idFilaMoodle = 0;
            var numeroUsuario = [];
            document.getElementById("btndownload").disabled = true;

            var boolTemporal = 0;

            function switch_temp() {
                if (boolTemporal == 0) {
                    boolTemporal = 1;

                    document.getElementById("matriculatxtbx").style.display = "none";
                    document.getElementById("checkMoodle").style.display = "none";
                    document.getElementById("checkOffice").style.display = "none";
                } else {
                    boolTemporal = 0;

                    document.getElementById("matriculatxtbx").style.display = "block";
                    document.getElementById("checkMoodle").style.display = "block";
                    document.getElementById("checkOffice").style.display = "block";
                }
            }

            function mostrar_grados() {
                let div = document.getElementById("grado");
                div.innerHTML = "<div> moodle </div>";
            }
            function mostrar_seleccion_grado() {
                if (boolTemporal == 0) {
                    boolTemporal = 1;

                    document.getElementById("matriculatxtbx").style.display = "none";
                } else {
                    boolTemporal = 0;

                    document.getElementById("matriculatxtbx").style.display = "block";
                }
            }

            function addrow() {
                if (document.getElementById("user").value != "" && document.getElementById("first").value != "" && document.getElementById("last").value != ""){
                    if(document.getElementById("cbmoodle").checked == true || document.getElementById("cboffice").checked == true){
                        if(document.getElementById("cbmoodle").checked == true){
                            csvFileDataMoodle.push([
                                document.getElementById("user").value,
                                '123456',
                                document.getElementById("first").value,
                                document.getElementById("last").value,
                                document.getElementById("user").value+'@tij.xochicalco.edu.mx',
                                'Tijuana'
                            ]);

                            document.getElementById("gradoMoodle").classList.remove('d-none');
                            document.getElementById("gradoMoodle").classList.add('d-block');

                            agregarFilaMoodle();
                        }

                        if(document.getElementById("cboffice").checked == true){
                            csvFileDataOffice.push([
                                document.getElementById("user").value+'@tij.xochicalco.edu.mx',
                                document.getElementById("first").value,
                                document.getElementById("last").value,
                                document.getElementById("first").value+' '+document.getElementById("last").value,
                                'Alumno',
                                '',
                                '',
                                '',
                                '',
                                '',
                                '',
                                '',
                                '',
                                '',
                                '',
                                ''
                            ]);

                            agregarFilaOffice();
                        }

                        document.getElementById("usuarios").classList.remove('d-none');
                        document.getElementById("usuarios").classList.add('d-block');
  
                        document.getElementById("user").value = "";
                        document.getElementById("first").value = "";
                        document.getElementById("last").value = "";
                        document.getElementById("user").focus();
                        document.getElementById("btndownload").className += " btn-active";
                    }      
                    else{
                        alert("Seleccione al menos una opción para agregar alumnos");
                    }
                }
                else{
                    alert("Debe rellenar todos los campos");
                }
            }
                
            //create a user-defined function to download CSV file   
            function download_csv_file() {  
                //cbMoodle
                //cbOffice

                if(csvFileDataMoodle.length > 0){
                    //define the heading for each row of the data
                    var csv = 'username,password,firstname,lastname,email,city\n';  

                    //merge the data with CSV  
                    csvFileDataMoodle.forEach(function(row) {  
                        csv += row.join(',');  
                        csv += "\n";  
                    });
                    
                    var hiddenElement = document.createElement('a');  
                    hiddenElement.href = 'data:text/csv;charset=utf-8,' + encodeURI(csv);
                        
                    //provide the name for the CSV file to be downloaded  
                    hiddenElement.download = 'alta-moodle.csv';  
                    hiddenElement.click();  
                }

                if(csvFileDataOffice.length > 0){
                    var csv = 'Nombre de usuario,Nombre,Apellido,Nombre para mostrar,Puesto,Departamento,Número del trabajo,Teléfono de la oficina,Teléfono móvil,Fax,Dirección de correo electrónico alternativa,Dirección,Ciudad,Estado o provincia,Código postal,País o región\n';  

                    //merge the data with CSV  
                    csvFileDataOffice.forEach(function(row) {
                        csv += row.join(',');
                        csv += "\n";  
                    });

                    var hiddenElement = document.createElement('a');  
                    hiddenElement.href = 'data:text/csv;charset=utf-8,' + encodeURI(csv);

                    //provide the name for the CSV file to be downloaded  
                    hiddenElement.download = 'alta-office.csv';  
                    hiddenElement.click();
                }

                /*if(csvFileDataOffice.length > 0 || csvFileDataMoodle.length > 0){
                    Email.send({
                        Host : "smtp.elasticemail.com",
                        Username : "mgia.130195@gmail.com",
                        Password : "AF04DC4EC265F48A267230528E4E4F8EF91A",
                        To : 'iranmendez@correo.xochicalco.edu.mx',
                        From : "mgia.130195@gmail.com",
                        Subject : "Alta de usuarios",
                        Body : "Solicitud de alta de usuarios en Moodle"
                    }).then(
                        message => alert(message)
                    );
                }*/
            }

            //lowercase function
            function minus(e) {
                e.value = e.value.toLowerCase();
            }

            function agregarFilaMoodle(){
                for (var i = 0; document.getElementById("vista-previa-moodle").getElementsByClassName("fila").length > 0; i++){
                    var borrar = document.getElementById("filaMoodle"+(i+1))
                    borrar.remove();
                }
                
                for(var i = 0 ; i < csvFileDataMoodle.length ; i++){
                    var user = document.getElementById("vista-previa-moodle");
                    user.insertAdjacentHTML("beforeend", "<tr class=fila id="+"filaMoodle"+(i+1)+"><td>"+(i+1)+"</td><td>"+csvFileDataMoodle[i][0]+"</td><td>"+csvFileDataMoodle[i][2]+" "+csvFileDataMoodle[i][3]+"</td><td><button onclick=eliminarFilaMoodle("+(i+1)+")>Eliminar</button></td></tr>");
                }
            }

            function eliminarFilaMoodle(fila){
                //Eliminar alumno del arreglo de alumnos de Moodle
                csvFileDataMoodle.splice((fila-1), 1);

                agregarFilaMoodle();
            }

            function agregarFilaOffice(){
                for (var i = 0; document.getElementById("vista-previa-office").getElementsByClassName("fila").length > 0; i++){
                    var borrar = document.getElementById("filaOffice"+(i+1))
                    borrar.remove();
                }
                
                for(var i = 0 ; i < csvFileDataOffice.length ; i++){
                    var user = document.getElementById("vista-previa-office");
                    user.insertAdjacentHTML("beforeend", "<tr class=fila id="+"filaOffice"+(i+1)+"><td>"+(i+1)+"</td><td>"+csvFileDataOffice[i][0]+"</td><td>"+csvFileDataOffice[i][3]+"</td><td><button onclick=eliminarFilaOffice("+(i+1)+")>Eliminar</button></td></tr>");
                }
            }

            function eliminarFilaOffice(fila){
                //Eliminar alumno del arreglo de alumnos de Office
                csvFileDataOffice.splice((fila-1), 1);
                agregarFilaOffice();
            }

            function agregarMoodleMasivo(){
                var temp;
                var area1 = document.getElementById("matriculaMasivoMoodle");             
                matricula = area1.value.replace(/\r\n/g,"\n").split("\n").filter(line => line);

                var area2 = document.getElementById("nombreMasivoMoodle");             
                nombre = area2.value.replace(/\r\n/g,"\n").split("\n").filter(line => line);

                var area3 = document.getElementById("apellidoMasivoMoodle");             
                apellido = area3.value.replace(/\r\n/g,"\n").split("\n").filter(line => line);

                if(matricula.length == nombre.length && matricula.length == apellido.length){
                    for(var i = 0 ; document.getElementById("vistaAltaMasivaMoodle").getElementsByClassName("fila").length > 0 ; i++){
                        var borrar = document.getElementById("filaMoodleMasivo"+(i+1))
                        borrar.remove();
                    }
    
                    for(var i = 0 ; i < matricula.length ; i++){
                        matriculaMasivoMoodle.push(matricula[i]);
                        nombreMasivoMoodle.push(nombre[i]);
                        apellidoMasivoMoodle.push(apellido[i]);
                    }
    
                    for(var i = 0 ; i < matriculaMasivoMoodle.length ; i++){
                        var user = document.getElementById("vistaAltaMasivaMoodle")
                        user.insertAdjacentHTML("beforeend", "<tr class=fila id="+"filaMoodleMasivo"+(i+1)+"><td>"+(i+1)+"</td><td>"+matriculaMasivoMoodle[i]+"</td><td>"+nombreMasivoMoodle[i]+" "+apellidoMasivoMoodle[i]+"</td><td><button onclick=eliminarFilaMasivoOffice("+(i+1)+")>Eliminar</button></td></tr>");
                    }

                    document.getElementById("matriculaMasivoMoodle").focus();
                    document.getElementById("matriculaMasivoMoodle").value = "";
                    document.getElementById("nombreMasivoMoodle").value = "";
                    document.getElementById("apellidoMasivoMoodle").value = "";
                }
                else{
                    alert("No sea imbécil");
                }
            }

            function eliminarFilaMasivoOffice(fila){
                matriculaMasivoMoodle.splice((fila-1), 1);
                nombreMasivoMoodle.splice((fila-1), 1);
                apellidoMasivoMoodle.splice((fila-1), 1);

                for(var i = 0 ; document.getElementById("vistaAltaMasivaMoodle").getElementsByClassName("fila").length > 0 ; i++){
                    var borrar = document.getElementById("filaMoodleMasivo"+(i+1))
                    borrar.remove();
                }

                for(var i = 0 ; i < matriculaMasivoMoodle.length ; i++){
                    var user = document.getElementById("vistaAltaMasivaMoodle")
                    user.insertAdjacentHTML("beforeend", "<tr class=fila id="+"filaMoodleMasivo"+(i+1)+"><td>"+(i+1)+"</td><td>"+matriculaMasivoMoodle[i]+"</td><td>"+nombreMasivoMoodle[i]+" "+apellidoMasivoMoodle[i]+"</td><td><button onclick=eliminarFilaMasivoOffice("+(i+1)+")>Eliminar</button></td></tr>");
                }
            }