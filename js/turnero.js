document.addEventListener("DOMContentLoaded", function () {
    const generarBtn = document.getElementById("generarHorarios");
    const reiniciarBtn = document.getElementById("reiniciarHorarios");
    const enviarBtn = document.getElementById("enviarHorario");
    const contenedor = document.getElementById("contenedorHorarios");

    generarBtn.addEventListener("click", () => {
        const inicio = document.getElementById("horaInicio").value;
        const fin = document.getElementById("horaFin").value;
        const intervalo = parseInt(document.getElementById("intervalo").value);

        if (!inicio || !fin || isNaN(intervalo) || intervalo <= 0) {
            alert("Completá todos los campos correctamente.");
            return;
        }

        const [hInicio, mInicio] = inicio.split(":").map(Number);
        const [hFin, mFin] = fin.split(":").map(Number);

        let actual = new Date();
        actual.setHours(hInicio, mInicio, 0, 0);

        const finTime = new Date();
        finTime.setHours(hFin, mFin, 0, 0);

        contenedor.innerHTML = "";

        let index = 0;

        while (actual < finTime) {
            const siguiente = new Date(actual.getTime() + intervalo * 60000);
            if (siguiente > finTime) break;

            const horaInicioStr = actual.toTimeString().substring(0, 5);
            const horaFinStr = siguiente.toTimeString().substring(0, 5);
            const label = `${horaInicioStr} - ${horaFinStr}`;

            const radio = document.createElement("input");
            radio.type = "radio";
            radio.name = "horario";
            radio.id = `horario${index}`;
            radio.value = label;

            const lbl = document.createElement("label");
            lbl.htmlFor = radio.id;
            lbl.textContent = label;

            const div = document.createElement("div");
            div.appendChild(radio);
            div.appendChild(lbl);
            contenedor.appendChild(div);

            actual = siguiente;
            index++;
        }

        if (index === 0) {
            contenedor.innerHTML = "No se generaron horarios con ese rango.";
        }
    });

    reiniciarBtn.addEventListener("click", () => {
        contenedor.innerHTML = "";
    });

    enviarBtn.addEventListener("click", () => {
        const seleccionado = document.querySelector('input[name="horario"]:checked');
        if (seleccionado) {
            alert("Horario reservado: " + seleccionado.value);
            // Aquí podrías enviar a un servidor si querés
        } else {
            alert("Seleccioná un horario antes de enviar.");
        }
    });
});


// aaaaaaaaaaaaaaaaaaaaaaaaaaa
document.addEventListener("DOMContentLoaded", function () {
    const selectorDia = document.getElementById("selectorDia");
    const listaHorarios = document.getElementById("listaHorarios");
    const btnReservar = document.getElementById("reservarBtn");

    let horariosPorDia = JSON.parse(localStorage.getItem("horariosPorDia")) || {};

    function mostrarHorarios(dia) {
        listaHorarios.innerHTML = "";

        if (!dia || !horariosPorDia[dia] || horariosPorDia[dia].length === 0) {
            listaHorarios.innerHTML = "<p>No hay horarios disponibles para este día.</p>";
            return;
        }

        horariosPorDia[dia].forEach((horario, index) => {
            const radio = document.createElement("input");
            radio.type = "radio";
            radio.name = "horario";
            radio.id = `h-${index}`;
            radio.value = horario;

            const label = document.createElement("label");
            label.htmlFor = radio.id;
            label.textContent = horario;

            const div = document.createElement("div");
            div.appendChild(radio);
            div.appendChild(label);

            listaHorarios.appendChild(div);
        });
    }

    selectorDia.addEventListener("change", function () {
        const dia = this.value;
        mostrarHorarios(dia);
    });

    btnReservar.addEventListener("click", function () {
        const seleccionado = document.querySelector('input[name="horario"]:checked');
        const dia = selectorDia.value;

        if (!seleccionado || !dia) {
            alert("Seleccioná un día y un horario para reservar.");
            return;
        }

        const horarioElegido = seleccionado.value;

        // Eliminar el horario reservado
        horariosPorDia[dia] = horariosPorDia[dia].filter(h => h !== horarioElegido);
        localStorage.setItem("horariosPorDia", JSON.stringify(horariosPorDia));

        alert(`Reservaste el horario "${horarioElegido}" para el día "${dia}".`);

        // Volver a mostrar los horarios actualizados
        mostrarHorarios(dia);
    });
});reservarBtn