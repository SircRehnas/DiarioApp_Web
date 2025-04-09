document.addEventListener('DOMContentLoaded', function() {
    // Variables globales
    let currentDate = new Date();
    let blogs = JSON.parse(localStorage.getItem('blogs')) || [];
    let events = JSON.parse(localStorage.getItem('events')) || [];
    let postIts = JSON.parse(localStorage.getItem('postIts')) || [];
    let sections = JSON.parse(localStorage.getItem('sections')) || [];
    let isEditingBlog = false;
    let currentBlogId = null;
    let isEditingEvent = false;
    let currentEventId = null;
    let isEditingSection = false;
    let currentSectionId = null;

    // Elementos del DOM
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
    const blogsContainer = document.getElementById('blogs-container');
    const blogModal = document.getElementById('blog-modal');
    const blogForm = document.getElementById('blog-form');
    const blogTitleInput = document.getElementById('blog-title');
    const blogContentEditable = document.getElementById('blog-content');
    const blogBgColor = document.getElementById('blog-bg-color');
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
    const addPostItBtn = document.getElementById('add-post-it');
    const currentYear = document.getElementById('current-year');
    const exportBtn = document.getElementById('export-data');
    const importBtn = document.getElementById('import-data');
    const importFileInput = document.getElementById('import-file');
    const addSectionBtn = document.getElementById('add-section');
    const sectionsContainer = document.getElementById('sections-container');
    const sectionModal = document.getElementById('section-modal');
    const sectionForm = document.getElementById('section-form');
    const sectionNameInput = document.getElementById('section-name');
    const sectionColorInput = document.getElementById('section-color');
    const sectionDescriptionInput = document.getElementById('section-description');
    const deleteSectionBtn = document.getElementById('delete-section');
    const postitModal = document.getElementById('postit-modal');
    const postitForm = document.getElementById('postit-form');
    const postitIdInput = document.getElementById('postit-id');
    const postitBlogSelect = document.getElementById('postit-blog-select');
    const postitEventSelect = document.getElementById('postit-event-select');

    // Inicialización
    updateDateTime();
    setInterval(updateDateTime, 1000);
    renderCalendar();
    renderBlogs();
    renderSections();
    renderPostIts();
    currentYear.textContent = new Date().getFullYear();
    updateSectionSelects();

    // Event listeners
    diaryTitle.addEventListener('change', function() {
        localStorage.setItem('diaryTitle', this.value);
        showNotification('Título guardado correctamente', 'success');
    });

    // Cargar título guardado
    if (localStorage.getItem('diaryTitle')) {
        diaryTitle.value = localStorage.getItem('diaryTitle');
    }

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
        showNotification('Mostrando el mes actual', 'success');
    });

    addBlogBtn.addEventListener('click', function() {
        openBlogModal();
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
        });
    });

    eventForm.addEventListener('submit', function(e) {
        e.preventDefault();
        saveEvent();
    });

    deleteEventBtn.addEventListener('click', function() {
        if (confirm('¿Estás seguro de que quieres eliminar este evento? Esta acción no se puede deshacer.')) {
            deleteEvent();
        }
    });

    addPostItBtn.addEventListener('click', function() {
        createPostIt();
    });

    exportBtn.addEventListener('click', exportData);
    importBtn.addEventListener('click', () => importFileInput.click());
    importFileInput.addEventListener('change', importData);

    addSectionBtn.addEventListener('click', function() {
        openSectionModal();
    });

    sectionForm.addEventListener('submit', function(e) {
        e.preventDefault();
        saveSection();
    });

    deleteSectionBtn.addEventListener('click', function() {
        if (confirm('¿Estás seguro de que quieres eliminar esta sección? Todos los blogs y eventos asociados perderán su referencia.')) {
            deleteSection();
        }
    });

    postitForm.addEventListener('submit', function(e) {
        e.preventDefault();
        savePostItAnchor();
    });

    // Manejar eventos de formato de texto en el editor de blogs
    document.querySelectorAll('.toolbar button').forEach(button => {
        button.addEventListener('click', function() {
            const command = this.getAttribute('data-command');
            
            if (command === 'createLink') {
                const url = prompt('Introduce la URL:');
                if (url) document.execCommand(command, false, url);
            } else if (command === 'insertImage') {
                const url = prompt('Introduce la URL de la imagen:');
                if (url) document.execCommand(command, false, url);
            } else {
                document.execCommand(command, false, null);
            }
            
            blogContentEditable.focus();
        });
    });

    // Funciones
    function updateDateTime() {
        const now = new Date();
        const options = { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
        };
        
        currentDateTime.textContent = now.toLocaleDateString('es-ES', options);
        currentUTCDateTime.textContent = `UTC: ${now.toUTCString()}`;
    }

    function renderCalendar() {
        // Actualizar el título del mes y año
        const monthNames = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
                           "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
        currentMonthYear.textContent = `${monthNames[currentDate.getMonth()]} ${currentDate.getFullYear()}`;
        
        // Actualizar el selector de mes
        const year = currentDate.getFullYear();
        const month = String(currentDate.getMonth() + 1).padStart(2, '0');
        monthPicker.value = `${year}-${month}`;
        
        // Limpiar el calendario
        calendarDays.innerHTML = '';
        
        // Obtener el primer día del mes y el último día del mes
        const firstDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
        const lastDay = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
        
        // Obtener el día de la semana del primer día (0 = Domingo, 6 = Sábado)
        const firstDayIndex = firstDay.getDay();
        
        // Obtener el día de hoy para resaltarlo
        const today = new Date();
        const isCurrentMonth = today.getFullYear() === currentDate.getFullYear() && 
                              today.getMonth() === currentDate.getMonth();
        
        // Añadir días vacíos para alinear el primer día
        for (let i = 0; i < firstDayIndex; i++) {
            const emptyDay = document.createElement('div');
            emptyDay.classList.add('calendar-day', 'empty');
            calendarDays.appendChild(emptyDay);
        }
        
        // Añadir los días del mes
        for (let i = 1; i <= lastDay.getDate(); i++) {
            const dayElement = document.createElement('div');
            dayElement.classList.add('calendar-day');
            
            // Verificar si es hoy
            if (isCurrentMonth && i === today.getDate()) {
                dayElement.classList.add('today');
            }
            
            // Añadir el número del día
            const dayNumber = document.createElement('div');
            dayNumber.classList.add('day-number');
            dayNumber.textContent = i;
            dayElement.appendChild(dayNumber);
            
            // Añadir eventos para este día
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
                
                // Verificar si hay post-its asociados a este evento
                const eventPostIts = postIts.filter(p => p.anchorType === 'event' && p.anchorId === event.id);
                if (eventPostIts.length > 0) {
                    eventElement.classList.add('has-postits');
                    eventElement.innerHTML += ` <span class="postit-badge">📝 ${eventPostIts.length}</span>`;
                    
                    // Tooltip con los post-its
                    const tooltip = document.createElement('div');
                    tooltip.className = 'event-tooltip';
                    tooltip.innerHTML = eventPostIts.map(p => `<div>${p.content || 'Post-it sin contenido'}</div>`).join('');
                    eventElement.appendChild(tooltip);
                    
                    eventElement.addEventListener('mouseenter', () => {
                        tooltip.style.display = 'block';
                    });
                    
                    eventElement.addEventListener('mouseleave', () => {
                        tooltip.style.display = 'none';
                    });
                }
                
                eventElement.addEventListener('click', (e) => {
                    e.stopPropagation();
                    openEventModal(event.id);
                });
                dayElement.appendChild(eventElement);
            });
            
            // Añadir botón para agregar evento
            const addEventBtn = document.createElement('button');
            addEventBtn.classList.add('add-event');
            addEventBtn.innerHTML = '<i class="fas fa-plus"></i>';
            addEventBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                const dateStr = new Date(currentDate.getFullYear(), currentDate.getMonth(), i).toISOString();
                openEventModal(null, dateStr);
            });
            dayElement.appendChild(addEventBtn);
            
            calendarDays.appendChild(dayElement);
        }
    }

    function renderBlogs() {
        blogsContainer.innerHTML = '';
        
        if (blogs.length === 0) {
            blogsContainer.innerHTML = '<p style="grid-column: 1 / -1; text-align: center; color: var(--secondary-color);">No hay blogs todavía. Crea tu primer blog haciendo clic en "Nuevo Blog".</p>';
            return;
        }
        
        blogs.forEach(blog => {
            const blogCard = document.createElement('div');
            blogCard.classList.add('blog-card');
            blogCard.style.backgroundColor = blog.bgColor || '#ffffff';
            
            // Obtener información de la sección si existe
            let sectionInfo = '';
            if (blog.sectionId) {
                const section = sections.find(s => s.id === blog.sectionId);
                if (section) {
                    sectionInfo = `<div class="blog-section" style="color: ${section.color}">${section.name}</div>`;
                }
            }
            
            // Verificar si hay post-its asociados a este blog
            const blogPostIts = postIts.filter(p => p.anchorType === 'blog' && p.anchorId === blog.id);
            const postItBadge = blogPostIts.length > 0 ? 
                `<span class="postit-badge">📝 ${blogPostIts.length}</span>` : '';
            
            blogCard.innerHTML = `
                <h3 class="blog-title">${blog.title} ${postItBadge}</h3>
                ${sectionInfo}
                <div class="blog-date">${new Date(blog.date).toLocaleString('es-ES')}</div>
                <div class="blog-content">${blog.content}</div>
                <div class="blog-actions">
                    <button class="edit-blog" data-id="${blog.id}"><i class="fas fa-edit"></i> Editar</button>
                    <button class="delete-blog" data-id="${blog.id}"><i class="fas fa-trash"></i> Eliminar</button>
                </div>
            `;
            
            // Agregar tooltip con post-its si existen
            if (blogPostIts.length > 0) {
                const tooltip = document.createElement('div');
                tooltip.className = 'blog-tooltip';
                tooltip.innerHTML = blogPostIts.map(p => `<div>${p.content || 'Post-it sin contenido'}</div>`).join('');
                blogCard.appendChild(tooltip);
                
                blogCard.addEventListener('mouseenter', () => {
                    tooltip.style.display = 'block';
                });
                
                blogCard.addEventListener('mouseleave', () => {
                    tooltip.style.display = 'none';
                });
            }
            
            blogsContainer.appendChild(blogCard);
        });
        
        // Agregar event listeners a los botones de editar/eliminar
        document.querySelectorAll('.edit-blog').forEach(btn => {
            btn.addEventListener('click', function() {
                const blogId = this.getAttribute('data-id');
                openBlogModal(blogId);
            });
        });
        
        document.querySelectorAll('.delete-blog').forEach(btn => {
            btn.addEventListener('click', function() {
                const blogId = this.getAttribute('data-id');
                if (confirm('¿Estás seguro de que quieres eliminar este blog? Esta acción no se puede deshacer.')) {
                    deleteBlog(blogId);
                }
            });
        });
    }

    function renderSections() {
        sectionsContainer.innerHTML = '';
        
        if (sections.length === 0) {
            sectionsContainer.innerHTML = '<p style="grid-column: 1 / -1; text-align: center; color: var(--secondary-color);">No hay secciones todavía. Crea tu primera sección haciendo clic en "Nueva Sección".</p>';
            return;
        }
        
        sections.forEach(section => {
            const sectionCard = document.createElement('div');
            sectionCard.classList.add('section-card');
            sectionCard.style.borderLeft = `5px solid ${section.color}`;
            
            // Contar blogs y eventos en esta sección
            const blogsInSection = blogs.filter(b => b.sectionId === section.id).length;
            const eventsInSection = events.filter(e => e.sectionId === section.id).length;
            
            sectionCard.innerHTML = `
                <h3 class="section-name" style="color: ${section.color}">${section.name}</h3>
                <div class="section-description">${section.description || 'Sin descripción'}</div>
                <div class="section-stats">
                    <span>Blogs: ${blogsInSection}</span>
                    <span>Eventos: ${eventsInSection}</span>
                </div>
                <div class="section-actions">
                    <button class="edit-section" data-id="${section.id}"><i class="fas fa-edit"></i> Editar</button>
                    <button class="delete-section" data-id="${section.id}"><i class="fas fa-trash"></i> Eliminar</button>
                </div>
            `;
            
            sectionsContainer.appendChild(sectionCard);
        });
        
        // Agregar event listeners a los botones de editar/eliminar
        document.querySelectorAll('.edit-section').forEach(btn => {
            btn.addEventListener('click', function() {
                const sectionId = this.getAttribute('data-id');
                openSectionModal(sectionId);
            });
        });
        
        document.querySelectorAll('.delete-section').forEach(btn => {
            btn.addEventListener('click', function() {
                const sectionId = this.getAttribute('data-id');
                if (confirm('¿Estás seguro de que quieres eliminar esta sección? Todos los blogs y eventos asociados perderán su referencia.')) {
                    deleteSection(sectionId);
                }
            });
        });
    }

    function renderPostIts() {
        // Eliminar post-its existentes (excepto el botón flotante)
        document.querySelectorAll('.post-it-container').forEach(el => {
            if (el.id !== 'add-post-it') el.remove();
        });
        
        postIts.forEach(postIt => {
            // Solo renderizar post-its que no estén anclados o estén anclados pero no tengamos su elemento padre
            if (!postIt.anchorType || 
                (postIt.anchorType === 'blog' && !document.querySelector(`.blog-card[data-id="${postIt.anchorId}"]`)) ||
                (postIt.anchorType === 'event' && !document.querySelector(`.event[data-id="${postIt.anchorId}"]`))) {
                renderPostIt(postIt);
            }
        });
    }

    function renderPostIt(postIt) {
        const postItElement = document.createElement('div');
        postItElement.className = 'post-it-container';
        postItElement.id = `post-it-${postIt.id}`;
        postItElement.style.backgroundColor = postIt.color;
        postItElement.style.left = `${postIt.position.x}px`;
        postItElement.style.top = `${postIt.position.y}px`;
        postItElement.dataset.id = postIt.id;
        
        postItElement.innerHTML = `
            <div class="post-it-actions">
                <button class="post-it-action anchor-postit" data-id="${postIt.id}" title="Anclar"><i class="fas fa-thumbtack"></i></button>
                <button class="post-it-action change-color" data-id="${postIt.id}" title="Cambiar color"><i class="fas fa-palette"></i></button>
                <button class="post-it-action delete-post-it" data-id="${postIt.id}" title="Eliminar"><i class="fas fa-trash"></i></button>
            </div>
            <textarea class="post-it-content" placeholder="Escribe aquí...">${postIt.content}</textarea>
        `;
        
        document.body.appendChild(postItElement);
        
        // Hacer el post-it arrastrable
        makeDraggable(postItElement, postIt.id);
        
        // Event listeners para acciones
        postItElement.querySelector('.post-it-content').addEventListener('input', function() {
            updatePostItContent(postIt.id, this.value);
        });
        
        postItElement.querySelector('.change-color').addEventListener('click', function(e) {
            e.stopPropagation();
            changePostItColor(postIt.id);
        });
        
        postItElement.querySelector('.delete-post-it').addEventListener('click', function(e) {
            e.stopPropagation();
            if (confirm('¿Estás seguro de que quieres eliminar este Post-it?')) {
                deletePostIt(postIt.id);
            }
        });
        
        postItElement.querySelector('.anchor-postit').addEventListener('click', function(e) {
            e.stopPropagation();
            openPostItModal(postIt.id);
        });
    }

    function openBlogModal(blogId = null) {
        if (blogId) {
            // Modo edición
            const blog = blogs.find(b => b.id === blogId);
            if (!blog) return;
            
            blogTitleInput.value = blog.title;
            blogContentEditable.innerHTML = blog.content;
            blogBgColor.value = blog.bgColor || '#ffffff';
            modalTitle.textContent = 'Editar Blog';
            isEditingBlog = true;
            currentBlogId = blogId;
            
            // Establecer sección si existe
            if (blog.sectionId) {
                blogSectionSelect.value = blog.sectionId;
            } else {
                blogSectionSelect.value = '';
            }
        } else {
            // Modo nuevo
            blogTitleInput.value = '';
            blogContentEditable.innerHTML = '';
            blogBgColor.value = '#ffffff';
            modalTitle.textContent = 'Nuevo Blog';
            isEditingBlog = false;
            currentBlogId = null;
            blogSectionSelect.value = '';
        }
        
        openModal(blogModal);
        blogTitleInput.focus();
    }

    function saveBlog() {
        const title = blogTitleInput.value.trim();
        const content = blogContentEditable.innerHTML;
        const bgColor = blogBgColor.value;
        const sectionId = blogSectionSelect.value || null;
        
        if (!title) {
            showNotification('Por favor, introduce un título para el blog.', 'error');
            blogTitleInput.focus();
            return;
        }
        
        if (content.length < 10) {
            showNotification('El contenido del blog es demasiado corto.', 'error');
            blogContentEditable.focus();
            return;
        }
        
        if (isEditingBlog) {
            // Actualizar blog existente
            const index = blogs.findIndex(b => b.id === currentBlogId);
            if (index !== -1) {
                blogs[index] = {
                    ...blogs[index],
                    title,
                    content,
                    bgColor,
                    sectionId,
                    date: new Date().toISOString()
                };
                showNotification('Blog actualizado correctamente', 'success');
            }
        } else {
            // Crear nuevo blog
            const newBlog = {
                id: generateId(),
                title,
                content,
                bgColor,
                sectionId,
                date: new Date().toISOString()
            };
            blogs.unshift(newBlog);
            showNotification('Blog creado correctamente', 'success');
        }
        
        localStorage.setItem('blogs', JSON.stringify(blogs));
        closeModal(blogModal);
        renderBlogs();
        updateSectionSelects();
    }

    function deleteBlog(blogId) {
        blogs = blogs.filter(blog => blog.id !== blogId);
        
        // Eliminar post-its asociados a este blog
        postIts = postIts.filter(p => !(p.anchorType === 'blog' && p.anchorId === blogId));
        
        localStorage.setItem('blogs', JSON.stringify(blogs));
        localStorage.setItem('postIts', JSON.stringify(postIts));
        
        showNotification('Blog eliminado correctamente', 'success');
        renderBlogs();
        renderPostIts();
    }

    function openEventModal(eventId = null, dateStr = null) {
        if (eventId) {
            // Modo edición
            const event = events.find(e => e.id === eventId);
            if (!event) return;
            
            eventTitleInput.value = event.title;
            eventDescriptionInput.value = event.description || '';
            eventColorInput.value = event.color;
            eventDateInput.value = event.date;
            document.getElementById('event-modal-title').textContent = 'Editar Evento';
            deleteEventBtn.style.display = 'block';
            isEditingEvent = true;
            currentEventId = eventId;
            
            // Establecer sección si existe
            if (event.sectionId) {
                eventSectionSelect.value = event.sectionId;
            } else {
                eventSectionSelect.value = '';
            }
        } else {
            // Modo nuevo
            eventTitleInput.value = '';
            eventDescriptionInput.value = '';
            eventColorInput.value = '#0071e3';
            eventDateInput.value = dateStr || new Date().toISOString();
            document.getElementById('event-modal-title').textContent = 'Nuevo Evento';
            deleteEventBtn.style.display = 'none';
            isEditingEvent = false;
            currentEventId = null;
            eventSectionSelect.value = '';
        }
        
        openModal(eventModal);
        eventTitleInput.focus();
    }

    function saveEvent() {
        const title = eventTitleInput.value.trim();
        const description = eventDescriptionInput.value;
        const color = eventColorInput.value;
        const date = eventDateInput.value;
        const sectionId = eventSectionSelect.value || null;
        
        if (!title) {
            showNotification('Por favor, introduce un título para el evento.', 'error');
            eventTitleInput.focus();
            return;
        }
        
        if (isEditingEvent) {
            // Actualizar evento existente
            const index = events.findIndex(e => e.id === currentEventId);
            if (index !== -1) {
                events[index] = {
                    ...events[index],
                    title,
                    description,
                    color,
                    date,
                    sectionId
                };
                showNotification('Evento actualizado correctamente', 'success');
            }
        } else {
            // Crear nuevo evento
            const newEvent = {
                id: generateId(),
                title,
                description,
                color,
                date,
                sectionId
            };
            events.push(newEvent);
            showNotification('Evento creado correctamente', 'success');
        }
        
        localStorage.setItem('events', JSON.stringify(events));
        closeModal(eventModal);
        renderCalendar();
        updateSectionSelects();
    }

    function deleteEvent() {
        events = events.filter(event => event.id !== currentEventId);
        
        // Eliminar post-its asociados a este evento
        postIts = postIts.filter(p => !(p.anchorType === 'event' && p.anchorId === currentEventId));
        
        localStorage.setItem('events', JSON.stringify(events));
        localStorage.setItem('postIts', JSON.stringify(postIts));
        
        showNotification('Evento eliminado correctamente', 'success');
        closeModal(eventModal);
        renderCalendar();
        renderPostIts();
    }

    function openSectionModal(sectionId = null) {
        if (sectionId) {
            // Modo edición
            const section = sections.find(s => s.id === sectionId);
            if (!section) return;
            
            sectionNameInput.value = section.name;
            sectionColorInput.value = section.color;
            sectionDescriptionInput.value = section.description || '';
            document.getElementById('section-modal-title').textContent = 'Editar Sección';
            deleteSectionBtn.style.display = 'block';
            isEditingSection = true;
            currentSectionId = sectionId;
        } else {
            // Modo nuevo
            sectionNameInput.value = '';
            sectionColorInput.value = '#0071e3';
            sectionDescriptionInput.value = '';
            document.getElementById('section-modal-title').textContent = 'Nueva Sección';
            deleteSectionBtn.style.display = 'none';
            isEditingSection = false;
            currentSectionId = null;
        }
        
        openModal(sectionModal);
        sectionNameInput.focus();
    }

    function saveSection() {
        const name = sectionNameInput.value.trim();
        const color = sectionColorInput.value;
        const description = sectionDescriptionInput.value;
        
        if (!name) {
            showNotification('Por favor, introduce un nombre para la sección.', 'error');
            sectionNameInput.focus();
            return;
        }
        
        if (isEditingSection) {
            // Actualizar sección existente
            const index = sections.findIndex(s => s.id === currentSectionId);
            if (index !== -1) {
                sections[index] = {
                    ...sections[index],
                    name,
                    color,
                    description
                };
                showNotification('Sección actualizada correctamente', 'success');
            }
        } else {
            // Crear nueva sección
            const newSection = {
                id: generateId(),
                name,
                color,
                description
            };
            sections.push(newSection);
            showNotification('Sección creada correctamente', 'success');
        }
        
        localStorage.setItem('sections', JSON.stringify(sections));
        closeModal(sectionModal);
        renderSections();
        updateSectionSelects();
    }

    function deleteSection(sectionId = null) {
        const idToDelete = sectionId || currentSectionId;
        
        // Eliminar referencia de sección en blogs y eventos
        blogs = blogs.map(blog => {
            if (blog.sectionId === idToDelete) {
                return { ...blog, sectionId: null };
            }
            return blog;
        });
        
        events = events.map(event => {
            if (event.sectionId === idToDelete) {
                return { ...event, sectionId: null };
            }
            return event;
        });
        
        // Eliminar la sección
        sections = sections.filter(section => section.id !== idToDelete);
        
        localStorage.setItem('sections', JSON.stringify(sections));
        localStorage.setItem('blogs', JSON.stringify(blogs));
        localStorage.setItem('events', JSON.stringify(events));
        
        showNotification('Sección eliminada correctamente', 'success');
        closeModal(sectionModal);
        renderSections();
        renderBlogs();
        renderCalendar();
        updateSectionSelects();
    }

    function createPostIt() {
        const postIt = {
            id: generateId(),
            content: '',
            color: '#fffd75',
            position: { x: 100, y: 100 },
            anchorType: null,
            anchorId: null
        };
        
        postIts.push(postIt);
        localStorage.setItem('postIts', JSON.stringify(postIts));
        renderPostIt(postIt);
        showNotification('Post-it creado. Arrástralo para moverlo.', 'success');
    }

    function openPostItModal(postItId) {
        const postIt = postIts.find(p => p.id === postItId);
        if (!postIt) return;
        
        postitIdInput.value = postItId;
        
        // Actualizar opciones de blogs
        postitBlogSelect.innerHTML = '<option value="">Seleccionar blog</option>';
        blogs.forEach(blog => {
            const option = document.createElement('option');
            option.value = blog.id;
            option.textContent = blog.title;
            if (postIt.anchorType === 'blog' && postIt.anchorId === blog.id) {
                option.selected = true;
            }
            postitBlogSelect.appendChild(option);
        });
        
        // Actualizar opciones de eventos
        postitEventSelect.innerHTML = '<option value="">Seleccionar evento</option>';
        events.forEach(event => {
            const option = document.createElement('option');
            option.value = event.id;
            option.textContent = `${event.title} (${new Date(event.date).toLocaleDateString()})`;
            if (postIt.anchorType === 'event' && postIt.anchorId === event.id) {
                option.selected = true;
            }
            postitEventSelect.appendChild(option);
        });
        
        // Establecer selección actual
        if (postIt.anchorType === 'blog') {
            document.getElementById('postit-blog').checked = true;
            postitBlogSelect.disabled = false;
        } else if (postIt.anchorType === 'event') {
            document.getElementById('postit-event').checked = true;
            postitEventSelect.disabled = false;
        } else {
            document.getElementById('postit-none').checked = true;
        }
        
        // Event listeners para los radios
        document.querySelectorAll('input[name="postit-anchor"]').forEach(radio => {
            radio.addEventListener('change', function() {
                postitBlogSelect.disabled = this.value !== 'blog';
                postitEventSelect.disabled = this.value !== 'event';
            });
        });
        
        openModal(postitModal);
    }

    function savePostItAnchor() {
        const postItId = postitIdInput.value;
        const postIt = postIts.find(p => p.id === postItId);
        if (!postIt) return;
        
        const anchorType = document.querySelector('input[name="postit-anchor"]:checked').value;
        
        if (anchorType === 'none') {
            postIt.anchorType = null;
            postIt.anchorId = null;
        } else if (anchorType === 'blog') {
            const blogId = postitBlogSelect.value;
            if (!blogId) return;
            
            postIt.anchorType = 'blog';
            postIt.anchorId = blogId;
        } else if (anchorType === 'event') {
            const eventId = postitEventSelect.value;
            if (!eventId) return;
            
            postIt.anchorType = 'event';
            postIt.anchorId = eventId;
        }
        
        localStorage.setItem('postIts', JSON.stringify(postIts));
        closeModal(postitModal);
        renderPostIts();
        renderBlogs();
        renderCalendar();
        showNotification('Post-it anclado correctamente', 'success');
    }

    function makeDraggable(element, postItId) {
        let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
        let isDragging = false;
        
        element.onmousedown = dragMouseDown;
        
        function dragMouseDown(e) {
            e = e || window.event;
            e.preventDefault();
            
            // Si el clic fue en un botón de acción, no iniciar el arrastre
            if (e.target.closest('.post-it-action')) {
                return;
            }
            
            // Obtener la posición del ratón al inicio
            pos3 = e.clientX;
            pos4 = e.clientY;
            
            document.onmouseup = closeDragElement;
            document.onmousemove = elementDrag;
        }
        
        function elementDrag(e) {
            e = e || window.event;
            e.preventDefault();
            
            isDragging = true;
            
            // Calcular la nueva posición
            pos1 = pos3 - e.clientX;
            pos2 = pos4 - e.clientY;
            pos3 = e.clientX;
            pos4 = e.clientY;
            
            // Establecer la nueva posición
            element.style.top = (element.offsetTop - pos2) + "px";
            element.style.left = (element.offsetLeft - pos1) + "px";
            
            // Actualizar la posición en el almacenamiento
            const postIt = postIts.find(p => p.id === postItId);
            if (postIt) {
                postIt.position = {
                    x: element.offsetLeft,
                    y: element.offsetTop
                };
                localStorage.setItem('postIts', JSON.stringify(postIts));
            }
        }
        
        function closeDragElement() {
            // Detener el movimiento
            document.onmouseup = null;
            document.onmousemove = null;
            
            // Si fue un arrastre (no un clic), prevenir la acción por defecto
            if (isDragging) {
                isDragging = false;
                return false;
            }
        }
    }

    function updatePostItContent(postItId, content) {
        const postIt = postIts.find(p => p.id === postItId);
        if (postIt) {
            postIt.content = content;
            localStorage.setItem('postIts', JSON.stringify(postIts));
        }
    }

    function changePostItColor(postItId) {
        const postIt = postIts.find(p => p.id === postItId);
        if (!postIt) return;
        
        const newColor = prompt("Introduce un color hexadecimal (ej. #fffd75):", postIt.color);
        if (newColor && /^#[0-9A-F]{6}$/i.test(newColor)) {
            postIt.color = newColor;
            localStorage.setItem('postIts', JSON.stringify(postIts));
            
            const postItElement = document.getElementById(`post-it-${postItId}`);
            if (postItElement) {
                postItElement.style.backgroundColor = newColor;
                showNotification('Color del Post-it actualizado', 'success');
            }
        } else if (newColor !== null) {
            showNotification("Por favor, introduce un color hexadecimal válido (ej. #fffd75).", 'error');
        }
    }

    function deletePostIt(postItId) {
        postIts = postIts.filter(p => p.id !== postItId);
        localStorage.setItem('postIts', JSON.stringify(postIts));
        
        const postItElement = document.getElementById(`post-it-${postItId}`);
        if (postItElement) {
            postItElement.remove();
        }
        
        showNotification('Post-it eliminado', 'success');
    }

    function updateSectionSelects() {
        // Actualizar selectores de sección en todos los modales
        const sectionSelects = [
            blogSectionSelect,
            eventSectionSelect
        ];
        
        sectionSelects.forEach(select => {
            // Guardar el valor actual
            const currentValue = select.value;
            
            // Limpiar y agregar opciones
            select.innerHTML = '<option value="">Sin sección</option>';
            sections.forEach(section => {
                const option = document.createElement('option');
                option.value = section.id;
                option.textContent = section.name;
                option.style.color = section.color;
                select.appendChild(option);
            });
            
            // Restaurar el valor si todavía existe
            if (currentValue && sections.some(s => s.id === currentValue)) {
                select.value = currentValue;
            }
        });
    }

    function exportData() {
        const data = {
            blogs,
            events,
            postIts,
            sections,
            diaryTitle: diaryTitle.value
        };
        
        const dataStr = JSON.stringify(data, null, 2);
        const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
        
        const exportFileDefaultName = `diario-backup-${new Date().toISOString().slice(0, 10)}.json`;
        
        const linkElement = document.createElement('a');
        linkElement.setAttribute('href', dataUri);
        linkElement.setAttribute('download', exportFileDefaultName);
        linkElement.click();
        
        showNotification('Datos exportados correctamente', 'success');
    }

    function importData(e) {
        const file = e.target.files[0];
        if (!file) return;
        
        if (confirm('¿Estás seguro de que quieres importar datos? Esto sobrescribirá tu diario actual.')) {
            const reader = new FileReader();
            
            reader.onload = function(e) {
                try {
                    const data = JSON.parse(e.target.result);
                    
                    // Validar datos básicos
                    if (!data.blogs || !data.events || !data.postIts || !data.sections) {
                        throw new Error('El archivo no contiene datos válidos del diario');
                    }
                    
                    // Asignar datos
                    blogs = data.blogs;
                    events = data.events;
                    postIts = data.postIts;
                    sections = data.sections;
                    
                    if (data.diaryTitle) {
                        diaryTitle.value = data.diaryTitle;
                        localStorage.setItem('diaryTitle', data.diaryTitle);
                    }
                    
                    // Guardar en localStorage
                    localStorage.setItem('blogs', JSON.stringify(blogs));
                    localStorage.setItem('events', JSON.stringify(events));
                    localStorage.setItem('postIts', JSON.stringify(postIts));
                    localStorage.setItem('sections', JSON.stringify(sections));
                    
                    // Renderizar todo
                    renderCalendar();
                    renderBlogs();
                    renderSections();
                    renderPostIts();
                    updateSectionSelects();
                    
                    showNotification('Datos importados correctamente', 'success');
                } catch (error) {
                    console.error('Error al importar datos:', error);
                    showNotification('Error al importar datos: ' + error.message, 'error');
                }
            };
            
            reader.readAsText(file);
        }
        
        // Resetear el input para permitir la misma selección de archivo otra vez
        e.target.value = '';
    }

    function openModal(modal) {
        modal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    }

    function closeModal(modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }

    function showNotification(message, type = 'success') {
        // Eliminar notificaciones existentes
        document.querySelectorAll('.notification').forEach(el => el.remove());
        
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.innerHTML = `
            <i class="fas ${type === 'success' ? 'fa-check-circle' : 
                          type === 'error' ? 'fa-exclamation-circle' : 
                          'fa-info-circle'}"></i>
            <span>${message}</span>
        `;
        
        document.body.appendChild(notification);
        
        // Eliminar después de la animación
        setTimeout(() => {
            notification.remove();
        }, 3000);
    }

    function generateId() {
        return Date.now().toString(36) + Math.random().toString(36).substr(2);
    }
});