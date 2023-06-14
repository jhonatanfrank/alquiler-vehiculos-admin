import React from "react";
import { Link } from "react-router-dom";

export default function Aside() {
  return (
    <aside className="main-sidebar sidebar-dark-primary elevation-4">
      {/* Brand Logo */}
      <a href="index3.html" className="brand-link">
        <img
          src="dist/img/AdminLTELogo.png"
          alt="AdminLTE Logo"
          className="brand-image img-circle elevation-3"
          style={{ opacity: ".8" }}
        />
        <span className="brand-text font-weight-light">Rent Car´s</span>
      </a>
      {/* Sidebar */}
      <div className="sidebar">
        {/* Sidebar user panel (optional) */}
        <div className="user-panel mt-3 pb-3 mb-3 d-flex">
          <div className="image">
            <img
              src="dist/img/user2-160x160.jpg"
              className="img-circle elevation-2"
              alt="User Image"
            />
          </div>
          <div className="info">
            <a href="#" className="d-block">
              Undefined
            </a>
          </div>
        </div>
        {/* SidebarSearch Form */}

        {/* Sidebar Menu */}
        <nav className="mt-2">
          <ul
            className="nav nav-pills nav-sidebar flex-column"
            data-widget="treeview"
            role="menu"
            data-accordion="false"
          >
            {/* Add icons to the links using the .nav-icon class
         with font-awesome or any other icon font library */}
            <li className="nav-header">Resumen</li>
            <li className="nav-item">
              <Link className="nav-link" to="/">
                <div className="nav-link">
                  <i className="nav-icon fas fa-calendar-alt" />
                  <p>Resumen</p>
                </div>
              </Link>
            </li>
            <li className="nav-header">Todos nuestros alquileres</li>
            <li className="nav-item">
              <Link className="nav-link" to="/alquileres-resumen">
                <div className="nav-link">
                  <i className="nav-icon fas fa-calendar-alt" />
                  <p>Alquileres</p>
                </div>
              </Link>
            </li>
            {/*dsadasd */}
            <li className="nav-header">Mantenimiento</li>
            <li className="nav-item">
              <Link className="nav-link" to="/mantenimiento-vehiculos">
                <div className="nav-link">
                  <i className="nav-icon fas fa-calendar-alt" />
                  <p>Vehículos</p>
                </div>
              </Link>
            </li>
          </ul>
        </nav>
        {/* /.sidebar-menu */}
      </div>
      {/* /.sidebar */}
    </aside>
  );
}
