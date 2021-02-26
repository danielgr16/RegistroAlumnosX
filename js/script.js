            //create CSV file data in an array

            var csvFileDataMoodle = [];
            var csvFileDataOffice = [];
            var idFilaMoodle = 0;
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
                        }

                        document.getElementById("usuarios").classList.remove('d-none');
                        document.getElementById("usuarios").classList.add('d-block');
  
                        document.getElementById("user").value = "";
                        document.getElementById("first").value = "";
                        document.getElementById("last").value = "";
                        document.getElementById("user").focus();
                        document.getElementById("btndownload").className += " btn-active";

                        
                        idFilaMoodle++;
                        var user = document.getElementById("usuarios");
                        //user.insertAdjacentHTML("beforeend", "<p>" + idFilaMoodle + ".- " +csvFileDataMoodle[csvFileDataMoodle.length - 1] + "<button>Eliminar</button></p>");
                        user.insertAdjacentHTML("beforeend", "<p>" + idFilaMoodle + ".- " +csvFileDataMoodle[csvFileDataMoodle.length - 1] + "<button>Eliminar</button></p>");
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