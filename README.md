
# API Cart Frontend

Este es el frontend de una aplicación para gestionar un carrito de compras, interactuando con una API en Rails. El proyecto está desarrollado con **React**.

## Requisitos

- **Node.js**: Se recomienda usar la versión LTS.
- **npm o yarn**: Para gestionar las dependencias.

## Instalación

Sigue los siguientes pasos para poner en marcha el frontend de la aplicación.

### 1. Clonar el repositorio

```bash
git clone https://github.com/Stivenson02/ApiCartFrontend.git
```

### 2. Instalar dependencias

Dentro de la carpeta del proyecto, instala las dependencias necesarias:

```bash
npm install
```

o si prefieres usar **yarn**:

```bash
yarn install
```

### 3. Configurar el backend

Asegúrate de que el backend (API) esté corriendo en tu máquina local o en un servidor accesible.

El frontend realiza peticiones a la API en:

```bash
http://localhost:3000
```

### 4. Correr la aplicación

Para correr la aplicación, usa el siguiente comando:

```bash
npm start
```

o si usas **yarn**:

```bash
yarn start
```

Esto iniciará el servidor de desarrollo en `http://localhost:3001`.

## Funcionalidades

- **Visualización de productos**: Muestra los productos disponibles en el carrito.
- **Edición del carrito**: Permite agregar o eliminar productos del carrito.
- **Actualización del carrito**: Se actualiza en tiempo real cuando se agregan o eliminan productos.
- **Manejo de estado**: Se utiliza `React` y `useState` para manejar el estado del carrito y los productos.

## Dependencias

Este proyecto utiliza las siguientes dependencias:

- `react`
- `axios` para hacer las solicitudes HTTP.
- `react-router-dom` para la navegación.

## Contribuciones

Si deseas contribuir al proyecto, haz un fork del repositorio y realiza los cambios en tu propia rama. Luego, envía un pull request.

## Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo LICENSE para más detalles.

---

Gracias por revisar el proyecto.