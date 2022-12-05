async function Cancelar(cotizacionId, Folio) {
    let result = await Swal.fire({
        icon: 'warning',
        title: 'Está seguro de rechazar la cotización ' + Folio,
        confirmButtonText: 'Rechazar cotización',
        showDenyButton: true,
        denyButtonText: 'Cancelar',
    });
    if (result.isConfirmed) Swal.fire({
        icon: 'question',
        title: '¿Cuál es el motivo de rechazo?',
        input: 'text',
        inputAttributes: {
            autocapitalize: 'off'
        },
        showDenyButton: true,
        denyButtonText: 'Cancelar',
        confirmButtonText: 'Enviar motivo',
        preConfirm: (motivo) => { return motivo }
    }).then(async (result) => {
        if (result.isConfirmed) await fetch("/cotizacion/" + cotizacionId, {
            method: "DELETE",
            credentials: "same-origin",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                cotizacionId: cotizacionId,
                motivo: result.value.motivo
            })
        }).then((data)=> {
            window.location.href="/cotizacion/pendientes"
        })
    })
}


async function Aceptar(cotizacionId, Folio) {
    let result = await Swal.fire({
        icon: 'warning',
        title: 'Está seguro de aceptar la cotización ' + Folio,
        confirmButtonText: 'Rechazar cotización',
        showDenyButton: true,
        denyButtonText: 'Cancelar',
    });
    if (result.isConfirmed) await fetch("/cotizacion/" + cotizacionId + "/aceptar", {
        method: "POST",
        credentials: "same-origin",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            cotizacionId: cotizacionId,
            motivo: result.value.motivo
        })
    }).then((data)=> {
        window.location.href="/orden_compra/pendientes"
    })
}