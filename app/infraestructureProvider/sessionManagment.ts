
import { EmpleadoFactory } from "../empleado/domain/empleadoFactory";
import { Empleado } from "../empleado/domain/empleadoModel";
require("dotenv").config();

export class SessionManagment {

    static registerSession(empleado: Empleado, req, res): void {
        req.session.user = empleado;
        res.json({"ok":empleado});
    }

    static deleteSession(req, res): void {
        req.session.destroy();
        res.redirect('/');
    }

    static getUser(req): Empleado {
        try {
            return EmpleadoFactory.makeEmpleado(req.session.user);
        } catch (error) {
            return EmpleadoFactory.makeEmptyEmpleado();
        }
    }

    static autentication(req, res, next) {
        const logged = this.logged(req);
        if(req?.url == "/") logged ? res.redirect('/dashboard') : next()
        else if(req?.url == "/login") next();
        else logged? next() : res.redirect('/');
    }

    static logged(req): boolean {
        return req?.session?.user != null;
    }
}

module.exports = SessionManagment;