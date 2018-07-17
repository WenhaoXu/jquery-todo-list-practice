$(document)
     .ready(function () {

        const todoForm={
            todos:[],
            statusOfList:"all"
        }

             function generateUUID() {
                 /*jshint bitwise:false */
                 var i,
                     random;
                 var uuid = '';

                 for (i = 0; i < 32; i++) {
                     random = Math.random() * 16 | 0;
                     if (i === 8 || i === 12 || i === 16 || i === 20) {
                         uuid += '-';
                     }
                     uuid += (i === 12
                         ? 4
                         : (i === 16
                         ? (random & 3 | 8)
                         : random)).toString(16);
                 }
                 return uuid;
             }

             const  buildHtml=(todoForm)=>{
                 let todoViewItem=(element)=>`<li class="${element.complete ? "checked" : ""}" 
            ondblclick="editItem(event, '${element.id}')">

                <input name="done-todo" ${element.complete ? 'checked' : ""} type="checkbox" class="done-todo" onchange="checkItem('${element.id}')"/> 
                ${element.name}
             </li>`
                 let todoList = `
                            <div>
                                <input class="input-text" type="text" name="ListItem">
                                <div id="button" onclick="addItem()">Add</div>
                            </div>
                            <br>
                            <ol>${filterByStatus(todoForm.todos, todoForm.statusOfList).map(todoViewItem).join("")}</ol>
                            <div>
                                <ul id="filters">
                                    <li>
                                        <a href="#" data-filter="all" class="${todoForm.statusOfList == "all" ? "selected" : ""}" 
                                            onclick="showTodoList('all')">ALL</a>
                                    </li>
                                    <li>
                                        <a href="#" data-filter="active" class="${todoForm.statusOfList == "active" ? "selected" : ""}" 
                                            onclick="showTodoList('active')">Active</a>
                                    </li>
                                    <li>
                                        <a href="#" data-filter="complete" class="${todoForm.statusOfList == "complete" ? "selected" : ""}" 
                                            onclick="showTodoList('complete')"">Complete</a>
                                    </li>
                                </ul>
                            </div>`;

                 return todoList;
             }


             window.addItem=(event)=>{
                 let toadd =$('input[name=ListItem]').val();
                 todoFrom.todos.push({id: generateUUID(),name:toadd,complete:false})
                render();
             }

             window.checkItem = (viewId) => {
                 let checkedItem = todoForm.todos.find(item => item.id === viewId)

                 if(checkedItem !== undefined){
                     checkedItem.complete = !checkedItem.complete;
                 }
                 render();
             }

             window.showTodoList = (filterType) => {
                 todoForm.statusOfList = filterType;
                 render();

             };

             window.editItem = (event, viewId) => {
                 $(event.target).attr('contentEditable', 'true')
                     .focus()
                     .keypress(function (event) {
                         var keycode = (event.keyCode
                             ? event.keyCode
                             : event.which);

                         if (keycode == '13') {
                             todoForm.todos.find(element => element.id === viewId).name = $(event.target).text();
                             render();
                         }

                     })
             }
         function filterByStatus(todos, status) {

             const filterExecuters = {
                 all() {
                     return true;
                 },
                 active(element) {
                     return !element.complete;
                 },
                 complete(element) {
                     return element.complete;
                 }
             }

             const result = todos.filter(filterExecuters[status]);
             return result;
         }

         const render = () => {
             $('#todoForm').html(buildHtml(todoForm));
         }

         render();
         var value = "";
     });