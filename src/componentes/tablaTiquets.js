const tiquets = [
    {
        codigo: "001",
        fecha: "2025-03-18",
        fechaResuelto: "2025-03-19",
        aula: "A1",
        grupo: "G1",
        ordenador: "PC-01",
        descripcion: "Problema con la red",
        alumno: "Juan Pérez",
        estat: "resolt"
    },
    {
        codigo: "002",
        fecha: "2025-03-17",
        fechaResuelto: "2025-03-18",
        aula: "A2",
        grupo: "G2",
        ordenador: "PC-02",
        descripcion: "Fallo de hardware",
        alumno: "Ana Gómez",
        estat: "resolt"
    },
    {
        codigo: "003",
        fecha: "2025-03-20",
        fechaResuelto: "2025-03-21",
        aula: "A3",
        grupo: "G3",
        ordenador: "PC-03",
        descripcion: "Problema con el software",
        alumno: "Carlos López",
        estat: "pendent"
    },
    {
        codigo: "004",
        fecha: "2025-03-21",
        fechaResuelto: "2025-03-22",
        aula: "A4",
        grupo: "G4",
        ordenador: "PC-04",
        descripcion: "Pantalla en negro",
        alumno: "María Díaz",
        estat: "resolt"
    },
    {
        codigo: "005",
        fecha: "2025-03-22",
        fechaResuelto: "2025-03-23",
        aula: "A5",
        grupo: "G5",
        ordenador: "PC-05",
        descripcion: "Problema con la impresora",
        alumno: "José Martínez",
        estat: "pendent"
    },
    {
        codigo: "006",
        fecha: "2025-03-23",
        fechaResuelto: "2025-03-24",
        aula: "A6",
        grupo: "G6",
        ordenador: "PC-06",
        descripcion: "Fallo en el teclado",
        alumno: "Lucía Gómez",
        estat: "resolt"
    },
    {
        codigo: "007",
        fecha: "2025-03-24",
        fechaResuelto: "2025-03-25",
        aula: "A7",
        grupo: "G7",
        ordenador: "PC-07",
        descripcion: "Red lenta",
        alumno: "Antonio Fernández",
        estat: "resolt"
    },
    {
        codigo: "008",
        fecha: "2025-03-25",
        fechaResuelto: "2025-03-26",
        aula: "A8",
        grupo: "G8",
        ordenador: "PC-08",
        descripcion: "Fallo en el sistema operativo",
        alumno: "Pedro González",
        estat: "pendent"
    },
    {
        codigo: "009",
        fecha: "2025-03-26",
        fechaResuelto: "2025-03-27",
        aula: "A9",
        grupo: "G9",
        ordenador: "PC-09",
        descripcion: "Problema con la conexión",
        alumno: "Sofía Sánchez",
        estat: "resolt"
    },
    {
        codigo: "010",
        fecha: "2025-03-27",
        fechaResuelto: "2025-03-28",
        aula: "A10",
        grupo: "G10",
        ordenador: "PC-10",
        descripcion: "Pantalla táctil rota",
        alumno: "Miguel Rodríguez",
        estat: "pendent"
    },
    {
        codigo: "011",
        fecha: "2025-03-28",
        fechaResuelto: "2025-03-29",
        aula: "A11",
        grupo: "G11",
        ordenador: "PC-11",
        descripcion: "Problema con el software de edición",
        alumno: "Elena García",
        estat: "resolt"
    },
    {
        codigo: "012",
        fecha: "2025-03-29",
        fechaResuelto: "2025-03-30",
        aula: "A12",
        grupo: "G12",
        ordenador: "PC-12",
        descripcion: "No arranca el ordenador",
        alumno: "Fernando Pérez",
        estat: "pendent"
    },
    {
        codigo: "013",
        fecha: "2025-03-30",
        fechaResuelto: "2025-03-31",
        aula: "A13",
        grupo: "G13",
        ordenador: "PC-13",
        descripcion: "Problema con el navegador",
        alumno: "Laura Jiménez",
        estat: "resolt"
    },
    {
        codigo: "014",
        fecha: "2025-03-31",
        fechaResuelto: "2025-04-01",
        aula: "A14",
        grupo: "G14",
        ordenador: "PC-14",
        descripcion: "Pantalla en blanco",
        alumno: "David Ruiz",
        estat: "pendent"
    },
    {
        codigo: "015",
        fecha: "2025-04-01",
        fechaResuelto: "2025-04-02",
        aula: "A15",
        grupo: "G15",
        ordenador: "PC-15",
        descripcion: "Error al abrir el programa",
        alumno: "Rosa López",
        estat: "resolt"
    }
];

// Subir los datos al localStorage sin verificar si ya existen
localStorage.setItem('dades_tiquets', JSON.stringify(tiquets));

// Verificar que los datos se hayan subido correctamente
console.log('Datos subidos a localStorage:', localStorage.getItem('dades_tiquets'));