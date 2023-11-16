/**
 * @generated SignedSource<<a7b619b43832a002524d4445842f3842>>
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
    "name": "userId"
  }
],
v1 = [
  {
    "alias": null,
    "args": [
      {
        "kind": "Variable",
        "name": "userId",
        "variableName": "userId"
      }
    ],
    "concreteType": "Task",
    "kind": "LinkedField",
    "name": "tasks",
    "plural": true,
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
    "name": "queriesComponentTasksQuery",
    "selections": (v1/*: any*/),
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "queriesComponentTasksQuery",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "7fd6c0224af8c81f471b2e421df2bb8f",
    "id": null,
    "metadata": {},
    "name": "queriesComponentTasksQuery",
    "operationKind": "query",
    "text": "query queriesComponentTasksQuery(\n  $userId: ID\n) {\n  tasks(userId: $userId) {\n    id\n    name\n    done\n  }\n}\n"
  }
};
})();

node.hash = "93a7746a95ff1a8433a2e14275c87708";

module.exports = node;
