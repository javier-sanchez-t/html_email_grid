var app = angular.module('gridApp', []);
app.controller('GridController', function ($scope, $sce) {

  $scope.columns = 0;
  $scope.rows = 0;
  $scope.containerSize = 0;
  $scope.skeleton = "";
  $scope.htmlSkeleton = "";

  var editor = ace.edit("editor");
    editor.setTheme("ace/theme/monokai");
    editor.getSession().setMode("ace/mode/javascript");
    

  $scope.getRandomColor = function () {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }

    return color;
  }


  $scope.generateGrid = function () {
    var rows = "";
    var columns = "";
    var columnSize = 0;
    columnSize = Math.floor($scope.containerSize / $scope.columns);

    var color = "";
    color = $scope.getRandomColor();

    //Creates columns
    if ($scope.columns >= 1) {
      columns = "<table bgcolor=\"" + color + "\" align=\"left\" width=\"" + columnSize + "\" style=\"width: " + columnSize + "px;\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" class=\"w100pct\"> \n" +
        "<tr> \n" +
        "<td align=\"center\" width=\"" + columnSize + "\" style=\"width: " + columnSize + "px;\" class=\"w100pct\"> \n" +
        "COLUMN 1 \n" +
        "</td> \n" +
        "</tr> \n" +
        "</table> \n\n";
    }

    for (var c = 2; c <= $scope.columns; c++) {
      color = $scope.getRandomColor();
      columns +=
        "<!--[if (gte mso 9)|(IE)]> \n" +
        "</td> \n" +
        "<td valign='top'> \n" +
        "<![endif]--> \n\n" +
        "<table bgcolor=\"" + color + "\" align=\"left\" width=\"" + columnSize + "\" style=\"width: " + columnSize + "px;\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" class=\"w100pct\"> \n" +
        "<tr> \n" +
        "<td align=\"center\" width=\"" + columnSize + "\" style=\"width: " + columnSize + "px;\" class=\"w100pct\"> \n" +
        "COLUMN " + c + " \n" +
        "</td> \n" +
        "</tr> \n" +
        "</table> \n\n";
    }

    //Creates rows
    for (var i = 1; i <= $scope.rows; i++) {
      rows += "<!-- row " + i + "-->\n" +
        "<tr>\n" +
        "<td class=\"w100pct\" align=\"center\">\n\n" +
        columns +
        "</td>\n" +
        "</tr>\n" +
        "<!-- end of row " + i + "-->\n\n";
    }

    $scope.skeleton = "<table width=\"" + $scope.containerSize + "\" " +
      "style=\"width: " + $scope.containerSize + "px;\" " +
      "cellpadding=\"0\" " +
      "cellspacing=\"0\" " +
      "border=\"0\" " +
      "align=\"center\" " +
      "class=\"w100pct\"> \n\n" +
      rows +
      "</table>";

    $scope.htmlSkeleton = $sce.trustAsHtml($scope.skeleton);

   
    editor.session.setValue($scope.skeleton);     
  }

});

