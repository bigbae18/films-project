# Films JavaScript y PHP

Aplicación desarrollada en JavaScript (para frontend) y PHP (para backend). Trata de una API hecha por PHP, consumida por el frontend para mostrar una serie de películas y su año de producción. La vista tiene un botón para añadir una nueva película, un input de búsqueda para filtrar las películas sin refrescar la página, y un filtrado ascendiente y descendiente por Año de producción.

## Lista de ficheros

### Carpeta Backend

Hecho con PHP, tiene 3 carpetas: `db`, `models`, `api`.

> La carpeta `db` contiene la iniciación del objecto PDO que te brinda PHP para abrir una conexión con una base de datos, en este caso MySQL.
>
> La carpeta `models` contiene el tipo de dato que nos entra de la Base de Datos. Es una clase que nos permite definir también los métodos con las Querys que vamos a necesitar para que nuestros endpoints los consuman, y así poder devolver datos a las peticiones que entran.

La carpeta api contiene un archivo `cors.php`, donde lo que hago es settear ciertos headers que se repetían en todas los endpoints de peticiones que he hecho.

> La carpeta `api/films` contiene los endpoints que se han marcado para la api.

- `create.php` : Endpoint para añadir una película a base de datos. Método: `POST`
- `delete.php` : Endpoint para eliminar una película de base de datos. Método: `DELETE`
- `read.php` : Endpoint para leer todas las películas de base de datos y devolverlas. Método: `GET`
- `read_one.php` (No consumida por el frontend al final) : Endpoint para leer 1 película por id de base de datos y devolverla. Método `GET`

### Carpeta Frontend

> `index.html` contiene ciertos elementos que necesito para manipular la vista.
>
> `index.js` crea una instancia nueva del `FilmsController`, conectando así `FilmsService` con `FilmsView`.

#### Services

- `films.service.js` - Contiene la lógica del frontend brindada al usuario por la vista, y maneja las peticiones según lo que decida el usuario.

#### Models

- `film.model.js` - Archivo con la clase que define un tipo de datos: `Film`. Utilizado para tipar las películas brindadas por la API.

#### Views

- `films.view.js` - Contiene la creación de la vista, los formularios y los botones con los que va a interacturar el usuario, también utilizado para escuchar los eventos que realiza el usuario.

#### Controller

- `films.controller.js` - El controlador conecta la vista con el servicio, así podemos utilizarlo como vía de conexión. Los eventos provocados por el usuario pasan por el controlador, que define qué método del servicio es consumido.