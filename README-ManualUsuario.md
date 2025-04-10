# Manual de Usuario - Diario Personal Web

## 📖 Introducción

Bienvenido/a a Diario Personal, tu aplicación web todo en uno para organizar tu vida digital. Gestiona tu tiempo con el calendario, expresa tus ideas en el blog, guarda enlaces importantes con los marcadores y apunta recordatorios rápidos con los post-its.

Esta guía te ayudará a sacar el máximo provecho de todas sus funcionalidades.

### Índice

1.  [Introducción](#-introducción)
2.  [Primeros Pasos](#-primeros-pasos)
3.  [Interfaz Principal](#-interfaz-principal)
4.  [Calendario y Eventos](#-calendario-y-eventos)
5.  [Blogs (Entradas del Diario)](#-blogs-entradas-del-diario)
6.  [Secciones](#-secciones)
7.  [Marcadores](#-marcadores)
8.  [Post-its](#-post-its)
9.  [Configuración](#-configuración)
10. [Copias de Seguridad](#-copias-de-seguridad-exportarimportar)
11. [Uso en Móviles](#-uso-en-móviles)
12. [Soporte](#-soporte-y-problemas-comunes)

## 🔐 Primeros Pasos

### Acceso Inicial

1.  Abre el archivo `index.html` en tu navegador web preferido (Chrome, Firefox, Edge...).
2.  Verás la pantalla de inicio (libro cerrado). Puedes elegir iniciar sesión con Contraseña o PIN.
3.  Usa las credenciales predeterminadas para el primer acceso:
    * Contraseña: `DiarioApp`
    * PIN: `1234`
4.  **¡Importante!** Una vez dentro, ve a **Configuración (⚙️) → Seguridad** y cambia tanto la contraseña como el PIN por unos propios y seguros.

### Exploración Inicial

* Navega por las pestañas principales: **Calendario**, **Blogs**, **Secciones**, **Marcadores**.
* Prueba el **Botón Flotante (✚)** abajo a la derecha para añadir rápidamente nuevo contenido.
* Personaliza el título de tu diario haciendo clic directamente sobre él en la parte superior.
* Explora el menú de **Configuración (⚙️)** para ajustar la apariencia y otras opciones.

## 🖥️ Interfaz Principal

### Barra Superior

* **Título Editable:** Haz clic en "Mi Diario Personal" (o el título que hayas puesto) para cambiarlo. Se guarda automáticamente.
* **Fecha y Hora:** Muestra la fecha/hora local según tu zona horaria configurada, y la hora UTC. Se actualiza constantemente.
* **Botón de Configuración (⚙️):** Abre el panel lateral con todas las opciones de personalización y gestión.

### Navegación por Pestañas

La navegación principal se realiza mediante pestañas:

1.  **📅 Calendario:** Visualiza tus eventos por mes y gestiona tu agenda.
2.  **✍️ Blogs:** Crea, edita y visualiza tus entradas de diario personales.
3.  **📂 Secciones:** Organiza tus blogs y eventos por categorías personalizadas.
4.  **🔖 Marcadores:** Guarda y accede a tus enlaces web importantes.

### Botón Flotante de Acciones Rápidas (FAB - ✚)

Ubicado en la esquina inferior derecha, permite añadir nuevo contenido rápidamente:

* *(Icono Libro)* Nuevo Blog
* *(Icono Calendario+)* Nuevo Evento
* *(Icono Nota)* Nuevo Post-it (flotante)
* *(Icono Marcador)* Nuevo Marcador

*(Nota: Reemplaza los "(Icono ...)" con los iconos reales si tu visor de Markdown los soporta, o usa emojis)*

## 📅 Calendario y Eventos

### Visualización del Calendario

* Muestra una vista clásica de calendario mensual.
* Navega entre meses usando los botones **◄ (Anterior)** y **► (Siguiente)**.
* Vuelve rápidamente al mes actual con el botón **Hoy**.
* Selecciona un mes y año específicos usando el selector junto al nombre del mes.
* El día actual aparece resaltado.
* Los eventos creados se muestran dentro de la casilla de su día correspondiente.

### Gestión de Eventos

| Acción                         | Cómo hacerlo                                                                                                                                                           |
| :----------------------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Crear Evento** | Haz clic en el icono **➕** que aparece al pasar el ratón sobre un día, o usa el botón "Nuevo Evento" general. Rellena título (req.), descr., color, sección (opc.). |
| **Editar Evento** | Haz clic directamente sobre el nombre del evento en el calendario. Se abrirá el modal con los datos cargados.                                                              |
| **Eliminar Evento** | Abre el modal de edición del evento (clic en él) y pulsa el botón "Eliminar". Se pedirá confirmación.                                                                 |
| **Mover Evento (Drag & Drop)** | Haz clic sobre un evento, mantenlo pulsado y arrástralo a otro día del calendario. Suelta para cambiar la fecha.                                                        |
| **Asignar Color/Sección** | Dentro del modal de creación/edición, utiliza el selector de color y el desplegable de sección.                                                                         |

> **Tip:** Si un evento tiene Post-its anclados, aparecerá un pequeño icono 📝 junto a su título. Pasa el ratón por encima para ver un resumen.

## ✍️ Blogs (Entradas del Diario)

### Crear y Editar Entradas

Usa el botón "Nuevo Blog" o el FAB (✚ → *(Icono Libro)*) para abrir el editor.

#### Editor de Texto

Dispones de una barra de herramientas para dar formato:

* **Negrita**, **Cursiva**, **Subrayado**
* **Lista Viñetas**, **Lista Numerada**
* **Enlace:** Pide una URL.
* **Imagen:** Permite insertar desde URL o subiendo un archivo.
* **Deshacer**, **Rehacer**

#### Opciones Adicionales

* **Título:** Requerido.
* **Color de fondo:** Personaliza el fondo de la tarjeta.
* **Sección:** Asigna la entrada a una sección creada.
* **Guardar / Cancelar:** Botones de acción.

### Visualización y Organización

* Las entradas se muestran como tarjetas, ordenadas por fecha de modificación (más recientes primero).
* Botones para Editar o Eliminar en cada tarjeta.
* Si pertenece a una sección, se muestra una etiqueta con el nombre/color.
* Se indica si tiene Post-its anclados (📝).

## 📂 Secciones

### ¿Qué son las Secciones?

Las secciones te permiten categorizar y agrupar tus entradas de blog y eventos (ej: "Trabajo", "Personal", "Ideas").

### Gestionar Secciones

1.  **Crear:** Botón "Nueva Sección". Introduce Nombre (obligatorio), Color, Descripción (opcional).
2.  **Editar:** Botón "Editar" (✏️) en la tarjeta de la sección.
3.  **Eliminar:** Botón "Eliminar" (🗑️) en la tarjeta (con confirmación).

### Visualizar Contenido por Sección

* Cada tarjeta de sección muestra cuántos blogs/eventos tiene asignados.
* Haz clic en la tarjeta (excepto botones) para **expandirla** y ver listas de contenido.
* Haz clic en los títulos dentro de la vista expandida para ver/editar el blog/evento.

> **Nota:** Al eliminar una sección, los blogs/eventos asociados **no se eliminan**, solo pierden la asignación.

> **Tip:** Usa colores distintos para identificar secciones fácilmente.

## 🔖 Marcadores

### Guardar Enlaces Web

La pestaña Marcadores permite guardar y organizar enlaces web.

1.  Usa el botón "Nuevo Marcador" o el FAB (✚ → *(Icono Marcador)*).
2.  Rellena:
    * **Título:** Descriptivo (requerido).
    * **URL:** Dirección completa (requerida, válida).
    * **Descripción:** Opcional.
3.  Haz clic en "Guardar".

### Usar Marcadores

* Los marcadores se muestran como tarjetas.
* Haz clic en la **URL** para abrir el enlace en una nueva pestaña.
* Usa los botones "Editar" (✏️) y "Eliminar" (🗑️) para gestionarlos.

## 📝 Post-its

### Notas Rápidas y Flexibles

Ideales para anotaciones rápidas, recordatorios o ideas.

* **Creación:** Usa el FAB (✚ → *(Icono Nota)*) para añadir uno flotante.
* **Modo Flotante:** Arrastrables libremente por la pantalla (haz clic fuera de los controles). La posición se guarda.
* **Contenido:** Escribe directamente. Se guarda automáticamente (con debounce).
* **Eliminación:** Haz clic en (🗑️) en los controles.

### Anclaje y Color

| Icono      | Acción             | Descripción                                                                                                                                        |
| :--------- | :----------------- | :------------------------------------------------------------------------------------------------------------------------------------------------- |
| **📌 / 🔗** | **Anclar/Desanclar** | Abre modal para seleccionar Blog/Evento. Si ya está anclado (🔗), al hacer clic se desancla y vuelve a ser flotante.                               |
| **🎨** | **Cambiar Color** | Despliega paleta predefinida. Elige uno o haz clic en (+) para abrir el selector de color del sistema y elegir uno personalizado.                     |
| **🗑️** | **Eliminar** | Elimina permanentemente el Post-it (con confirmación).                                                                                             |

> **Tip:** Los Post-its anclados se muestran junto al Blog/Evento y no son arrastrables.

## ⚙️ Configuración

Accede haciendo clic en el icono (⚙️) en la esquina superior derecha.

### Opciones Disponibles

#### Apariencia

* **Color del libro:** Elige el color de fondo principal.
* **Tema:** Selecciona entre Claro u Oscuro.
* **Zona horaria:** Elige tu zona para correcta visualización de fechas/horas.
* **Idioma:** Cambia entre Español (es) e Inglés (en).

#### Seguridad

* **Cambiar contraseña:** Establece una nueva (requiere la actual).
* **Cambiar PIN:** Establece un nuevo PIN (4 dígitos).

#### Datos

* **Exportar todo:** Descarga un archivo `.json` con todos tus datos.
* **Importar todo:** Sube un archivo `.json` para restaurar datos.

#### Widgets (Futuro)

* Permite añadir widgets (funcionalidad básica implementada).

## 💾 Copias de Seguridad (Exportar/Importar)

**¡Es muy recomendable realizar copias periódicas!** Los datos se guardan solo en tu navegador.

### Exportación (Crear Copia)

1.  Ve a **Configuración (⚙️) → Datos**.
2.  Haz clic en **"Exportar todo"**.
3.  Guarda el archivo `.json` descargado en un lugar seguro. Contiene todo (config., blogs, eventos, secciones, marcadores, post-its).

### Importación (Restaurar Copia)

1.  Ve a **Configuración (⚙️) → Datos**.
2.  Haz clic en **"Importar todo"**.
3.  Selecciona tu archivo `.json` exportado.
4.  Confirma la operación.

> **¡ADVERTENCIA!** La importación **borrará todos los datos actuales** y los reemplazará con los del archivo. Asegúrate antes de confirmar.

> **Usos:** Mover diario a otro navegador/ordenador, restaurar tras limpiar caché.

## 📱 Uso en Móviles

* La aplicación es **responsiva** y se adapta a pantallas de móviles y tablets.
* La interfaz se reorganiza para mejorar la usabilidad táctil.
* El FAB sigue disponible.
* Todas las funcionalidades están accesibles.

> **Tip:** Puedes usar la opción "Añadir a pantalla de inicio" de tu navegador móvil para un acceso rápido.

## ❓ Soporte y Problemas Comunes

### Solución de Problemas

| Problema                                       | Posible Solución                                                                                                                                                                                                                                |
| :--------------------------------------------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **He olvidado mi contraseña/PIN** | **¡Sin recuperación automática!** Debes borrar los datos de LocalStorage del navegador para este sitio (elimina TODO). Luego accede con credenciales por defecto (`DiarioApp`/`1234`). **¡EXPORTA DATOS REGULARMENTE!** |
| **Los cambios no se guardan / App va lenta** | Verifica límite de LocalStorage (~5-10MB). Demasiado contenido (blogs largos, imágenes pegadas) puede llenarlo. Exporta, borra LocalStorage, importa. Usa URLs para imágenes grandes.                                                              |
| **Error al importar archivo `.json`** | Asegúrate de que el archivo es el `.json` correcto generado por la app y no está corrupto.                                                                                                                                                        |
| **Un botón/función no responde** | Recarga la página (F5 / Ctrl+R). Si persiste, revisa la consola del desarrollador (F12) por errores y [reporta un issue en GitHub](https://github.com/SircRehnas/DiarioApp_Web/issues). |

### Contacto y Reporte de Errores

Si encuentras errores o tienes sugerencias:

* Preferiblemente: [**Abre un "Issue" en GitHub**](https://github.com/SircRehnas/DiarioApp_Web/issues) (describe el problema, pasos para reproducirlo, capturas).
* Contacta al desarrollador en GitHub: **@SircRehnas**

---

**¡Gracias por usar Diario Personal Web!**