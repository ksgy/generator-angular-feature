'use strict'

angular.module('<%= scriptAppName %>', [<%= angularModules %>])<% if (ngRoute) { %>
  .config ($routeProvider) ->
    $routeProvider
      .when '/',
        templateUrl: '<%= config.view.path %>/main.html'
        controller: 'MainCtrl'
      .otherwise
        redirectTo: '/'
<% } %>