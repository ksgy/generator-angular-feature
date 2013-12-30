'use strict'

angular.module('<%= scriptAppName %>', [<%= angularModules %>])<% if (ngRoute) { %>
  .config ($routeProvider) ->
    $routeProvider
      .when '/',
        templateUrl: '<%= config.view.appPath.replace(/\{\{feature\}\}/, config.common.path) %>/main.html'
        controller: 'MainCtrl'
      .otherwise
        redirectTo: '/'
<% } %>