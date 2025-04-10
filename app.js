document.addEventListener('DOMContentLoaded', function() {
    // Variables globales
    let currentDate = new Date();
    let blogs = JSON.parse(localStorage.getItem('blogs')) || [];
    let events = JSON.parse(localStorage.getItem('events')) || [];
    let postIts = JSON.parse(localStorage.getItem('postIts')) || [];
    let sections = JSON.parse(localStorage.getItem('sections')) || [];
    let bookmarks = JSON.parse(localStorage.getItem('bookmarks')) || [];
    let widgets = JSON.parse(localStorage.getItem('widgets')) || [];
    let settings = JSON.parse(localStorage.getItem('settings')) || {
        bookColor: '#f8f4e8',
        theme: 'light',
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        language: 'es',
        password: 'DiarioApp',
        pin: '1234'
    };
    
    let isEditingBlog = false;
    let currentBlogId = null;
    let isEditingEvent = false;
    let currentEventId = null;
    let isEditingSection = false;
    let currentSectionId = null;
    let isEditingBookmark = false;
    let currentBookmarkId = null;
    let isEditingPostIt = false;
    let currentPostItId = null;
    let isChangingPassword = false;
    let isChangingPin = false;
    let currentPin = '';
    let draggedPostIt = null;
    let dragOffsetX = 0;
    let dragOffsetY = 0;

    // Colores predeterminados para post-its
    const postItColors = [
        '#fffd75', // Amarillo
        '#ff9e7d', // Naranja
        '#ff7eb9', // Rosa
        '#7afcff', // Azul claro
        '#feff9c', // Amarillo claro
        '#fff740', // Amarillo brillante
        '#a0e7a0', // Verde claro
        '#d5a3ff'  // Lila
    ];

    // Zonas horarias comunes
    const timezones = [
        'America/New_York',
        'America/Chicago',
        'America/Denver',
        'America/Los_Angeles',
        'Europe/London',
        'Europe/Paris',
        'Europe/Madrid',
        'Asia/Tokyo',
        'Australia/Sydney'
    ];

    // Traducciones completas
    const translations = {
        es: {
            title: "Mi Diario Personal",
            loginPassword: "Contraseña",
            loginPin: "PIN",
            open: "Abrir",
            newBlog: "Nuevo Blog",
            newEvent: "Nuevo Evento",
            newSection: "Nueva Sección",
            newBookmark: "Nuevo Marcador",
            newPostIt: "Nuevo Post-it",
            today: "Hoy",
            save: "Guardar",
            cancel: "Cancelar",
            delete: "Eliminar",
            edit: "Editar",
            settings: "Configuración",
            appearance: "Apariencia",
            bookColor: "Color del libro",
            theme: "Tema",
            light: "Claro",
            dark: "Oscuro",
            timezone: "Zona horaria",
            language: "Idioma",
            security: "Seguridad",
            changePassword: "Cambiar contraseña",
            changePin: "Cambiar PIN",
            data: "Datos",
            exportAll: "Exportar todo",
            importAll: "Importar todo",
            widgets: "Widgets",
            currentPassword: "Contraseña actual",
            newPassword: "Nueva contraseña",
            confirmPassword: "Confirmar nueva contraseña",
            weather: "Tiempo",
            rss: "Noticias RSS",
            bookmark: "Marcador",
            addWidget: "Añadir Widget",
            blogTitle: "Título del blog",
            content: "Contenido",
            bgColor: "Color de fondo",
            section: "Sección",
            noSection: "Sin sección",
            eventTitle: "Título del evento",
            description: "Descripción",
            color: "Color",
            sectionName: "Nombre de la sección",
            sectionDescription: "Descripción",
            bookmarkTitle: "Título del marcador",
            url: "URL",
            bookmarkDescription: "Descripción",
            postItContent: "Contenido del Post-it",
            anchorTo: "Anclar a",
            none: "Ninguno",
            blog: "Blog",
            event: "Evento",
            selectBlog: "Seleccionar blog",
            selectEvent: "Seleccionar evento",
            noBlogs: "No hay blogs todavía",
            noSections: "No hay secciones todavía",
            noBookmarks: "No hay marcadores todavía",
            blogsInSection: "Blogs en esta sección",
            eventsInSection: "Eventos en esta sección",
            deleteConfirmation: "¿Estás seguro de que quieres eliminar esto?",
            deleteSectionWarning: "Todos los blogs y eventos asociados perderán su referencia",
            imageOptions: "Opciones de imagen",
            uploadImage: "Subir imagen",
            imageUrl: "URL de la imagen",
            selectFile: "Seleccionar archivo",
            success: "Éxito",
            error: "Error",
            warning: "Advertencia",
            incorrectPassword: "Contraseña incorrecta",
            incorrectPin: "PIN incorrecto",
            passwordsDontMatch: "Las contraseñas no coinciden",
            pinsDontMatch: "Los PINs no coinciden",
            passwordChanged: "Contraseña cambiada con éxito",
            pinChanged: "PIN cambiado con éxito",
            blogTitleRequired: "El título del blog es requerido",
            eventTitleRequired: "El título del evento es requerido",
            sectionNameRequired: "El nombre de la sección es requerido",
            bookmarkTitleRequired: "El título del marcador es requerido",
            invalidUrl: "URL inválida",
            importConfirmation: "¿Estás seguro de que quieres importar estos datos? Se sobrescribirán los datos actuales.",
            importSuccess: "Datos importados con éxito",
            importError: "Error al importar datos",
            invalidDataFile: "Archivo de datos inválido",
            fileReadError: "Error al leer el archivo",
            exportSuccess: "Datos exportados con éxito",
            widgetAdded: "Widget añadido con éxito",
            postItCreated: "Post-it creado",
            postItAnchored: "Post-it anclado",
            postItDeleted: "Post-it eliminado",
            blogCreated: "Blog creado",
            blogUpdated: "Blog actualizado",
            blogDeleted: "Blog eliminado",
            eventCreated: "Evento creado",
            eventUpdated: "Evento actualizado",
            eventDeleted: "Evento eliminado",
            sectionCreated: "Sección creada",
            sectionUpdated: "Sección actualizada",
            sectionDeleted: "Sección eliminada",
            bookmarkCreated: "Marcador creado",
            bookmarkUpdated: "Marcador actualizado",
            bookmarkDeleted: "Marcador eliminado",
            noDescription: "Sin descripción",
            postItNoContent: "Post-it sin contenido",
            noWidgets: "No hay widgets configurados",
            contentTooShort: "El contenido es demasiado corto (mínimo 10 caracteres)"
        },
        en: {
            title: "My Personal Diary",
            loginPassword: "Password",
            loginPin: "PIN",
            open: "Open",
            newBlog: "New Blog",
            newEvent: "New Event",
            newSection: "New Section",
            newBookmark: "New Bookmark",
            newPostIt: "New Post-it",
            today: "Today",
            save: "Save",
            cancel: "Cancel",
            delete: "Delete",
            edit: "Edit",
            settings: "Settings",
            appearance: "Appearance",
            bookColor: "Book color",
            theme: "Theme",
            light: "Light",
            dark: "Dark",
            timezone: "Timezone",
            language: "Language",
            security: "Security",
            changePassword: "Change password",
            changePin: "Change PIN",
            data: "Data",
            exportAll: "Export all",
            importAll: "Import all",
            widgets: "Widgets",
            currentPassword: "Current password",
            newPassword: "New password",
            confirmPassword: "Confirm new password",
            weather: "Weather",
            rss: "RSS News",
            bookmark: "Bookmark",
            addWidget: "Add Widget",
            blogTitle: "Blog title",
            content: "Content",
            bgColor: "Background color",
            section: "Section",
            noSection: "No section",
            eventTitle: "Event title",
            description: "Description",
            color: "Color",
            sectionName: "Section name",
            sectionDescription: "Description",
            bookmarkTitle: "Bookmark title",
            url: "URL",
            bookmarkDescription: "Description",
            postItContent: "Post-it content",
            anchorTo: "Anchor to",
            none: "None",
            blog: "Blog",
            event: "Event",
            selectBlog: "Select blog",
            selectEvent: "Select event",
            noBlogs: "No blogs yet",
            noSections: "No sections yet",
            noBookmarks: "No bookmarks yet",
            blogsInSection: "Blogs in this section",
            eventsInSection: "Events in this section",
            deleteConfirmation: "Are you sure you want to delete this?",
            deleteSectionWarning: "All associated blogs and events will lose their reference",
            imageOptions: "Image options",
            uploadImage: "Upload image",
            imageUrl: "Image URL",
            selectFile: "Select file",
            success: "Success",
            error: "Error",
            warning: "Warning",
            incorrectPassword: "Incorrect password",
            incorrectPin: "Incorrect PIN",
            passwordsDontMatch: "Passwords don't match",
            pinsDontMatch: "PINs don't match",
            passwordChanged: "Password changed successfully",
            pinChanged: "PIN changed successfully",
            blogTitleRequired: "Blog title is required",
            eventTitleRequired: "Event title is required",
            sectionNameRequired: "Section name is required",
            bookmarkTitleRequired: "Bookmark title is required",
            invalidUrl: "Invalid URL",
            importConfirmation: "Are you sure you want to import this data? Current data will be overwritten.",
            importSuccess: "Data imported successfully",
            importError: "Error importing data",
            invalidDataFile: "Invalid data file",
            fileReadError: "Error reading file",
            exportSuccess: "Data exported successfully",
            widgetAdded: "Widget added successfully",
            postItCreated: "Post-it created",
            postItAnchored: "Post-it anchored",
            postItDeleted: "Post-it deleted",
            blogCreated: "Blog created",
            blogUpdated: "Blog updated",
            blogDeleted: "Blog deleted",
            eventCreated: "Event created",
            eventUpdated: "Event updated",
            eventDeleted: "Event deleted",
            sectionCreated: "Section created",
            sectionUpdated: "Section updated",
            sectionDeleted: "Section deleted",
            bookmarkCreated: "Bookmark created",
            bookmarkUpdated: "Bookmark updated",
            bookmarkDeleted: "Bookmark deleted",
            noDescription: "No description",
            postItNoContent: "Post-it with no content",
            noWidgets: "No widgets configured",
            contentTooShort: "Content is too short (minimum 10 characters)"
        }
    };

    // Elementos del DOM
    const loginScreen = document.getElementById('login-screen');
    const appContainer = document.getElementById('app-container');
    const passwordForm = document.getElementById('password-form');
    const passwordInput = document.getElementById('password-input');
    const pinPad = document.getElementById('pin-pad');
    const pinDisplay = document.getElementById('pin-display');
    const showPasswordLogin = document.getElementById('show-password-login');
    const showPinLogin = document.getElementById('show-pin-login');
    const pinNumbers = document.querySelectorAll('.pin-numbers button[data-number]');
    const pinClear = document.getElementById('pin-clear');
    const pinSubmit = document.getElementById('pin-submit');
    
    const settingsBtn = document.getElementById('settings-btn');
    const settingsMenu = document.getElementById('settings-menu');
    const closeSettings = document.querySelector('.close-settings');
    const bookBgColor = document.getElementById('book-bg-color');
    const themeSelect = document.getElementById('theme-select');
    const timezoneSelect = document.getElementById('timezone-select');
    const languageSelect = document.getElementById('language-select');
    const changePasswordBtn = document.getElementById('change-password');
    const changePinBtn = document.getElementById('change-pin');
    const exportSettingsBtn = document.getElementById('export-settings');
    const importSettingsBtn = document.getElementById('import-settings');
    const importFileInput = document.getElementById('import-file');
    const widgetsContainer = document.getElementById('widgets-container');
    const securityModal = document.getElementById('security-modal');
    const securityForm = document.getElementById('security-form');
    const securityModalTitle = document.getElementById('security-modal-title');
    const currentPasswordInput = document.getElementById('current-password');
    const newPasswordInput = document.getElementById('new-password');
    const confirmPasswordInput = document.getElementById('confirm-password');
    const newPasswordLabel = document.getElementById('new-password-label');
    
    const diaryTitle = document.getElementById('diaryTitle');
    const currentDateTime = document.getElementById('currentDateTime');
    const currentUTCDateTime = document.getElementById('currentUTCDateTime');
    const tabs = document.querySelectorAll('.tab');
    const tabContents = document.querySelectorAll('.tab-content');
    const currentMonthYear = document.getElementById('current-month-year');
    const monthPicker = document.getElementById('month-picker');
    const prevMonthBtn = document.getElementById('prev-month');
    const nextMonthBtn = document.getElementById('next-month');
    const todayBtn = document.getElementById('today');
    const calendarDays = document.getElementById('calendar-days');
    const addBlogBtn = document.getElementById('add-blog');
    const addEventBtn = document.getElementById('add-event');
    const blogsContainer = document.getElementById('blogs-container');
    const blogModal = document.getElementById('blog-modal');
    const blogForm = document.getElementById('blog-form');
    const blogTitleInput = document.getElementById('blog-title');
    const blogContentEditable = document.getElementById('blog-content');
    const blogBgColorInput = document.getElementById('blog-bg-color');
    const blogSectionSelect = document.getElementById('blog-section');
    const modalTitle = document.getElementById('modal-title');
    const closeModalBtns = document.querySelectorAll('.close-modal');
    const eventModal = document.getElementById('event-modal');
    const eventForm = document.getElementById('event-form');
    const eventDateInput = document.getElementById('event-date');
    const eventTitleInput = document.getElementById('event-title');
    const eventDescriptionInput = document.getElementById('event-description');
    const eventColorInput = document.getElementById('event-color');
    const eventSectionSelect = document.getElementById('event-section');
    const deleteEventBtn = document.getElementById('delete-event');
    const addSectionBtn = document.getElementById('add-section');
    const sectionsContainer = document.getElementById('sections-container');
    const sectionModal = document.getElementById('section-modal');
    const sectionForm = document.getElementById('section-form');
    const sectionNameInput = document.getElementById('section-name');
    const sectionColorInput = document.getElementById('section-color');
    const sectionDescriptionInput = document.getElementById('section-description');
    const deleteSectionBtn = document.getElementById('delete-section');
    const addBookmarkBtn = document.getElementById('add-bookmark');
    const bookmarksContainer = document.getElementById('bookmarks-container');
    const fabMain = document.getElementById('fab-main');
    const fabOptions = document.querySelector('.fab-options');
    const currentYear = document.getElementById('current-year');
    const postitModal = document.getElementById('postit-modal');
    const postitIdInput = document.getElementById('postit-id');
    const postitBlogSelect = document.getElementById('postit-blog-select');
    const postitEventSelect = document.getElementById('postit-event-select');
    const postitForm = document.getElementById('postit-form');
    const bookmarkModal = document.getElementById('bookmark-modal');
    const bookmarkForm = document.getElementById('bookmark-form'); // ¡Y esta!
    const bookmarkTitleInput = document.getElementById('bookmark-title');
    const bookmarkUrlInput = document.getElementById('bookmark-url');
    const bookmarkDescInput = document.getElementById('bookmark-description');

    const widgetModal = document.getElementById('widget-modal');
    const widgetOptions = document.querySelectorAll('.widget-option');

    // Inicialización
    function init() {
        // Cargar configuración
        loadSettings();
        
        // Configurar eventos
        setupEventListeners();
        
        // Mostrar pantalla de login
        showLoginScreen();
        
        // Actualizar año en el footer
        currentYear.textContent = new Date().getFullYear();
    }

    function loadSettings() {
        // Aplicar configuración guardada
        if (localStorage.getItem('settings')) {
            settings = JSON.parse(localStorage.getItem('settings'));
        }
        
        // Aplicar tema
        document.documentElement.setAttribute('data-theme', settings.theme);
        themeSelect.value = settings.theme;
        
        // Aplicar color del libro
        bookBgColor.value = settings.bookColor;
        document.querySelector('.book').style.backgroundColor = settings.bookColor;
        
        // Configurar selector de zona horaria
        timezones.forEach(tz => {
            const option = document.createElement('option');
            option.value = tz;
            option.textContent = tz;
            if (tz === settings.timezone) {
                option.selected = true;
            }
            timezoneSelect.appendChild(option);
        });
        
        // Configurar selector de idioma
        languageSelect.value = settings.language;
        applyTranslations(settings.language);
        
        // Cargar widgets
        renderWidgets();
    }

    function applyTranslations(lang) {
        const t = translations[lang];
        settings.language = lang;
        
        // Actualizar elementos con data-translate
        document.querySelectorAll('[data-translate]').forEach(el => {
            const key = el.getAttribute('data-translate');
            if (t[key]) {
                el.textContent = t[key];
            }
        });
        
        // Actualizar placeholders
        const elementsToTranslate = {
            'password-input': 'loginPassword',
            'blog-title': 'blogTitle',
            'event-title': 'eventTitle',
            'section-name': 'sectionName',
            'bookmark-title': 'bookmarkTitle',
            'bookmark-url': 'url',
            'bookmark-description': 'description',
            'post-it-content': 'postItContent'
        };
        
        Object.entries(elementsToTranslate).forEach(([id, key]) => {
            const element = document.getElementById(id);
            if (element && t[key]) {
                element.placeholder = t[key];
            }
        });
        
        // Actualizar botones
        const buttonsToTranslate = {
            'add-blog': 'newBlog',
            'add-event': 'newEvent',
            'add-section': 'newSection',
            'add-bookmark': 'newBookmark',
            'today': 'today'
        };
        
        Object.entries(buttonsToTranslate).forEach(([id, key]) => {
            const element = document.getElementById(id);
            if (element && t[key]) {
                element.innerHTML = `<i class="fas fa-plus"></i> ${t[key]}`;
            }
        });
        
        // Actualizar tabs
        const tabsToTranslate = {
            'calendar': 'calendar',
            'blogs': 'blogs',
            'sections': 'sections',
            'bookmarks': 'bookmarks'
        };
        
        document.querySelectorAll('.tab').forEach(tab => {
            const tabId = tab.getAttribute('data-tab');
            if (tabsToTranslate[tabId] && t[tabsToTranslate[tabId]]) {
                tab.textContent = t[tabsToTranslate[tabId]];
            }
        });
        
        // Actualizar contenido dinámico
        renderCalendar();
        renderBlogs();
        renderSections();
        renderBookmarks();
    }

    function showLoginScreen() {
        loginScreen.style.display = 'flex';
        appContainer.style.display = 'none';
    }

    function showApp() {
        loginScreen.style.display = 'none';
        appContainer.style.display = 'block';
        
        // Renderizar contenido
        renderCalendar();
        renderBlogs();
        renderSections();
        renderBookmarks();
        renderPostIts();
        updateSectionSelects();
        
        // Actualizar fecha y hora
        updateDateTime();
        setInterval(updateDateTime, 1000);
    }

    function setupEventListeners() {
        // Login
        showPasswordLogin.addEventListener('click', () => {
            passwordForm.style.display = 'flex';
            pinPad.style.display = 'none';
            showPasswordLogin.style.backgroundColor = 'rgba(255, 255, 255, 0.2)';
            showPinLogin.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
        });
        
        showPinLogin.addEventListener('click', () => {
            passwordForm.style.display = 'none';
            pinPad.style.display = 'block';
            showPasswordLogin.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
            showPinLogin.style.backgroundColor = 'rgba(255, 255, 255, 0.2)';
            currentPin = '';
            updatePinDisplay();
        });
        
        passwordForm.addEventListener('submit', (e) => {
            e.preventDefault();
            if (passwordInput.value === settings.password) {
                document.querySelector('.closed-book').classList.add('open');
                setTimeout(showApp, 1000);
            } else {
                showNotification(translations[settings.language].incorrectPassword, 'error');
            }
        });
        
        pinNumbers.forEach(btn => {
            btn.addEventListener('click', () => {
                if (currentPin.length < 4) {
                    currentPin += btn.getAttribute('data-number');
                    updatePinDisplay();
                }
            });
        });
        
        pinClear.addEventListener('click', () => {
            currentPin = '';
            updatePinDisplay();
        });
        
        pinSubmit.addEventListener('click', () => {
            if (currentPin === settings.pin) {
                document.querySelector('.closed-book').classList.add('open');
                setTimeout(showApp, 1000);
            } else {
                showNotification(translations[settings.language].incorrectPin, 'error');
                currentPin = '';
                updatePinDisplay();
            }
        });
        
        // Configuración
        settingsBtn.addEventListener('click', toggleSettingsMenu);
        closeSettings.addEventListener('click', toggleSettingsMenu);
        
        bookBgColor.addEventListener('change', (e) => {
            settings.bookColor = e.target.value;
            document.querySelector('.book').style.backgroundColor = e.target.value;
            saveSettings();
        });
        
        themeSelect.addEventListener('change', (e) => {
            settings.theme = e.target.value;
            document.documentElement.setAttribute('data-theme', e.target.value);
            saveSettings();
        });
        
        timezoneSelect.addEventListener('change', (e) => {
            settings.timezone = e.target.value;
            saveSettings();
            updateDateTime();
        });
        
        languageSelect.addEventListener('change', (e) => {
            settings.language = e.target.value;
            saveSettings();
            applyTranslations(e.target.value);
        });
        
        changePasswordBtn.addEventListener('click', () => {
            isChangingPassword = true;
            isChangingPin = false;
            openSecurityModal();
        });
        
        changePinBtn.addEventListener('click', () => {
            isChangingPassword = false;
            isChangingPin = true;
            openSecurityModal();
        });
        
        exportSettingsBtn.addEventListener('click', exportAllData);
        importSettingsBtn.addEventListener('click', () => importFileInput.click());
        importFileInput.addEventListener('change', importAllData);
        
        securityForm.addEventListener('submit', (e) => {
            e.preventDefault();
            saveSecurityChanges();
        });
        
        // Widgets
        widgetOptions.forEach(option => {
            option.addEventListener('click', () => {
                const widgetType = option.getAttribute('data-widget');
                addWidget(widgetType);
                closeModal(widgetModal);
            });
        });
        
        // Diario
        diaryTitle.addEventListener('change', function() {
            localStorage.setItem('diaryTitle', this.value);
            showNotification(translations[settings.language].success, 'success');
        });
        
        tabs.forEach(tab => {
            tab.addEventListener('click', function() {
                tabs.forEach(t => t.classList.remove('active'));
                this.classList.add('active');
                
                const tabId = this.getAttribute('data-tab');
                tabContents.forEach(content => content.classList.remove('active'));
                document.getElementById(`${tabId}-content`).classList.add('active');
            });
        });
        
        monthPicker.addEventListener('change', function() {
            const [year, month] = this.value.split('-');
            currentDate = new Date(year, month - 1, 1);
            renderCalendar();
        });
        
        prevMonthBtn.addEventListener('click', function() {
            currentDate.setMonth(currentDate.getMonth() - 1);
            renderCalendar();
        });
        
        nextMonthBtn.addEventListener('click', function() {
            currentDate.setMonth(currentDate.getMonth() + 1);
            renderCalendar();
        });
        
        todayBtn.addEventListener('click', function() {
            currentDate = new Date();
            renderCalendar();
            showNotification(translations[settings.language].today, 'success');
        });
        
        addBlogBtn.addEventListener('click', function() {
            openBlogModal();
        });
        
        addEventBtn.addEventListener('click', function() {
            openEventModal();
        });
        
        blogForm.addEventListener('submit', function(e) {
            e.preventDefault();
            saveBlog();
        });
        
        closeModalBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                closeModal(blogModal);
                closeModal(eventModal);
                closeModal(sectionModal);
                closeModal(postitModal);
                closeModal(securityModal);
                closeModal(widgetModal);
                closeModal(bookmarkModal);
            });
        });
        
        eventForm.addEventListener('submit', function(e) {
            e.preventDefault();
            saveEvent();
        });
        
        deleteEventBtn.addEventListener('click', function() {
            if (confirm(translations[settings.language].deleteConfirmation)) {
                deleteEvent();
            }
        });
        
        addSectionBtn.addEventListener('click', function() {
            openSectionModal();
        });
        
        sectionForm.addEventListener('submit', function(e) {
            e.preventDefault();
            saveSection();
        });
        
        deleteSectionBtn.addEventListener('click', function() {
            if (confirm(translations[settings.language].deleteConfirmation + ' ' + translations[settings.language].deleteSectionWarning)) {
                deleteSection();
            }
        });
        
        // -- Listener para el botón de añadir marcador --
        if (addBookmarkBtn) { // Comprueba si el botón existe antes de añadir listener
            addBookmarkBtn.addEventListener('click', function() {
                openBookmarkModal(); // Llama a la función para abrir el modal
            });
        } else {
            console.warn("Elemento con id='add-bookmark' no encontrado.");
        }

        // -- Listener para el formulario de marcador --
        if (bookmarkForm) { // Comprueba si el formulario existe antes de añadir listener
             // La línea ~769 donde te da el error TypeError probablemente está aquí
            bookmarkForm.addEventListener('submit', function(e) {
                e.preventDefault();
                saveBookmark(); // Llama a la función para guardar
            });
        } else {
            console.warn("Elemento con id='bookmark-form' no encontrado.");
        }
        
        // Botones flotantes
        fabMain.addEventListener('click', toggleFabOptions);
        
        document.querySelectorAll('.fab-option').forEach(btn => {
            btn.addEventListener('click', function() {
                const action = this.getAttribute('data-action');
                handleFabAction(action);
                toggleFabOptions();
            });
        });
        
        // Manejar eventos de formato de texto en el editor de blogs
        document.querySelectorAll('.toolbar button').forEach(button => {
            button.addEventListener('click', function() {
                const command = this.getAttribute('data-command');
                
                if (command === 'createLink') {
                    const url = prompt(translations[settings.language].imageUrl + ':');
                    if (url) document.execCommand(command, false, url);
                } else if (command === 'insertImage') {
                    showImageInsertOptions();
                } else {
                    document.execCommand(command, false, null);
                }
                
                blogContentEditable.focus();
            });
        });

        // Drag and drop para eventos
        calendarDays.addEventListener('dragover', function(e) {
            e.preventDefault();
        });
        
        calendarDays.addEventListener('drop', function(e) {
            e.preventDefault();
            const eventId = e.dataTransfer.getData('text/plain');
            const dayElement = e.target.closest('.calendar-day');
            
            if (dayElement && eventId) {
                const dayNumber = dayElement.querySelector('.day-number');
                if (dayNumber) {
                    const day = parseInt(dayNumber.textContent);
                    const event = events.find(e => e.id === eventId);
                    if (event) {
                        const eventDate = new Date(event.date);
                        eventDate.setDate(day);
                        event.date = eventDate.toISOString();
                        saveEvents();
                        renderCalendar();
                        showNotification(translations[settings.language].eventUpdated, 'success');
                    }
                }
            }
        });

        // Eventos para el modal de marcadores
        document.getElementById('bookmark-form').addEventListener('submit', function(e) {
            e.preventDefault();
            saveBookmark();
        });

        // Eventos para el modal de post-its
        postitForm.addEventListener('submit', function(e) {
            e.preventDefault();
            savePostItAnchor();
        });
    }

    function updatePinDisplay() {
        pinDisplay.textContent = '_'.repeat(currentPin.length) + ' '.repeat(4 - currentPin.length);
    }

    function toggleSettingsMenu() {
        settingsMenu.classList.toggle('open');
    }

    function openSecurityModal() {
        const t = translations[settings.language];
        
        if (isChangingPassword) {
            securityModalTitle.textContent = t.changePassword;
            newPasswordLabel.textContent = t.newPassword;
            document.getElementById('current-password-fields').style.display = 'block';
            currentPasswordInput.required = true;
        } else if (isChangingPin) {
            securityModalTitle.textContent = t.changePin;
            newPasswordLabel.textContent = t.newPin;
            document.getElementById('current-password-fields').style.display = 'none';
            currentPasswordInput.required = false;
        }
        
        currentPasswordInput.value = '';
        newPasswordInput.value = '';
        confirmPasswordInput.value = '';
        
        openModal(securityModal);
    }

    function saveSecurityChanges() {
        const t = translations[settings.language];
        
        if (isChangingPassword) {
            if (currentPasswordInput.value !== settings.password) {
                showNotification(t.error + ': ' + t.incorrectPassword, 'error');
                return;
            }
            
            if (newPasswordInput.value !== confirmPasswordInput.value) {
                showNotification(t.error + ': ' + t.passwordsDontMatch, 'error');
                return;
            }
            
            settings.password = newPasswordInput.value;
            showNotification(t.passwordChanged, 'success');
        } else if (isChangingPin) {
            if (newPasswordInput.value !== confirmPasswordInput.value) {
                showNotification(t.error + ': ' + t.pinsDontMatch, 'error');
                return;
            }
            
            settings.pin = newPasswordInput.value;
            showNotification(t.pinChanged, 'success');
        }
        
        saveSettings();
        closeModal(securityModal);
    }

    function addWidget(type) {
        const newWidget = {
            id: generateId(),
            type,
            settings: {}
        };
        
        widgets.push(newWidget);
        saveWidgets();
        renderWidgets();
        showNotification(translations[settings.language].widgetAdded, 'success');
    }

    function renderWidgets() {
        widgetsContainer.innerHTML = '';
        
        if (widgets.length === 0) {
            widgetsContainer.innerHTML = `<p>${translations[settings.language].noWidgets}</p>`;
            return;
        }
        
        widgets.forEach(widget => {
            const widgetElement = document.createElement('div');
            widgetElement.className = 'widget';
            widgetElement.dataset.id = widget.id;
            
            switch (widget.type) {
                case 'weather':
                    widgetElement.innerHTML = `
                        <div class="widget-header">
                            <i class="fas fa-cloud-sun"></i>
                            <span>${translations[settings.language].weather}</span>
                        </div>
                        <div class="widget-content">
                            <p>Widget del tiempo</p>
                        </div>
                    `;
                    break;
                case 'rss':
                    widgetElement.innerHTML = `
                        <div class="widget-header">
                            <i class="fas fa-rss"></i>
                            <span>${translations[settings.language].rss}</span>
                        </div>
                        <div class="widget-content">
                            <p>Widget de noticias RSS</p>
                        </div>
                    `;
                    break;
                case 'bookmark':
                    widgetElement.innerHTML = `
                        <div class="widget-header">
                            <i class="fas fa-bookmark"></i>
                            <span>${translations[settings.language].bookmark}</span>
                        </div>
                        <div class="widget-content">
                            <p>Widget de marcadores</p>
                        </div>
                    `;
                    break;
            }
            
            widgetsContainer.appendChild(widgetElement);
        });
    }

    function toggleFabOptions() {
        fabOptions.classList.toggle('show');
    }

    function handleFabAction(action) {
        switch (action) {
            case 'blog':
                openBlogModal();
                break;
            case 'event':
                openEventModal();
                break;
            case 'postit':
                createPostIt();
                break;
            case 'bookmark':
                openBookmarkModal();
                break;
        }
    }

    function showImageInsertOptions() {
        const t = translations[settings.language];
        const options = `
            <div class="image-insert-options">
                <button type="button" id="upload-image">
                    <i class="fas fa-upload"></i> ${t.uploadImage}
                </button>
                <button type="button" id="insert-image-url">
                    <i class="fas fa-link"></i> ${t.imageUrl}
                </button>
            </div>
        `;
        
        // Mostrar opciones
        const container = document.createElement('div');
        container.innerHTML = options;
        blogContentEditable.parentNode.insertBefore(container, blogContentEditable.nextSibling);
        
        // Configurar eventos
        document.getElementById('upload-image').addEventListener('click', () => {
            const input = document.createElement('input');
            input.type = 'file';
            input.accept = 'image/*';
            input.click();
            
            input.addEventListener('change', () => {
                if (input.files && input.files[0]) {
                    const reader = new FileReader();
                    
                    reader.onload = function(e) {
                        document.execCommand('insertImage', false, e.target.result);
                        container.remove();
                    };
                    
                    reader.readAsDataURL(input.files[0]);
                }
            });
        });
        
        document.getElementById('insert-image-url').addEventListener('click', () => {
            const url = prompt(t.imageUrl + ':');
            if (url) {
                document.execCommand('insertImage', false, url);
            }
            container.remove();
        });
    }

    function updateDateTime() {
        const now = new Date();
        const options = { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            timeZone: settings.timezone
        };
        
        currentDateTime.textContent = now.toLocaleDateString(settings.language, options);
        currentUTCDateTime.textContent = `UTC: ${now.toUTCString()}`;
    }

    function renderCalendar() {
        const t = translations[settings.language];
        const monthNames = [
            'enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio',
            'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'
        ];
        
        currentMonthYear.textContent = `${monthNames[currentDate.getMonth()]} ${currentDate.getFullYear()}`;
        
        const year = currentDate.getFullYear();
        const month = String(currentDate.getMonth() + 1).padStart(2, '0');
        monthPicker.value = `${year}-${month}`;
        
        calendarDays.innerHTML = '';
        
        const firstDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
        const lastDay = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
        const firstDayIndex = firstDay.getDay();
        
        const today = new Date();
        const isCurrentMonth = today.getFullYear() === currentDate.getFullYear() && 
                              today.getMonth() === currentDate.getMonth();
        
        for (let i = 0; i < firstDayIndex; i++) {
            const emptyDay = document.createElement('div');
            emptyDay.classList.add('calendar-day', 'empty');
            calendarDays.appendChild(emptyDay);
        }
        
        for (let i = 1; i <= lastDay.getDate(); i++) {
            const dayElement = document.createElement('div');
            dayElement.classList.add('calendar-day');
            
            if (isCurrentMonth && i === today.getDate()) {
                dayElement.classList.add('today');
            }
            
            const dayNumber = document.createElement('div');
            dayNumber.classList.add('day-number');
            dayNumber.textContent = i;
            dayElement.appendChild(dayNumber);
            
            const dayEvents = events.filter(event => {
                const eventDate = new Date(event.date);
                return eventDate.getFullYear() === currentDate.getFullYear() && 
                       eventDate.getMonth() === currentDate.getMonth() && 
                       eventDate.getDate() === i;
            });
            
            dayEvents.forEach(event => {
                const eventElement = document.createElement('div');
                eventElement.classList.add('event');
                eventElement.textContent = event.title;
                eventElement.style.backgroundColor = `${event.color}20`;
                eventElement.style.color = event.color;
                
                // --- Solution 6: Make events draggable (continuación) ---
                eventElement.draggable = true;        
                eventElement.dataset.id = event.id;   

                eventElement.addEventListener('dragstart', function(e) {
                    e.dataTransfer.setData('text/plain', event.id); 
                    e.dataTransfer.effectAllowed = 'move'; 
                    // Optional: Add a visual cue for dragging
                    setTimeout(() => eventElement.classList.add('dragging'), 0);
                });

                // Completar Solution 6: dragend y clase 'dragging'
                eventElement.addEventListener('dragend', function() {
                    // Optional: Remove visual cue when dragging stops
                    eventElement.classList.remove('dragging');
                });
                // --- Fin Solution 6 ---

                // Tooltip para post-its anclados a eventos
                const eventPostIts = postIts.filter(p => p.anchorType === 'event' && p.anchorId === event.id);
                if (eventPostIts.length > 0) {
                    eventElement.classList.add('has-postits');
                    
                    const tooltip = document.createElement('div');
                    tooltip.className = 'event-tooltip';
                    eventPostIts.forEach(postIt => {
                        const postItElement = document.createElement('div');
                        postItElement.textContent = postIt.content || t.postItNoContent; // Usar traducción
                        postItElement.style.backgroundColor = postIt.color;
                        postItElement.style.padding = '5px';
                        postItElement.style.marginBottom = '5px';
                        postItElement.style.borderRadius = '3px';
                        tooltip.appendChild(postItElement);
                    });
                    
                    eventElement.appendChild(tooltip);
                }
                
                // Listener para abrir el modal de edición del evento
                eventElement.addEventListener('click', (e) => {
                    e.stopPropagation();
                    openEventModal(event.id);
                });
                dayElement.appendChild(eventElement);
            });
            
            // Botón para añadir evento en el día
            const addEventBtnDay = document.createElement('button'); // Renombrado para evitar conflicto
            addEventBtnDay.classList.add('add-event');
            addEventBtnDay.innerHTML = '<i class="fas fa-plus"></i>';
            addEventBtnDay.title = t.newEvent; // Añadir tooltip traducido
            addEventBtnDay.addEventListener('click', (e) => {
                e.stopPropagation();
                const dateStr = new Date(currentDate.getFullYear(), currentDate.getMonth(), i).toISOString();
                openEventModal(null, dateStr); // Pasar null como ID y la fecha del día
            });
            dayElement.appendChild(addEventBtnDay);
            
            calendarDays.appendChild(dayElement);
        }
        // --- Fin del bucle for en renderCalendar ---
    } // --- Fin de la función renderCalendar ---

    // --- applyTranslations con todas las llamadas render ---
    // (Asegúrate de que tu función se vea así al final)
    function applyTranslations(lang) {
        const t = translations[lang];
        settings.language = lang; // Set language in settings

        // Update static elements with data-translate attribute
        document.querySelectorAll('[data-translate]').forEach(el => {
            const key = el.getAttribute('data-translate');
            if (t[key]) el.textContent = t[key];
        });

        // Update placeholders
        const elementsWithPlaceholders = {
            'password-input': 'loginPassword',
            'blog-title': 'blogTitle',
            'event-title': 'eventTitle',
            'section-name': 'sectionName',
            'bookmark-title': 'bookmarkTitle', 
            'bookmark-url': 'url',           
            'bookmark-description': 'description' 
        };

        Object.entries(elementsWithPlaceholders).forEach(([id, key]) => {
            const element = document.getElementById(id);
            if (element && t[key]) element.placeholder = t[key];
        });

        // Update buttons with icons
        const buttonsToTranslate = {
            'add-blog': 'newBlog',
            'add-event': 'newEvent',
            'add-section': 'newSection',
            'add-bookmark': 'newBookmark',
            'today': 'today' 
        };

        Object.entries(buttonsToTranslate).forEach(([id, key]) => {
            const element = document.getElementById(id);
            if (element && t[key]) {
                const iconHTML = element.querySelector('i')?.outerHTML || '<i class="fas fa-plus"></i>';
                element.innerHTML = `${iconHTML} ${t[key]}`;
            }
        });

        // Update simple text buttons 
        const simpleButtons = {
             'show-password-login': 'loginPassword',
             'show-pin-login': 'loginPin',
             // ...otros botones sin icono...
        };
        Object.entries(simpleButtons).forEach(([id, key]) => {
            const element = document.getElementById(id);
            if (element && t[key]) element.textContent = t[key];
        });


        // Update tabs
        const tabsToTranslate = {
            'calendar': 'calendar', 
            'blogs': 'blogs',       
            'sections': 'sections', 
            'bookmarks': 'bookmarks' 
        };

        document.querySelectorAll('.tab').forEach(tab => {
            const tabId = tab.getAttribute('data-tab');
            if (tabsToTranslate[tabId] && t[tabsToTranslate[tabId]]) {
                tab.textContent = t[tabsToTranslate[tabId]];
            }
        });

        // --- Solution 2: Asegurar todas las llamadas render ---
        renderCalendar();
        renderBlogs();
        renderSections();
        renderBookmarks();
        renderPostIts(); 
        renderWidgets(); 
        updateSectionSelects(); 
        updateDateTime(); // Actualizar también fecha/hora por cambio de idioma/zona horaria
        // --- Fin Solution 2 ---
    }


    function renderBlogs() {
        const t = translations[settings.language];
        blogsContainer.innerHTML = '';
        
        if (blogs.length === 0) {
            blogsContainer.innerHTML = `<p style="grid-column: 1 / -1; text-align: center; color: var(--secondary-color);">${t.noBlogs}</p>`;
            return;
        }
        
        blogs.sort((a, b) => new Date(b.date) - new Date(a.date)); // Ordenar por fecha descendente

        blogs.forEach(blog => {
            const blogCard = document.createElement('div');
            blogCard.classList.add('blog-card');
            blogCard.style.backgroundColor = blog.bgColor || 'var(--light-color)'; // Usar variable CSS
            blogCard.dataset.id = blog.id;
            
            let sectionInfo = '';
            if (blog.sectionId) {
                const section = sections.find(s => s.id === blog.sectionId);
                if (section) {
                    // Usar color de sección para badge o borde
                    sectionInfo = `<span class="blog-section" style="background-color: ${section.color}20; color: ${section.color}; border: 1px solid ${section.color};">${section.name}</span>`;
                }
            }
            
            const blogPostIts = postIts.filter(p => p.anchorType === 'blog' && p.anchorId === blog.id);
            const postItBadge = blogPostIts.length > 0 ? 
                `<span class="postit-badge" title="${blogPostIts.length} post-it(s)">📝 ${blogPostIts.length}</span>` : '';
            
            blogCard.innerHTML = `
                <h3 class="blog-title">${blog.title} ${postItBadge}</h3>
                ${sectionInfo}
                <div class="blog-date">${new Date(blog.date).toLocaleString(settings.language, { dateStyle: 'medium', timeStyle: 'short' })}</div>
                <div class="blog-content">${blog.content}</div> 
                <div class="blog-actions">
                    <button class="edit-blog" data-id="${blog.id}" title="${t.edit}"><i class="fas fa-edit"></i> ${t.edit}</button>
                    <button class="delete-blog" data-id="${blog.id}" title="${t.delete}"><i class="fas fa-trash"></i> ${t.delete}</button>
                </div>
            `;

            // Añadir tooltip de post-its si existen
             if (blogPostIts.length > 0) {
                 const tooltip = document.createElement('div');
                 tooltip.className = 'blog-tooltip'; // Asegúrate que este estilo existe
                 blogPostIts.forEach(postIt => {
                     const postItElement = document.createElement('div');
                     postItElement.textContent = postIt.content || t.postItNoContent;
                     postItElement.style.backgroundColor = postIt.color;
                     postItElement.style.padding = '5px';
                     postItElement.style.marginBottom = '5px';
                     postItElement.style.borderRadius = '3px';
                     // Añadir contraste de texto si es necesario
                     // postItElement.style.color = getContrastYIQ(postIt.color); 
                     tooltip.appendChild(postItElement);
                 });
                 blogCard.querySelector('.blog-title').appendChild(tooltip); // Añadir tooltip al título
             }
            
            blogsContainer.appendChild(blogCard);
        });
        
        // Añadir listeners DESPUÉS de crear los elementos
        document.querySelectorAll('.edit-blog').forEach(btn => {
            btn.addEventListener('click', function() {
                const blogId = this.getAttribute('data-id');
                openBlogModal(blogId);
            });
        });
        document.querySelectorAll('.delete-blog').forEach(btn => {
            btn.addEventListener('click', function() {
                const blogId = this.getAttribute('data-id');
                if (confirm(t.deleteConfirmation)) {
                    deleteBlog(blogId);
                }
            });
        });
    }

    // --- Solution 8: renderSections completamente modificada ---
    function renderSections() {
        const t = translations[settings.language];
        sectionsContainer.innerHTML = '';

        if (sections.length === 0) {
            sectionsContainer.innerHTML = `<p style="grid-column: 1 / -1; text-align: center; color: var(--secondary-color);">${t.noSections}</p>`;
            return;
        }

        sections.forEach(section => {
            const sectionCard = document.createElement('div');
            sectionCard.classList.add('section-card');
            sectionCard.style.borderLeft = `5px solid ${section.color}`;
            sectionCard.dataset.id = section.id;

            const blogsInSection = blogs.filter(b => b.sectionId === section.id);
            const eventsInSection = events.filter(e => e.sectionId === section.id);

            sectionCard.innerHTML = `
                <h3 class="section-name" style="color: ${section.color}">${section.name}</h3>
                <div class="section-description">${section.description || t.noDescription}</div>
                <div class="section-stats">
                    <span>${t.blogs}: ${blogsInSection.length}</span> 
                    <span>${t.events}: ${eventsInSection.length}</span> 
                </div>
                <div class="section-content" style="display: none;">
                    <div class="section-blogs">
                        <h5>${t.blogsInSection}</h5> 
                        ${blogsInSection.length > 0 ?
                            blogsInSection.map(blog => `
                                <div class="section-item">
                                    <span>${blog.title}</span>
                                    <div class="section-item-actions">
                                        <button class="view-blog" data-id="${blog.id}" title="${t.edit}"><i class="fas fa-eye"></i></button>
                                        <button class="edit-blog" data-id="${blog.id}" title="${t.edit}"><i class="fas fa-edit"></i></button>
                                        <button class="delete-blog" data-id="${blog.id}" title="${t.delete}"><i class="fas fa-trash"></i></button>
                                    </div>
                                </div>
                            `).join('') :
                            `<p>${t.noBlogs}</p>`} 
                    </div>
                    <div class="section-events">
                        <h5>${t.eventsInSection}</h5> 
                        ${eventsInSection.length > 0 ?
                            eventsInSection.map(event => `
                                <div class="section-item">
                                    <span>${event.title} (${new Date(event.date).toLocaleDateString()})</span>
                                    <div class="section-item-actions">
                                        <button class="view-event" data-id="${event.id}" title="${t.edit}"><i class="fas fa-eye"></i></button>
                                        <button class="edit-event" data-id="${event.id}" title="${t.edit}"><i class="fas fa-edit"></i></button>
                                        <button class="delete-event" data-id="${event.id}" title="${t.delete}"><i class="fas fa-trash"></i></button>
                                    </div>
                                </div>
                            `).join('') :
                            `<p>${t.noEvents}</p>`} 
                    </div>
                </div>
                <div class="section-actions">
                    <button class="edit-section" data-id="${section.id}"><i class="fas fa-edit"></i> ${t.edit}</button> 
                    <button class="delete-section" data-id="${section.id}"><i class="fas fa-trash"></i> ${t.delete}</button> 
                </div>
            `;

            sectionsContainer.appendChild(sectionCard);

            // Listeners DENTRO del bucle para cada tarjeta creada
            sectionCard.addEventListener('click', (e) => {
                 if (!e.target.closest('.section-actions, .section-item-actions')) {
                     sectionCard.classList.toggle('expanded'); 
                     const content = sectionCard.querySelector('.section-content');
                     content.style.display = content.style.display === 'none' ? 'block' : 'none';

                      document.querySelectorAll('.section-card.expanded').forEach(otherCard => {
                          if (otherCard !== sectionCard) {
                              otherCard.classList.remove('expanded');
                              otherCard.querySelector('.section-content').style.display = 'none';
                          }
                      });
                 }
             });

             sectionCard.querySelectorAll('.view-blog, .edit-blog').forEach(button => {
                 button.addEventListener('click', (e) => {
                     e.stopPropagation(); 
                     const blogId = button.getAttribute('data-id');
                     openBlogModal(blogId);
                 });
             });
             sectionCard.querySelectorAll('.delete-blog').forEach(button => {
                 button.addEventListener('click', (e) => {
                     e.stopPropagation();
                     const blogId = button.getAttribute('data-id');
                     if (confirm(t.deleteConfirmation)) {
                         deleteBlog(blogId);
                     }
                 });
             });
              sectionCard.querySelectorAll('.view-event, .edit-event').forEach(button => {
                 button.addEventListener('click', (e) => {
                     e.stopPropagation();
                     const eventId = button.getAttribute('data-id');
                     openEventModal(eventId);
                 });
             });
              sectionCard.querySelectorAll('.delete-event').forEach(button => {
                 button.addEventListener('click', (e) => {
                     e.stopPropagation();
                     const eventId = button.getAttribute('data-id');
                     if (confirm(t.deleteConfirmation)) {
                         deleteEvent(eventId); // Llamar con el ID correcto
                     }
                 });
             });

             sectionCard.querySelector('.edit-section').addEventListener('click', function(e) {
                e.stopPropagation();
                const sectionId = this.getAttribute('data-id');
                openSectionModal(sectionId);
            });

            sectionCard.querySelector('.delete-section').addEventListener('click', function(e) {
                e.stopPropagation();
                const sectionId = this.getAttribute('data-id');
                if (confirm(t.deleteConfirmation + ' ' + t.deleteSectionWarning)) {
                    deleteSection(sectionId);
                }
            });
        });
    }
    // --- Fin Solution 8 ---


    function renderBookmarks() {
        const t = translations[settings.language];
        bookmarksContainer.innerHTML = '';
        
        if (bookmarks.length === 0) {
            bookmarksContainer.innerHTML = `<p style="grid-column: 1 / -1; text-align: center; color: var(--secondary-color);">${t.noBookmarks}</p>`;
            return;
        }
        
        bookmarks.forEach(bookmark => {
            const bookmarkCard = document.createElement('div');
            bookmarkCard.classList.add('bookmark-card');
            bookmarkCard.dataset.id = bookmark.id;
            
            bookmarkCard.innerHTML = `
                <h3 class="bookmark-title">${bookmark.title}</h3>
                <div class="bookmark-url">
                    <a href="${bookmark.url.startsWith('http') ? bookmark.url : 'http://' + bookmark.url}" target="_blank" rel="noopener noreferrer">${bookmark.url}</a>
                </div>
                <div class="bookmark-description">${bookmark.description || t.noDescription}</div>
                <div class="bookmark-actions">
                    <button class="edit-bookmark" data-id="${bookmark.id}" title="${t.edit}"><i class="fas fa-edit"></i> ${t.edit}</button>
                    <button class="delete-bookmark" data-id="${bookmark.id}" title="${t.delete}"><i class="fas fa-trash"></i> ${t.delete}</button>
                </div>
            `;
            
            bookmarksContainer.appendChild(bookmarkCard);
        });
        
        // Añadir listeners DESPUÉS de crear los elementos
        document.querySelectorAll('.edit-bookmark').forEach(btn => {
            btn.addEventListener('click', function() {
                const bookmarkId = this.getAttribute('data-id');
                openBookmarkModal(bookmarkId);
            });
        });
        document.querySelectorAll('.delete-bookmark').forEach(btn => {
            btn.addEventListener('click', function() {
                const bookmarkId = this.getAttribute('data-id');
                if (confirm(t.deleteConfirmation)) {
                    deleteBookmark(bookmarkId);
                }
            });
        });
    }

    function renderPostIts() {
        // Eliminar post-its flotantes existentes para evitar duplicados
        document.querySelectorAll('.post-it-container:not([data-anchored="true"])').forEach(el => el.remove());
        
        // Renderizar solo post-its no anclados (flotantes)
        postIts.filter(postIt => !postIt.anchorType).forEach(postIt => {
            // Solo renderiza si no existe ya (para evitar problemas con drag)
             if (!document.getElementById(`post-it-${postIt.id}`)) {
                 renderPostIt(postIt);
             }
        });
        
        // Actualizar badges en blogs y eventos (se hace en renderBlogs/renderCalendar)
        renderBlogs();
        renderCalendar();
    }

    function renderPostIt(postIt) {
        const t = translations[settings.language];
        // Evitar re-renderizar si ya existe y no está anclado
        if (!postIt.anchorType && document.getElementById(`post-it-${postIt.id}`)) {
             return;
        }

        const postItElement = document.createElement('div');
        postItElement.className = 'post-it-container';
        postItElement.id = `post-it-${postIt.id}`;
        postItElement.style.backgroundColor = postIt.color;
        postItElement.dataset.id = postIt.id;

        if (postIt.anchorType) {
            // Anclado: posición relativa, estilos diferentes
            postItElement.dataset.anchored = true;
            postItElement.style.position = 'relative';
            postItElement.style.left = 'auto';
            postItElement.style.top = 'auto';
            postItElement.style.margin = '10px 0';
            postItElement.style.width = 'calc(100% - 20px)'; // Ocupa ancho del contenedor
            postItElement.style.cursor = 'default'; // No arrastrable
        } else {
            // Flotante: posición absoluta, arrastrable
            postItElement.style.left = `${postIt.position?.x || 50}px`; // Posición guardada o default
            postItElement.style.top = `${postIt.position?.y || 50}px`;  // Posición guardada o default
            postItElement.style.position = 'absolute';
             postItElement.style.zIndex = '50'; // Z-index inicial
             postItElement.style.cursor = 'move';
        }
        
        postItElement.innerHTML = `
            <textarea class="post-it-content" placeholder="${t.postItContent}">${postIt.content || ''}</textarea>
            <div class="post-it-actions">
                <button class="post-it-action anchor-postit" data-id="${postIt.id}" title="${t.anchorTo}">
                    <i class="fas ${postIt.anchorType ? 'fa-unlink' : 'fa-thumbtack'}"></i> 
                </button>
                <button class="post-it-action change-color" data-id="${postIt.id}" title="${t.color}">
                    <i class="fas fa-palette"></i>
                </button>
                <button class="post-it-action delete-post-it" data-id="${postIt.id}" title="${t.delete}">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
            <div class="color-picker" id="color-picker-${postIt.id}">
                ${postItColors.map(color => `
                    <div class="color-option" style="background-color: ${color}" data-color="${color}"></div>
                `).join('')}
                <div class="color-option custom" data-color="custom" title="Custom Color"></div>
            </div>
        `;

        if (!postIt.anchorType) {
            document.body.appendChild(postItElement); // Añadir flotantes al body
            makeDraggable(postItElement, postIt.id); // Hacer arrastrable si es flotante
        } else {
             // Lógica para añadir post-it anclado se maneja en renderBlogs/renderCalendar
             // Esta función principalmente renderiza los flotantes ahora
             // O podrías llamar a esto desde renderBlogs/Calendar para los anclados
        }
        
        // Event listeners para acciones (se aplican siempre)
        postItElement.querySelector('.post-it-content').addEventListener('input', function() {
            updatePostItContent(postIt.id, this.value);
        });
        postItElement.querySelector('.anchor-postit').addEventListener('click', function(e) {
            e.stopPropagation();
            if(postIt.anchorType) { // Si ya está anclado, desanclar
                postIt.anchorType = null;
                postIt.anchorId = null;
                savePostIts();
                showNotification(t.postItCreated, 'success'); // Reutilizar mensaje o crear uno nuevo
                renderPostIts(); // Re-renderizar todo
            } else { // Si no, abrir modal para anclar
                openPostItModal(postIt.id);
            }
        });
        postItElement.querySelector('.change-color').addEventListener('click', function(e) {
            e.stopPropagation();
            const picker = document.getElementById(`color-picker-${postIt.id}`);
            picker.classList.toggle('open'); // Usar clase para mostrar/ocultar
        });
         document.addEventListener('click', function(e) { // Cerrar picker si se hace click fuera
             const picker = document.getElementById(`color-picker-${postIt.id}`);
             if (picker && !picker.contains(e.target) && !postItElement.querySelector('.change-color').contains(e.target)) {
                 picker.classList.remove('open');
             }
         });

        postItElement.querySelectorAll('.color-option').forEach(option => {
            option.addEventListener('click', function(e) {
                e.stopPropagation();
                const color = this.getAttribute('data-color');
                if (color === 'custom') {
                    const customColorInput = document.createElement('input');
                    customColorInput.type = 'color';
                    customColorInput.value = postIt.color; // Valor actual
                    customColorInput.style.position = 'absolute';
                    customColorInput.style.opacity = '0'; // Invisible
                    document.body.appendChild(customColorInput);
                    customColorInput.click(); // Abrir selector de color del navegador

                    customColorInput.addEventListener('input', () => {
                        changePostItColor(postIt.id, customColorInput.value);
                        document.getElementById(`color-picker-${postIt.id}`).classList.remove('open');
                        customColorInput.remove(); // Limpiar input
                    }, { once: true });

                     customColorInput.addEventListener('change', () => { // Handle closing without selection
                          if (customColorInput.parentNode) { // Check if still exists
                               customColorInput.remove();
                          }
                     }, { once: true });

                } else {
                    changePostItColor(postIt.id, color);
                    document.getElementById(`color-picker-${postIt.id}`).classList.remove('open');
                }
            });
        });
        postItElement.querySelector('.delete-post-it').addEventListener('click', function(e) {
            e.stopPropagation();
            if (confirm(t.deleteConfirmation)) {
                deletePostIt(postIt.id);
            }
        });
    }

    function makeDraggable(element, postItId) {
        element.addEventListener('mousedown', startDrag);

        function startDrag(e) {
            // No arrastrar si se clickea en acciones, textarea o color picker
            if (e.target.closest('.post-it-action, .post-it-content, .color-picker')) {
                return;
            }
            
            e.preventDefault();
            draggedPostIt = postItId;
            // Calcular offset relativo al viewport
            dragOffsetX = e.clientX - element.getBoundingClientRect().left;
            dragOffsetY = e.clientY - element.getBoundingClientRect().top;
            
            element.style.cursor = 'grabbing';
            element.style.zIndex = '100'; // Poner encima
            // Mover elemento al final del body para asegurar visibilidad sobre otros elementos? No, puede causar problemas.
            
            document.addEventListener('mousemove', drag);
            document.addEventListener('mouseup', stopDrag, { once: true }); // 'once: true' para auto-limpieza
        }
        
        function drag(e) {
            if (!draggedPostIt) return;
            
            // Calcular nueva posición (relativa al viewport)
            let x = e.clientX - dragOffsetX;
            let y = e.clientY - dragOffsetY;

            // Limitar al viewport (opcional)
            // x = Math.max(0, Math.min(x, window.innerWidth - element.offsetWidth));
            // y = Math.max(0, Math.min(y, window.innerHeight - element.offsetHeight));

            element.style.left = `${x}px`;
            element.style.top = `${y}px`;
             
            // NO guardar en cada movimiento, solo al final (en stopDrag)
        }
        
        function stopDrag(e) { // Pasar evento a stopDrag
             if (!draggedPostIt) return;
             
             element.style.cursor = 'move'; // Volver al cursor normal
             element.style.zIndex = '50';  // Volver a z-index normal
            
             document.removeEventListener('mousemove', drag);
             // No es necesario remover mouseup si se usó { once: true }

              // Guardar posición FINAL
             const finalRect = element.getBoundingClientRect();
             const postIt = postIts.find(p => p.id === postItId);
             if (postIt) {
                 postIt.position = { 
                     x: finalRect.left + window.scrollX, // Guardar posición relativa al documento
                     y: finalRect.top + window.scrollY 
                 };
                 savePostIts(); // Guardar solo una vez al final
             }

             draggedPostIt = null;
         }
    }

    function openBlogModal(blogId = null) {
        const t = translations[settings.language];
        const modalTitleElement = document.querySelector('#blog-modal .modal-title'); // Seleccionar título correcto

        if (blogId) {
            const blog = blogs.find(b => b.id === blogId);
            if (!blog) return;
            
            blogTitleInput.value = blog.title;
            blogContentEditable.innerHTML = blog.content;
            blogBgColorInput.value = blog.bgColor || '#ffffff';
             if (modalTitleElement) modalTitleElement.textContent = t.editBlog;
            isEditingBlog = true;
            currentBlogId = blogId;
            
            if (blog.sectionId) {
                blogSectionSelect.value = blog.sectionId;
            } else {
                blogSectionSelect.value = '';
            }
        } else {
            blogTitleInput.value = '';
            blogContentEditable.innerHTML = '';
            blogBgColorInput.value = '#ffffff';
             if (modalTitleElement) modalTitleElement.textContent = t.newBlog;
            isEditingBlog = false;
            currentBlogId = null;
            blogSectionSelect.value = '';
        }
        
        updateSectionSelects(); // Asegurar que el select esté actualizado
        openModal(blogModal);
        blogTitleInput.focus();
    }

    // --- Solution 7: saveBlog con renderSections ---
    function saveBlog() {
        const t = translations[settings.language];
        const title = blogTitleInput.value.trim();
        const content = blogContentEditable.innerHTML;
        const bgColor = blogBgColorInput.value;
        const sectionId = blogSectionSelect.value || null;

        if (!title) {
            showNotification(t.error + ': ' + t.blogTitleRequired, 'error');
            blogTitleInput.focus();
            return;
        }
        
        // Podrías añadir validación de longitud mínima para 'content' aquí
         const tempDiv = document.createElement('div'); // Para obtener texto plano del HTML
         tempDiv.innerHTML = content;
         const textContent = tempDiv.textContent || tempDiv.innerText || "";
        if (textContent.trim().length < 10) { 
            showNotification(t.error + ': ' + t.contentTooShort, 'error'); 
            blogContentEditable.focus();
            return;
        }
        
        if (isEditingBlog) {
            const index = blogs.findIndex(b => b.id === currentBlogId);
            if (index !== -1) {
                blogs[index] = {
                    ...blogs[index],
                    title,
                    content,
                    bgColor,
                    sectionId,
                    date: new Date().toISOString() // Actualizar fecha de modificación
                };
                showNotification(t.blogUpdated, 'success');
            }
        } else {
            const newBlog = {
                id: generateId(),
                title,
                content,
                bgColor,
                sectionId,
                date: new Date().toISOString() // Fecha de creación
            };
            blogs.push(newBlog); // Añadir al final, o unshift() al principio
            showNotification(t.blogCreated, 'success');
        }
        
        saveBlogs();
        closeModal(blogModal);
        renderBlogs();
        renderSections(); // --- Solution 7 ---
        updateSectionSelects(); 
    }
    // --- Fin Solution 7 ---

    function deleteBlog(blogId) {
        const t = translations[settings.language];
        blogs = blogs.filter(blog => blog.id !== blogId);
        // Desanclar post-its asociados (o eliminarlos?)
        postIts = postIts.map(p => {
            if (p.anchorType === 'blog' && p.anchorId === blogId) {
                return { ...p, anchorType: null, anchorId: null }; // Desanclar
            }
            return p;
        });
        
        saveBlogs();
        savePostIts(); 
        showNotification(t.blogDeleted, 'success');
        renderBlogs();
        renderSections(); // Actualizar contadores en secciones
        renderPostIts(); // Actualizar post-its desanclados
    }

    function openEventModal(eventId = null, dateStr = null) {
        const t = translations[settings.language];
        const modalTitleElement = document.querySelector('#event-modal .modal-title'); // Seleccionar título correcto

        if (eventId) {
            const event = events.find(e => e.id === eventId);
            if (!event) return;
            
            eventTitleInput.value = event.title;
            eventDescriptionInput.value = event.description || '';
            eventColorInput.value = event.color;
            eventDateInput.value = event.date; // Fecha ya está en ISO string
            document.getElementById('event-id').value = event.id; // Guardar ID en hidden input
             if (modalTitleElement) modalTitleElement.textContent = t.editEvent;
            deleteEventBtn.style.display = 'inline-block'; // Mostrar botón eliminar
            isEditingEvent = true;
            currentEventId = eventId; // Guardar ID actual (aunque también está en input)
            
            if (event.sectionId) {
                eventSectionSelect.value = event.sectionId;
            } else {
                eventSectionSelect.value = '';
            }
        } else {
            eventTitleInput.value = '';
            eventDescriptionInput.value = '';
            eventColorInput.value = '#0071e3'; // Color por defecto
            // Si se proporciona dateStr (desde calendario), usarlo, sino usar hoy
            eventDateInput.value = dateStr || new Date().toISOString(); 
            document.getElementById('event-id').value = ''; // Limpiar ID en hidden input
             if (modalTitleElement) modalTitleElement.textContent = t.newEvent;
            deleteEventBtn.style.display = 'none'; // Ocultar botón eliminar
            isEditingEvent = false;
            currentEventId = null;
            eventSectionSelect.value = '';
        }
        
        updateSectionSelects(); // Asegurar que el select esté actualizado
        openModal(eventModal);
        eventTitleInput.focus();
    }

    // --- Solution 7: saveEvent con renderSections ---
    function saveEvent() {
        const t = translations[settings.language];
        const title = eventTitleInput.value.trim();
        const description = eventDescriptionInput.value;
        const color = eventColorInput.value;
        const date = eventDateInput.value; // Ya es ISO string
        const sectionId = eventSectionSelect.value || null;
        const eventId = document.getElementById('event-id').value; // Obtener ID del input hidden
        
        if (!title) {
            showNotification(t.error + ': ' + t.eventTitleRequired, 'error');
            eventTitleInput.focus();
            return;
        }
        
        if (eventId) { // Si hay ID, estamos editando
            const index = events.findIndex(e => e.id === eventId);
            if (index !== -1) {
                events[index] = {
                    ...events[index],
                    title,
                    description,
                    color,
                    date,
                    sectionId
                };
                showNotification(t.eventUpdated, 'success');
            }
        } else { // Si no hay ID, es nuevo
            const newEvent = {
                id: generateId(),
                title,
                description,
                color,
                date,
                sectionId
            };
            events.push(newEvent);
            showNotification(t.eventCreated, 'success');
        }
        
        saveEvents();
        closeModal(eventModal);
        renderCalendar();
        renderSections(); // --- Solution 7 ---
        updateSectionSelects(); 
    }
    // --- Fin Solution 7 ---

    function deleteEvent(eventIdToDelete = null) { // Aceptar ID como argumento
        const t = translations[settings.language];
        const id = eventIdToDelete || currentEventId; // Usar argumento o variable global
        if (!id) return; // No hacer nada si no hay ID

        events = events.filter(event => event.id !== id);
         // Desanclar post-its asociados
         postIts = postIts.map(p => {
             if (p.anchorType === 'event' && p.anchorId === id) {
                 return { ...p, anchorType: null, anchorId: null }; // Desanclar
             }
             return p;
         });
        
        saveEvents();
        savePostIts();
        showNotification(t.eventDeleted, 'success');
        closeModal(eventModal); // Cerrar modal si estaba abierto
        renderCalendar();
        renderSections(); // Actualizar contadores
        renderPostIts(); // Actualizar post-its desanclados
         currentEventId = null; // Resetear variable global
         document.getElementById('event-id').value = ''; // Limpiar input hidden
    }

    function openSectionModal(sectionId = null) {
        const t = translations[settings.language];
        const modalTitleElement = document.querySelector('#section-modal .modal-title');
        const sectionIdInput = document.getElementById('section-id');

        if (sectionId) {
            const section = sections.find(s => s.id === sectionId);
            if (!section) return;
            
            sectionNameInput.value = section.name;
            sectionColorInput.value = section.color;
            sectionDescriptionInput.value = section.description || '';
            sectionIdInput.value = section.id;
             if (modalTitleElement) modalTitleElement.textContent = t.editSection;
            deleteSectionBtn.style.display = 'inline-block';
            isEditingSection = true;
            currentSectionId = sectionId; // Mantener por si acaso, aunque usemos el input
        } else {
            sectionNameInput.value = '';
            sectionColorInput.value = '#0071e3'; // Default color
            sectionDescriptionInput.value = '';
            sectionIdInput.value = '';
             if (modalTitleElement) modalTitleElement.textContent = t.newSection;
            deleteSectionBtn.style.display = 'none';
            isEditingSection = false;
            currentSectionId = null;
        }
        
        openModal(sectionModal);
        sectionNameInput.focus();
    }

    function saveSection() {
        const t = translations[settings.language];
        const name = sectionNameInput.value.trim();
        const color = sectionColorInput.value;
        const description = sectionDescriptionInput.value;
        const sectionId = document.getElementById('section-id').value;
        
        if (!name) {
            showNotification(t.error + ': ' + t.sectionNameRequired, 'error');
            sectionNameInput.focus();
            return;
        }
        
        if (sectionId) { // Editando
            const index = sections.findIndex(s => s.id === sectionId);
            if (index !== -1) {
                sections[index] = {
                    ...sections[index],
                    name,
                    color,
                    description
                };
                showNotification(t.sectionUpdated, 'success');
            }
        } else { // Nuevo
            const newSection = {
                id: generateId(),
                name,
                color,
                description
            };
            sections.push(newSection);
            showNotification(t.sectionCreated, 'success');
        }
        
        saveSections();
        closeModal(sectionModal);
        renderSections();
        updateSectionSelects(); // Actualizar selects en otros modales
         renderBlogs(); // Re-renderizar blogs por si cambió el nombre/color de la sección
         renderCalendar(); // Re-renderizar eventos por si cambió el nombre/color de la sección
    }

    function deleteSection(sectionIdToDelete = null) { // Aceptar ID como argumento
        const t = translations[settings.language];
        const id = sectionIdToDelete || document.getElementById('section-id').value || currentSectionId; // Obtener ID
        if (!id) return; 
        
        // Eliminar referencia de sección en blogs y eventos
        blogs = blogs.map(blog => {
            if (blog.sectionId === id) {
                return { ...blog, sectionId: null };
            }
            return blog;
        });
        events = events.map(event => {
            if (event.sectionId === id) {
                return { ...event, sectionId: null };
            }
            return event;
        });
        
        // Eliminar la sección
        sections = sections.filter(section => section.id !== id);
        
        saveSections();
        saveBlogs();
        saveEvents();
        
        showNotification(t.sectionDeleted, 'success');
        closeModal(sectionModal); // Cerrar modal si estaba abierto
        renderSections();
        renderBlogs(); // Actualizar blogs que perdieron la sección
        renderCalendar(); // Actualizar eventos que perdieron la sección
        updateSectionSelects(); // Actualizar selects en otros modales
         currentSectionId = null; // Resetear
         document.getElementById('section-id').value = '';
    }

    // --- Solution 5: openBookmarkModal modificada ---
    function openBookmarkModal(bookmarkId = null) {
        const t = translations[settings.language];
        // Asegurarse que los elementos existen y son correctos
        const modalTitleElement = document.querySelector('#bookmark-modal .modal-title');
        
        if (!bookmarkModal || !bookmarkTitleInput || !bookmarkUrlInput || !bookmarkDescInput || !modalTitleElement) {
             console.error("Bookmark modal elements not found!");
             showNotification(t.error, 'error'); // Notificación genérica
             return;
        }

        if (bookmarkId) {
            const bookmark = bookmarks.find(b => b.id === bookmarkId);
            if (bookmark) {
                bookmarkTitleInput.value = bookmark.title;
                bookmarkUrlInput.value = bookmark.url;
                bookmarkDescInput.value = bookmark.description || '';
                modalTitleElement.textContent = t.editBookmark; // Usar traducción
            } else {
                 console.error(`Bookmark with ID ${bookmarkId} not found.`);
                 bookmarkTitleInput.value = '';
                 bookmarkUrlInput.value = '';
                 bookmarkDescInput.value = '';
                 modalTitleElement.textContent = t.newBookmark; // Fallback a nuevo
                 bookmarkId = null; // Resetear ID
            }
        } else {
            bookmarkTitleInput.value = '';
            bookmarkUrlInput.value = '';
            bookmarkDescInput.value = '';
            modalTitleElement.textContent = t.newBookmark; // Usar traducción
        }

        isEditingBookmark = !!bookmarkId;
        currentBookmarkId = bookmarkId; // Guardar ID
        openModal(bookmarkModal); // Usar la variable correcta del modal
        bookmarkTitleInput.focus();
    }
    // --- Fin Solution 5 ---

    function saveBookmark() {
        const t = translations[settings.language];
        const title = bookmarkTitleInput.value.trim();
        const url = bookmarkUrlInput.value.trim();
        const description = bookmarkDescInput.value;
        
        if (!title) {
            showNotification(t.error + ': ' + t.bookmarkTitleRequired, 'error');
            bookmarkTitleInput.focus();
            return;
        }
        
        if (!url || !isValidUrl(url)) {
            showNotification(t.error + ': ' + t.invalidUrl, 'error');
            bookmarkUrlInput.focus();
            return;
        }
        
        if (isEditingBookmark && currentBookmarkId) { // Comprobar ID
            const index = bookmarks.findIndex(b => b.id === currentBookmarkId);
            if (index !== -1) {
                bookmarks[index] = {
                    ...bookmarks[index],
                    title,
                    url,
                    description
                };
                showNotification(t.bookmarkUpdated, 'success');
            }
        } else {
            const newBookmark = {
                id: generateId(),
                title,
                url,
                description
            };
            bookmarks.push(newBookmark);
            showNotification(t.bookmarkCreated, 'success');
        }
        
        saveBookmarks();
        closeModal(bookmarkModal);
        renderBookmarks();
    }

    function deleteBookmark(bookmarkId) {
        const t = translations[settings.language];
        bookmarks = bookmarks.filter(bookmark => bookmark.id !== bookmarkId);
        saveBookmarks();
        
        showNotification(t.bookmarkDeleted, 'success');
        renderBookmarks();
    }

    function createPostIt() {
        const t = translations[settings.language];
        const newPostIt = { // Cambiado a 'newPostIt'
            id: generateId(),
            content: '',
            color: postItColors[Math.floor(Math.random() * postItColors.length)], // Color aleatorio de la paleta
            position: { x: 50 + Math.random()*50, y: 100 + Math.random()*50 }, // Posición inicial semi-aleatoria
            anchorType: null,
            anchorId: null
        };
        postIts.push(newPostIt);
        savePostIts();
        renderPostIt(newPostIt); // Renderizar el nuevo post-it
        showNotification(t.postItCreated, 'success');
         // Enfocar el textarea del nuevo post-it
         setTimeout(() => {
             const element = document.getElementById(`post-it-${newPostIt.id}`);
             if(element) {
                  const textarea = element.querySelector('.post-it-content');
                  if(textarea) textarea.focus();
             }
         }, 100); // Pequeño delay para asegurar que esté en el DOM
    }

    function openPostItModal(postItId) {
        const t = translations[settings.language];
        const postIt = postIts.find(p => p.id === postItId);
        if (!postIt || !postitIdInput || !postitBlogSelect || !postitEventSelect) {
             console.error("Post-it or modal elements not found for anchoring.");
             return;
        }
        
        postitIdInput.value = postItId; // Guardar ID en el input hidden
        
        // Limpiar y rellenar select de blogs
        postitBlogSelect.innerHTML = `<option value="">${t.selectBlog}</option>`;
        blogs.forEach(blog => {
            const option = document.createElement('option');
            option.value = blog.id;
            option.textContent = blog.title;
            if (postIt.anchorType === 'blog' && postIt.anchorId === blog.id) {
                option.selected = true;
            }
            postitBlogSelect.appendChild(option);
        });
        
        // Limpiar y rellenar select de eventos
        postitEventSelect.innerHTML = `<option value="">${t.selectEvent}</option>`;
        events.sort((a, b) => new Date(b.date) - new Date(a.date)); // Ordenar eventos por fecha
        events.forEach(event => {
            const option = document.createElement('option');
            option.value = event.id;
            option.textContent = `${event.title} (${new Date(event.date).toLocaleDateString()})`;
            if (postIt.anchorType === 'event' && postIt.anchorId === event.id) {
                option.selected = true;
            }
            postitEventSelect.appendChild(option);
        });
        
        // Establecer selección actual y estado de selects
        const radioNone = document.getElementById('postit-none');
        const radioBlog = document.getElementById('postit-blog');
        const radioEvent = document.getElementById('postit-event');

        postitBlogSelect.disabled = true;
        postitEventSelect.disabled = true;

        if (postIt.anchorType === 'blog') {
             if (radioBlog) radioBlog.checked = true;
            postitBlogSelect.disabled = false;
        } else if (postIt.anchorType === 'event') {
             if (radioEvent) radioEvent.checked = true;
            postitEventSelect.disabled = false;
        } else {
             if (radioNone) radioNone.checked = true;
        }
        
        // Listeners para radios (asegurarse que no se dupliquen si se abre modal varias veces)
        const anchorRadios = document.querySelectorAll('input[name="postit-anchor"]');
        const handleRadioChange = function() { // Crear función nombrada para poder removerla
             postitBlogSelect.disabled = this.value !== 'blog';
             postitEventSelect.disabled = this.value !== 'event';
             // Autofocus en el select correspondiente si se activa
              if (this.value === 'blog') postitBlogSelect.focus();
              if (this.value === 'event') postitEventSelect.focus();
        };
        anchorRadios.forEach(radio => {
            radio.removeEventListener('change', handleRadioChange); // Remover listener previo si existe
            radio.addEventListener('change', handleRadioChange); // Añadir nuevo listener
        });
        
        openModal(postitModal);
    }

    function savePostItAnchor() {
        const t = translations[settings.language];
        const postItId = postitIdInput.value; // Obtener ID del input hidden
        const postIt = postIts.find(p => p.id === postItId);
        if (!postIt) return;
        
        const anchorType = document.querySelector('input[name="postit-anchor"]:checked')?.value; // Usar optional chaining
        
        if (!anchorType) { // Si no se seleccionó nada (debería ser imposible con radios, pero por si acaso)
             closeModal(postitModal);
             return;
        }

        let previousAnchorType = postIt.anchorType;
        let previousAnchorId = postIt.anchorId;

        if (anchorType === 'none') {
            postIt.anchorType = null;
            postIt.anchorId = null;
        } else if (anchorType === 'blog') {
            const blogId = postitBlogSelect.value;
            if (!blogId) { // No se seleccionó blog
                 showNotification(t.error + ': ' + t.selectBlog, 'error');
                 return;
            }
            postIt.anchorType = 'blog';
            postIt.anchorId = blogId;
        } else if (anchorType === 'event') {
            const eventId = postitEventSelect.value;
            if (!eventId) { // No se seleccionó evento
                 showNotification(t.error + ': ' + t.selectEvent, 'error');
                 return;
            }
            postIt.anchorType = 'event';
            postIt.anchorId = eventId;
        }
        
        savePostIts();
        closeModal(postitModal);
        showNotification(t.postItAnchored, 'success');

        // Re-renderizar elementos afectados
        // Quitar el post-it del DOM flotante si ahora está anclado
        const postItElement = document.getElementById(`post-it-${postItId}`);
         if (postItElement && !postIt.anchorType) { // Si estaba anclado y ahora es flotante
             // Moverlo al body y hacerlo arrastrable
              document.body.appendChild(postItElement);
              Object.assign(postItElement.style, { position: 'absolute', left: `${postIt.position?.x || 50}px`, top: `${postIt.position?.y || 50}px`, width: '', margin: '', cursor: 'move' });
              makeDraggable(postItElement, postItId);
              postItElement.removeAttribute('data-anchored');
         } else if (postItElement && postIt.anchorType) { // Si era flotante y ahora está anclado
              postItElement.remove(); // Eliminar del DOM flotante, se añadirá en renderBlogs/Calendar
         }


        // Actualizar los contenedores (blogs/calendar)
        renderBlogs();
        renderCalendar();
        renderPostIts(); // Re-renderizar flotantes (por si se desancló uno)
    }

    function updatePostItContent(postItId, content) {
        const postIt = postIts.find(p => p.id === postItId);
        if (postIt) {
            postIt.content = content;
            // Guardar con debounce para no sobrecargar localStorage en cada tecla
             clearTimeout(postIt.saveTimeout); 
             postIt.saveTimeout = setTimeout(() => {
                 savePostIts();
             }, 500); // Guardar 500ms después de la última pulsación
        }
    }

    function changePostItColor(postItId, color) {
        const postIt = postIts.find(p => p.id === postItId);
        if (!postIt) return;
        
        postIt.color = color;
        savePostIts();
        
        const postItElement = document.getElementById(`post-it-${postItId}`);
        if (postItElement) {
            postItElement.style.backgroundColor = color;
            // Podrías añadir lógica para cambiar el color del texto si el fondo es muy oscuro/claro
            // postItElement.querySelector('.post-it-content').style.color = getContrastYIQ(color);
        }
    }

    function deletePostIt(postItId) {
        const t = translations[settings.language];
        postIts = postIts.filter(p => p.id !== postItId);
        savePostIts();
        
        const postItElement = document.getElementById(`post-it-${postItId}`);
        if (postItElement) {
            postItElement.remove(); // Eliminar del DOM
        }
        
        showNotification(t.postItDeleted, 'success');
        // Re-renderizar blogs/calendar para quitar badges/tooltips si era el último post-it
        renderBlogs();
        renderCalendar();
    }

    function updateSectionSelects() {
        const t = translations[settings.language];
        const sectionSelects = [
            blogSectionSelect,
            eventSectionSelect
            // Añadir más selects si es necesario
        ];
        
        sectionSelects.forEach(select => {
             if (!select) return; // Comprobar si el select existe
             
            const currentValue = select.value; // Guardar valor actual
            
            select.innerHTML = `<option value="">${t.noSection}</option>`; // Opción default
            sections.sort((a,b) => a.name.localeCompare(b.name)); // Ordenar secciones alfabéticamente
            sections.forEach(section => {
                const option = document.createElement('option');
                option.value = section.id;
                option.textContent = section.name;
                // Option.style.color = section.color; // Podría ser útil, pero puede afectar legibilidad
                select.appendChild(option);
            });
            
            // Restaurar valor si todavía existe
            if (currentValue && sections.some(s => s.id === currentValue)) {
                select.value = currentValue;
            }
        });
    }

    function exportAllData() {
        const t = translations[settings.language];
        const data = {
            version: '1.1', // Incrementar versión si hay cambios de estructura
            exportedAt: new Date().toISOString(),
            settings,
            blogs,
            events,
            sections,
            bookmarks,
            postIts,
            widgets,
            diaryTitle: diaryTitle.value 
        };
        
        try {
            const dataStr = JSON.stringify(data, null, 2); // Indentado para legibilidad
            const blob = new Blob([dataStr], { type: 'application/json' });
            const url = URL.createObjectURL(blob);
            
            const exportFileDefaultName = `diario-backup-${new Date().toISOString().slice(0, 10)}.json`;
            
            const linkElement = document.createElement('a');
            linkElement.setAttribute('href', url);
            linkElement.setAttribute('download', exportFileDefaultName);
            document.body.appendChild(linkElement); // Necesario para Firefox
            linkElement.click();
            document.body.removeChild(linkElement); // Limpiar
            URL.revokeObjectURL(url); // Liberar memoria
            
            showNotification(t.exportSuccess, 'success');
        } catch (error) {
             console.error("Error exporting data:", error);
             showNotification(t.error + ': ' + t.exportError, 'error'); // Asumiendo que existe t.exportError
        }
    }

    function importAllData(e) {
        const t = translations[settings.language];
        const file = e.target.files[0];
        if (!file) return;
        
        if (confirm(t.importConfirmation)) {
            const reader = new FileReader();
            
            reader.onload = function(event) {
                try {
                    const importedData = JSON.parse(event.target.result);
                    
                    // --- Validaciones básicas ---
                    if (!importedData || typeof importedData !== 'object') {
                        throw new Error(t.invalidDataFile);
                    }
                    // Comprobar presencia de arrays/objetos esperados (pueden estar vacíos)
                    if (!Array.isArray(importedData.blogs) || 
                        !Array.isArray(importedData.events) ||
                        !Array.isArray(importedData.sections) ||
                        !Array.isArray(importedData.bookmarks) ||
                        !Array.isArray(importedData.postIts) ||
                        !Array.isArray(importedData.widgets) ||
                        typeof importedData.settings !== 'object' || importedData.settings === null) {
                         throw new Error(t.invalidDataFile + " (Missing core data structure)");
                    }

                    // --- Asignar datos (usando || [] para seguridad) ---
                    settings = importedData.settings; // Asignar directamente
                    blogs = importedData.blogs || [];
                    events = importedData.events || [];
                    sections = importedData.sections || [];
                    bookmarks = importedData.bookmarks || [];
                    postIts = importedData.postIts || [];
                    widgets = importedData.widgets || [];
                    if (importedData.diaryTitle) {
                        diaryTitle.value = importedData.diaryTitle;
                    } else {
                         diaryTitle.value = t.title; // Título por defecto si no viene
                    }

                    // --- Guardar todo en localStorage ---
                    saveAllData(); 
                    localStorage.setItem('diaryTitle', diaryTitle.value); // Guardar título también

                    // --- Recargar configuración y UI ---
                    loadSettings(); // Recargar selects, tema, etc.
                    
                    // Renderizar todo (ya se llama desde applyTranslations dentro de loadSettings)
                    // No es necesario llamarlos explícitamente aquí si loadSettings los llama
                    // renderCalendar();
                    // renderBlogs();
                    // ... etc ...
                    
                    showNotification(t.importSuccess, 'success');

                } catch (error) {
                    console.error('Error parsing or validating import file:', error);
                    showNotification(t.error + ': ' + (error.message || t.importError), 'error');
                } finally {
                     // Resetear input para permitir re-importar el mismo archivo
                     e.target.value = ''; 
                }
            };
            
            reader.onerror = function() {
                showNotification(t.error + ': ' + t.fileReadError, 'error');
                 e.target.value = ''; // Resetear input
            };
            
            reader.readAsText(file);
        } else {
             e.target.value = ''; // Resetear input si el usuario cancela confirmación
        }
    }

    // --- Funciones de guardado en localStorage ---
    function saveAllData() {
        saveSettings();
        saveBlogs();
        saveEvents();
        saveSections();
        saveBookmarks();
        savePostIts();
        saveWidgets();
    }

    function saveSettings() {
        localStorage.setItem('settings', JSON.stringify(settings));
    }
    function saveBlogs() {
        localStorage.setItem('blogs', JSON.stringify(blogs));
    }
    function saveEvents() {
        localStorage.setItem('events', JSON.stringify(events));
    }
    function saveSections() {
        localStorage.setItem('sections', JSON.stringify(sections));
    }
    function saveBookmarks() {
        localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    }
    function savePostIts() {
        // Filtrar timeouts antes de guardar
        const postItsToSave = postIts.map(({ saveTimeout, ...rest }) => rest);
        localStorage.setItem('postIts', JSON.stringify(postItsToSave));
    }
     function saveWidgets() {
        localStorage.setItem('widgets', JSON.stringify(widgets));
    }

    // --- Funciones de utilidad ---
    function openModal(modal) {
         if (!modal) return;
        modal.style.display = 'flex';
        document.body.style.overflow = 'hidden'; // Evitar scroll del fondo
    }

    function closeModal(modal) {
         if (!modal) return;
        modal.style.display = 'none';
        document.body.style.overflow = 'auto'; // Restaurar scroll
    }

    // --- Solution: showNotification mejorada ---
    function showNotification(message, type = 'success') {
        // Eliminar notificaciones existentes
        document.querySelectorAll('.notification').forEach(el => el.remove());

        const icons = {
            success: 'fa-check-circle',
            error: 'fa-exclamation-circle',
            warning: 'fa-exclamation-triangle'
        };
        
        // Asegurar que el mensaje no sea undefined, usar error genérico si lo es
        const displayMessage = message || translations[settings.language]?.error || 'An error occurred'; 

        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.innerHTML = `
            <i class="fas ${icons[type]}"></i>
            <span>${displayMessage}</span>
        `;
        
        document.body.appendChild(notification);
        
        // Eliminar después de 3 segundos
        setTimeout(() => {
             // Comprobar si la notificación todavía existe en el DOM antes de intentar eliminarla
            if (notification.parentNode) {
                 notification.remove();
            }
        }, 3000);
    }
    // --- Fin Solution ---

    function isValidUrl(string) {
         // Expresión regular más permisiva para URLs (puede empezar o no con http/https)
         const urlPattern = new RegExp('^(https?:\\/\\/)?'+ // Protocolo opcional
             '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // Dominio
             '((\\d{1,3}\\.){3}\\d{1,3}))'+ // O IP (v4)
             '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // Puerto y path
             '(\\?[;&a-z\\d%_.~+=-]*)?'+ // Query string
             '(\\#[-a-z\\d_]*)?$','i'); // Fragmento
         return !!urlPattern.test(string);
    }

    function generateId() {
        // Generador de ID simple (podría mejorarse para mayor unicidad)
        return Date.now().toString(36) + Math.random().toString(36).substring(2, 9);
    }

    // Iniciar la aplicación al cargar el DOM
    init();

}); // Fin del addEventListener 'DOMContentLoaded'