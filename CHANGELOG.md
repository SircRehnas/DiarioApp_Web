# Changelog - Diario Personal Web App

## [2.1.0] - 2025-04-09
### Fixed
- **Cambio de PIN y Notificaciones:** Corregida la lógica para el cambio de PIN. Solucionado el problema que causaba que las notificaciones mostraran "undefined" al asegurar que todas las traducciones necesarias estén definidas y mejorar la robustez de la función `showNotification`.
- **Cambio de Idioma:** Mejorada la función `applyTranslations` para actualizar correctamente todos los elementos de la interfaz (placeholders, botones, pestañas, contenido dinámico) al cambiar de idioma.
- **Tema Oscuro:** Añadidas reglas CSS específicas y ajustadas las variables existentes para que todos los componentes (tarjetas de blog, calendario, modales, formularios, etc.) se visualicen correctamente en el tema oscuro.
- **Botón Flotante (FAB):** Corregida la lógica JavaScript y las clases CSS (`show` en lugar de `open`) para que las opciones del botón flotante se desplieguen y oculten correctamente al hacer clic.
- **Modal de Marcadores:**
    - Solucionado error `TypeError: ... is null` y `ReferenceError: bookmarkModal is not defined` asegurando que los elementos HTML del modal (`bookmark-modal`, `bookmark-form`, `bookmark-title`, etc.) existan y las variables JS correspondientes se definan correctamente.
    - Corregido el funcionamiento de los botones de cerrar (`x` y "Cancelar") dentro del modal de marcadores mediante un sistema de cierre de modales más específico y robusto.
- **Arrastrar y Soltar Eventos:** Implementada correctamente la funcionalidad de arrastrar y soltar eventos entre días en el calendario, incluyendo la actualización de la fecha del evento y el refresco visual.
- **Actualización Automática de Secciones:** Modificadas las funciones `saveBlog` y `saveEvent` para que la vista de secciones y los selectores de sección se actualicen automáticamente después de guardar.
- **Estadísticas de Sección:** Corregida la función `renderSections` para usar correctamente las traducciones en las etiquetas de estadísticas ("Blogs:", "Eventos:") y en las listas de contenido ("Blogs en esta sección", etc.). Mejorada la gestión de eventos de click dentro de las tarjetas de sección.
- **Errores de Consola (Varios):**
    - Definidas las variables JS para elementos del DOM que faltaban (`postitIdInput`, `postitBlogSelect`, `postitEventSelect`).
    - Mejorada la robustez en el acceso a elementos del DOM para prevenir errores `TypeError` si un elemento no se encuentra.
    - Corregida la función `openSecurityModal` para manejar el atributo `required` de los inputs dinámicamente.
- **Cierre de Modales:** Implementado un sistema de cierre de modales más fiable que identifica el modal específico a cerrar en lugar de intentar cerrar todos.

## [2.0.0] - (Fecha de Lanzamiento V2 - Ajustar según sea necesario)
### Added
- **Seguridad Mejorada:**
    - Autenticación con PIN numérico de 4 dígitos como alternativa a la contraseña.
    - Funcionalidad para cambiar la contraseña y el PIN desde la configuración (requiere contraseña actual para cambiar contraseña).
    - Efecto visual 3D al abrir/desbloquear el diario.
- **Organización del Contenido:**
    - **Secciones:** Sistema para crear, editar y eliminar secciones con nombre, color y descripción. Posibilidad de asignar blogs y eventos a secciones. Visualización expandible de secciones con su contenido asociado.
    - **Marcadores:** Funcionalidad completa para guardar, editar y eliminar marcadores (título, URL, descripción).
    - **Widgets:** Sistema básico para añadir widgets al panel de configuración (Tiempo, RSS, Marcadores - funcionalidad interna pendiente).
    - **Post-its Anclables:** Posibilidad de anclar Post-its a entradas de blog o eventos específicos, además de mantenerlos flotantes. Tooltips para ver post-its anclados.
- **Personalización:**
    - **Temas:** Selector de tema Claro / Oscuro que afecta a toda la interfaz.
    - **Color del Libro:** Selector de color para personalizar el fondo principal del "libro".
    - **Idiomas:** Sistema de traducción implementado con soporte inicial para Español (es) e Inglés (en). Selección de idioma desde configuración.
    - **Zona Horaria:** Selector para configurar la zona horaria utilizada para mostrar fechas y horas.
- **Gestión de Datos:**
    - **Exportación:** Funcionalidad para exportar todos los datos (configuración, blogs, eventos, secciones, marcadores, post-its, widgets) a un archivo JSON descargable.
    - **Importación:** Funcionalidad para importar datos desde un archivo JSON previamente exportado, sobrescribiendo los datos actuales (con confirmación).
- **Mejoras de Interfaz y Experiencia:**
    - **Botón Flotante (FAB):** Añadido un botón flotante para acceso rápido a acciones comunes (Nuevo Blog, Evento, Post-it, Marcador).
    - **Notificaciones:** Sistema de notificaciones visuales ( éxito, error, advertencia) para feedback al usuario.
    - **Editor de Blogs:** Añadida barra de herramientas simple para formato de texto (negrita, cursiva, subrayado, listas, enlaces, imágenes - subir o URL).
    - **Interfaz:** Mejoras generales en efectos hover, transiciones y animaciones para una experiencia más fluida. Diseño responsivo básico.
- **Mejoras Técnicas:**
    - Refactorización para un código más modular.
    - Centralización de todas las cadenas de texto traducibles en el objeto `translations`.
    - Validación básica en formularios (campos requeridos, formato URL).
    - Manejo de errores mejorado y feedback al usuario mediante notificaciones.

## [1.0.0] - (Fecha Inicial - Ajustar según sea necesario)
### Added
- **Funcionalidades Iniciales:**
    - Sistema de autenticación inicial solo con contraseña.
    - Calendario visualizador de mes con navegación básica.
    - Creación y edición de entradas de blog con título y contenido simple.
    - Creación de Post-its flotantes y arrastrables con color personalizable.
    - Persistencia de datos usando `localStorage` del navegador.
    - Diseño inicial simulando un libro/diario.