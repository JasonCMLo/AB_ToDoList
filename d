<% myItems.forEach( function(item, index) { %>
<div class="item">
  <input type="checkbox" />
  <p><%=item%></p>
  <div>
    <%})%> <% for (let i = 0; i < myItems.length; i++) { %>
    <div class="item">
      <input type="checkbox" />
      <p><%= myItems[i] %></p>
    </div>
    %< } %>
  </div>
</div>
