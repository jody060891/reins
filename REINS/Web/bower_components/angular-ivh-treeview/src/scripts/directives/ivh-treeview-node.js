
/**
 * Treeview tree node directive
 *
 * @private
 * @package ivh.treeview
 * @copyright 2014 iVantage Health Analytics, Inc.
 */

angular.module('ivh.treeview').directive('ivhTreeviewNode', ['ivhTreeviewCompiler', 'ivhTreeviewOptions', function(ivhTreeviewCompiler, ivhTreeviewOptions) {
  'use strict';
  return {
    restrict: 'A',
    scope: {
      node: '=ivhTreeviewNode',
      depth: '=ivhTreeviewDepth'
    },
    require: '^ivhTreeview',
    compile: function(tElement) {
      return ivhTreeviewCompiler
        .compile(tElement, function(scope, element, attrs, ctrl) {
          var node = scope.node;

          var getChildren = scope.getChildren = function() {
            return ctrl.children(node);
          };

          scope.ctrl = ctrl;
          scope.childDepth = scope.depth + 1;

          // Expand/collapse the node as dictated by the expandToDepth property
          ctrl.expand(node, ctrl.isInitiallyExpanded(scope.depth));

          // Set the title to the full label
          element.attr('title', ctrl.label(node));

          /**
           * @todo Provide a way to opt out of this
           */
          var watcher = scope.$watch(function() {
            return getChildren().length > 0;
          }, function(newVal) {
            if(newVal) {
              element.removeClass('ivh-treeview-node-leaf');
            } else {
              element.addClass('ivh-treeview-node-leaf');
            }
          });
        });
    },
    template: [
      '<div>',
        '<div>',
          '<span ivh-treeview-toggle="node">',
            '<span class="ivh-treeview-twistie">',
              '<span class="ivh-treeview-twistie-expanded">',
                ivhTreeviewOptions().twistieExpandedTpl,
              '</span>',
              '<span class="ivh-treeview-twistie-collapsed">',
                ivhTreeviewOptions().twistieCollapsedTpl,
              '</span>',
              '<span class="ivh-treeview-twistie-leaf">',
                ivhTreeviewOptions().twistieLeafTpl,
              '</span>',
            '</span>',
          '</span>',
          '<span ng-if="ctrl.useCheckboxes()"',
              'ivh-treeview-checkbox="node">',
          '</span>',
          '<span class="ivh-treeview-node-label" ivh-treeview-toggle>',
            '{{ctrl.label(node)}}',
          '</span>',
        '</div>',
        '<ul ng-if="getChildren().length" class="ivh-treeview">',
          '<li ng-repeat="child in getChildren()"',
              'ng-hide="ctrl.hasFilter() && !ctrl.isVisible(child)"',
              'ng-class="{\'ivh-treeview-node-collapsed\': !ctrl.isExpanded(child) && !ctrl.isLeaf(child)}"',
              'ivh-treeview-node="child"',
              'ivh-treeview-depth="childDepth">',
          '</li>',
        '</ul>',
      '</div>'
    ].join('\n')
  };
}]);

