/**
 * @generated SignedSource<<f9ae9b01b2e3d648501ec3ec6ca44c2f>>
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
    "name": "name"
  },
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "userId"
  }
],
v1 = [
  {
    "alias": null,
    "args": [
      {
        "kind": "Variable",
        "name": "name",
        "variableName": "name"
      },
      {
        "kind": "Variable",
        "name": "userId",
        "variableName": "userId"
      }
    ],
    "concreteType": "Task",
    "kind": "LinkedField",
    "name": "createTask",
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
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "mutationsAddTaskMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "mutationsAddTaskMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "8eb28d0a9ebf9dc52af572cf26bfe232",
    "id": null,
    "metadata": {},
    "name": "mutationsAddTaskMutation",
    "operationKind": "mutation",
    "text": "mutation mutationsAddTaskMutation(\n  $name: String!\n  $userId: ID!\n) {\n  createTask(name: $name, userId: $userId) {\n    id\n    name\n    done\n  }\n}\n"
  }
};
})();

node.hash = "effde902c13edeccd2e5a148868f5d01";

module.exports = node;
