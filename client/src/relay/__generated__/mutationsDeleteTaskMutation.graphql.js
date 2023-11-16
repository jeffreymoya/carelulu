/**
 * @generated SignedSource<<d2aa29d043de412193b6b055fef3c462>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* eslint-disable */

'use strict';

var node = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "taskId"
  }
],
v1 = [
  {
    "alias": null,
    "args": [
      {
        "kind": "Variable",
        "name": "id",
        "variableName": "taskId"
      }
    ],
    "kind": "ScalarField",
    "name": "deleteTask",
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "mutationsDeleteTaskMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "mutationsDeleteTaskMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "b5f83231bdccbdbaa7a8e69a1141c548",
    "id": null,
    "metadata": {},
    "name": "mutationsDeleteTaskMutation",
    "operationKind": "mutation",
    "text": "mutation mutationsDeleteTaskMutation(\n  $taskId: ID!\n) {\n  deleteTask(id: $taskId)\n}\n"
  }
};
})();

node.hash = "af35dd17957228893a117b7467888e9f";

module.exports = node;
