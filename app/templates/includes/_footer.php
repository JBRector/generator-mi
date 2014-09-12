    <!-- end of div id="content" -->
    </div>

    <footer>
        <p>&copy; Copyright</p>
    </footer>

    <!-- build:js(src) assets/js/site.js -->
        <% if (include_jQuery) { %><script type="text/javascript" src="assets/js/vendor/jquery.min.js"></script><% } %>
        <% if (include_Bootstrap) { %><script type="text/javascript" src="assets/js/vendor/bootstrap.js"></script><% } %>
        <% if (include_jRespond) { %><script type="text/javascript" src="assets/js/vendor/jRespond.js"></script><% } %>
        <% if (include_jPanelMenu) { %><script type="text/javascript" src="assets/js/vendor/jquery.jpanelmenu.min.js"></script><% } %>
        <% if (include_Mustache) { %><script type="text/javascript" src="assets/js/vendor/mustache.js"></script><% } %>
        <% if (include_Handlebars) { %><script type="text/javascript" src="assets/js/vendor/handlebars.js"></script><% } %>
        <% if (include_Underscore) { %><script type="text/javascript" src="assets/js/vendor/underscore.js"></script><% } %>
        <% if (include_Cookie) { %><script type="text/javascript" src="assets/js/vendor/jquery.cookie.js"></script><% } %>
        <script type="text/javascript" src="assets/js/main.js"></script>
    <!-- endbuild -->

</body>
</html>