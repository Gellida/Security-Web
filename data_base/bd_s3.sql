-- phpMyAdmin SQL Dump
-- version 4.9.7
-- https://www.phpmyadmin.net/
--
-- Servidor: localhost:3306
-- Tiempo de generación: 14-11-2022 a las 22:07:26
-- Versión del servidor: 5.7.40
-- Versión de PHP: 7.4.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `wwmwco_bd_s3`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tblc_empresa`
--

CREATE TABLE `tblc_empresa` (
  `idempresa` int(10) NOT NULL,
  `empresa` varchar(100) DEFAULT NULL,
  `rfc` varchar(15) DEFAULT NULL,
  `telefono` int(12) DEFAULT NULL,
  `domicilio` blob
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tblc_estatus`
--

CREATE TABLE `tblc_estatus` (
  `idestatus` int(10) NOT NULL,
  `estatus` varchar(50) DEFAULT NULL,
  `tipo` varchar(50) DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `tblc_estatus`
--

INSERT INTO `tblc_estatus` (`idestatus`, `estatus`, `tipo`) VALUES
(1, 'Activo', 'usuario'),
(2, 'Inactivo', 'usuario'),
(3, 'En captura', 'cotizacion'),
(4, 'Enviado', 'cotizacion'),
(5, 'No aprobado', 'cotizacion'),
(6, 'Aprobado', 'cotizacion');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tblc_permiso`
--

CREATE TABLE `tblc_permiso` (
  `idpermiso` int(10) NOT NULL,
  `permiso` varchar(50) DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `tblc_permiso`
--

INSERT INTO `tblc_permiso` (`idpermiso`, `permiso`) VALUES
(1, 'Administrador general'),
(2, 'Gerente general'),
(3, 'Gerente de empresa / sucursal'),
(4, 'Recursos humanos'),
(5, 'Jurídico'),
(6, 'Auxiliares');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tblc_usuario`
--

CREATE TABLE `tblc_usuario` (
  `idusua` int(10) NOT NULL,
  `nombre` varchar(100) DEFAULT NULL,
  `paterno` varchar(100) DEFAULT NULL,
  `materno` varchar(100) DEFAULT NULL,
  `celular` int(12) DEFAULT NULL,
  `correo` varchar(150) DEFAULT NULL,
  `nss` varchar(20) DEFAULT NULL,
  `rfc` varchar(15) DEFAULT NULL,
  `fecnac` date DEFAULT NULL,
  `idpermiso` int(10) DEFAULT NULL,
  `idestatus` int(10) DEFAULT NULL,
  `idempresa` int(10) DEFAULT NULL,
  `feccap` datetime DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `tblc_empresa`
--
ALTER TABLE `tblc_empresa` (
  `nombre` varchar(100) DEFAULT NULL,
  `rfc` varchar(100) DEFAULT NULL,
  `curp` varchar(100) DEFAULT NULL,
  `domicilio` int(12) DEFAULT NULL,
  `celular` int(12) DEFAULT NULL,
  `numext` int(12) DEFAULT NULL,
  `numint` int(12) DEFAULT NULL,
  `colonia` varchar(100) DEFAULT NULL,
  `cp` varchar(100) DEFAULT NULL,
  `estado` varchar(100) DEFAULT NULL,
  `municipio` varchar(100) DEFAULT NULL,
  `regimenfiscal` varchar(100) DEFAULT NULL,
  `correo` varchar(150) DEFAULT NULL,
  `nss` varchar(20) DEFAULT NULL,
  `fecnac` date DEFAULT NULL,
  `idpermiso` int(10) DEFAULT NULL,
  `idestatus` int(10) DEFAULT NULL,
  `idempresa` int(10) DEFAULT NULL,
  `feccap` datetime DEFAULT NULL
  )
  ADD PRIMARY KEY (`idempresa`);

--
-- Indices de la tabla `tblc_estatus`
--
ALTER TABLE `tblc_estatus`
  ADD PRIMARY KEY (`idestatus`);

--
-- Indices de la tabla `tblc_permiso`
--
ALTER TABLE `tblc_permiso`
  ADD PRIMARY KEY (`idpermiso`);

--
-- Indices de la tabla `tblc_usuario`
--
ALTER TABLE `tblc_usuario`
  ADD PRIMARY KEY (`idusua`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `tblc_empresa`
--
ALTER TABLE `tblc_empresa`
  MODIFY `idempresa` int(10) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `tblc_estatus`
--
ALTER TABLE `tblc_estatus`
  MODIFY `idestatus` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT de la tabla `tblc_permiso`
--
ALTER TABLE `tblc_permiso`
  MODIFY `idpermiso` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT de la tabla `tblc_usuario`
--
ALTER TABLE `tblc_usuario`
  MODIFY `idusua` int(10) NOT NULL AUTO_INCREMENT;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;


SELECT * FROM tblc_cotizacion_servicio_referencia
