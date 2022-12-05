
document.addEventListener('DOMContentLoaded', () => {
    var location = window.location.href;
    if (location.includes('dashboard')) {
        var prueba =  document.getElementById("dashboard_sidebar");
        document.getElementById("dashboard_sidebar").classList.add('active');
    }
    if (location.includes('empleado')) {
        document.getElementById("catalogo_sidebar").classList.add('active');
    }


});