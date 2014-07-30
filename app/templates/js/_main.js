$(function() {
<% if (include_jRespond) { %>
    // Initialize jRespond and set mobile breakpoint at 760px
    // Usage: https://github.com/ten1seven/jRespond
    var jRes = jRespond([
        {
            label: 'mobile', // add custom name
            enter: 0,
            exit: 760 // change to mobile breakpoint
        }
    ]);

    // Add functionality for each breakpoint
    jRes.addFunc({
        breakpoint: 'mobile',
        enter: function() {
            // stuff to do when within the 'mobile' range, such as start jPanelMenu
            <% if (include_jPanelMenu) { %>jPM.on();<% } %>
        },
        exit: function() {
            // stuff to do when exiting the 'mobile' range, such as removing jPanelMenu
            <% if (include_jPanelMenu) { %>jPM.off();<% } %>
        }
    });
<% } %>
<% if (include_jPanelMenu) { %>
    // Initialize the jPanelMenu
    // Usage: http://jpanelmenu.com/
    var jPM = $.jPanelMenu({
        menu: '', // selector that contains your navigation
        trigger: '', //selector that triggers the panel to open
        afterOn: function() {
            // Stuff to do after jPanelMenu is initialized - remove if not needed
        },
        beforeOpen: function() {
            // Stuff to do before jPanelMenu opens - remove if not needed
        },
        afterOpen: function() {
            // Stuff to do after jPanelMenu opens - remove if not needed
        },
        afterClose: function() {
            // Stuff to do after jPanelMenu closes - remove if not needed
        }
    });
<% } %>
});