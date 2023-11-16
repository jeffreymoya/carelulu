/**
 * @generated SignedSource<<fcd86775a704c8c926b74e84f183cbdc>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* eslint-disable */

'use strict';

var node = (function(){
var v0 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "done"
},
v1 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "name"
},
v2 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "taskId"
},
v3 = [
  {
    "alias": null,
    "args": [
      {
        "kind": "Variable",
        "name": "done",
        "variableName": "done"
      },
      {
        "kind": "Variable",
        "name": "id",
        "variableName": "taskId"
      },
      {
        "kind": "Variable",
        "name": "name",
        "variableName": "name"
      }
    ],
    "concreteType": "Task",
    "kind": "LinkedField",
    "name": "updateTask",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "id",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "name",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "done",
        "storageKey": null
      }
    ],
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": [
      (v0/*: any*/),
      (v1/*: any*/),
      (v2/*: any*/)
    ],
    "kind": "Fragment",
    "metadata": null,
    "name": "mutationsUpdateTaskMutation",
    "selections": (v3/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [
      (v2/*: any*/),
      (v1/*: any*/),
      (v0/*: any*/)
    ],
    "kind": "Operation",
    "name": "mutationsUpdateTaskMutation",
    "selections": (v3/*: any*/)
  },
  "params": {
    "cacheID": "f46526816f5db8d21542d380353608b3",
    "id": null,
    "metadata": {},
    "name": "mutationsUpdateTaskMutation",
    "operationKind": "mutation",
    "text": "mutation mutationsUpdateTaskMutation(\n  $taskId: ID!\n  $name: String\n  $done: Boolean\n) {\n  updateTask(id: $taskId, name: $name, done: $done) {\n    id\n    name\n    done\n  }\n}\n"
  }
};
})();

node.hash = "4d4dd4d4a7f090fdcd07d71540e5fe4f";

module.exports = node;
