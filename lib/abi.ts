export const TRUSTED_HINT_ABI = [{
  "type": "constructor",
  "inputs": [],
  "stateMutability": "nonpayable"
}, {
  "type": "function",
  "name": "VERSION_DELIMITER",
  "inputs": [],
  "outputs": [{"name": "", "type": "string", "internalType": "string"}],
  "stateMutability": "view"
}, {
  "type": "function",
  "name": "VERSION_MAJOR",
  "inputs": [],
  "outputs": [{"name": "", "type": "string", "internalType": "string"}],
  "stateMutability": "view"
}, {
  "type": "function",
  "name": "VERSION_MINOR",
  "inputs": [],
  "outputs": [{"name": "", "type": "string", "internalType": "string"}],
  "stateMutability": "view"
}, {
  "type": "function",
  "name": "VERSION_PATCH",
  "inputs": [],
  "outputs": [{"name": "", "type": "string", "internalType": "string"}],
  "stateMutability": "view"
}, {
  "type": "function",
  "name": "addListDelegate",
  "inputs": [{"name": "_namespace", "type": "address", "internalType": "address"}, {
    "name": "_list",
    "type": "bytes32",
    "internalType": "bytes32"
  }, {"name": "_delegate", "type": "address", "internalType": "address"}, {
    "name": "_untilTimestamp",
    "type": "uint256",
    "internalType": "uint256"
  }],
  "outputs": [],
  "stateMutability": "nonpayable"
}, {
  "type": "function",
  "name": "addListDelegateSigned",
  "inputs": [{"name": "_namespace", "type": "address", "internalType": "address"}, {
    "name": "_list",
    "type": "bytes32",
    "internalType": "bytes32"
  }, {"name": "_delegate", "type": "address", "internalType": "address"}, {
    "name": "_untilTimestamp",
    "type": "uint256",
    "internalType": "uint256"
  }, {"name": "_signer", "type": "address", "internalType": "address"}, {
    "name": "_signature",
    "type": "bytes",
    "internalType": "bytes"
  }],
  "outputs": [],
  "stateMutability": "nonpayable"
}, {
  "type": "function",
  "name": "delegates",
  "inputs": [{"name": "", "type": "bytes32", "internalType": "bytes32"}, {
    "name": "",
    "type": "address",
    "internalType": "address"
  }],
  "outputs": [{"name": "", "type": "uint256", "internalType": "uint256"}],
  "stateMutability": "view"
}, {
  "type": "function",
  "name": "eip712Domain",
  "inputs": [],
  "outputs": [{"name": "fields", "type": "bytes1", "internalType": "bytes1"}, {
    "name": "name",
    "type": "string",
    "internalType": "string"
  }, {"name": "version", "type": "string", "internalType": "string"}, {
    "name": "chainId",
    "type": "uint256",
    "internalType": "uint256"
  }, {"name": "verifyingContract", "type": "address", "internalType": "address"}, {
    "name": "salt",
    "type": "bytes32",
    "internalType": "bytes32"
  }, {"name": "extensions", "type": "uint256[]", "internalType": "uint256[]"}],
  "stateMutability": "view"
}, {
  "type": "function",
  "name": "getHint",
  "inputs": [{"name": "_namespace", "type": "address", "internalType": "address"}, {
    "name": "_list",
    "type": "bytes32",
    "internalType": "bytes32"
  }, {"name": "_key", "type": "bytes32", "internalType": "bytes32"}],
  "outputs": [{"name": "", "type": "bytes32", "internalType": "bytes32"}],
  "stateMutability": "view"
}, {
  "type": "function",
  "name": "getMetadata",
  "inputs": [{"name": "_namespace", "type": "address", "internalType": "address"}, {
    "name": "_list",
    "type": "bytes32",
    "internalType": "bytes32"
  }, {"name": "_key", "type": "bytes32", "internalType": "bytes32"}, {
    "name": "_value",
    "type": "bytes32",
    "internalType": "bytes32"
  }],
  "outputs": [{"name": "", "type": "bytes", "internalType": "bytes"}],
  "stateMutability": "view"
}, {
  "type": "function",
  "name": "identityIsDelegate",
  "inputs": [{"name": "_namespace", "type": "address", "internalType": "address"}, {
    "name": "_list",
    "type": "bytes32",
    "internalType": "bytes32"
  }, {"name": "_identity", "type": "address", "internalType": "address"}],
  "outputs": [{"name": "", "type": "bool", "internalType": "bool"}],
  "stateMutability": "view"
}, {
  "type": "function",
  "name": "identityIsOwner",
  "inputs": [{"name": "_namespace", "type": "address", "internalType": "address"}, {
    "name": "_list",
    "type": "bytes32",
    "internalType": "bytes32"
  }, {"name": "_identity", "type": "address", "internalType": "address"}],
  "outputs": [{"name": "", "type": "bool", "internalType": "bool"}],
  "stateMutability": "view"
}, {
  "type": "function",
  "name": "initialize",
  "inputs": [],
  "outputs": [],
  "stateMutability": "nonpayable"
}, {
  "type": "function",
  "name": "isTrustedIssuer",
  "inputs": [{"name": "_ociAddress", "type": "address", "internalType": "address"}, {
    "name": "_contextUrl",
    "type": "string",
    "internalType": "string"
  }, {"name": "_did", "type": "string", "internalType": "string"}],
  "outputs": [{"name": "", "type": "bool", "internalType": "bool"}],
  "stateMutability": "view"
}, {
  "type": "function",
  "name": "metadata",
  "inputs": [{"name": "", "type": "bytes32", "internalType": "bytes32"}],
  "outputs": [{"name": "", "type": "bytes", "internalType": "bytes"}],
  "stateMutability": "view"
}, {
  "type": "function",
  "name": "newOwners",
  "inputs": [{"name": "", "type": "bytes32", "internalType": "bytes32"}],
  "outputs": [{"name": "", "type": "address", "internalType": "address"}],
  "stateMutability": "view"
}, {
  "type": "function",
  "name": "nonces",
  "inputs": [{"name": "", "type": "address", "internalType": "address"}],
  "outputs": [{"name": "", "type": "uint256", "internalType": "uint256"}],
  "stateMutability": "view"
}, {
  "type": "function",
  "name": "owner",
  "inputs": [],
  "outputs": [{"name": "", "type": "address", "internalType": "address"}],
  "stateMutability": "view"
}, {
  "type": "function",
  "name": "pause",
  "inputs": [],
  "outputs": [],
  "stateMutability": "nonpayable"
}, {
  "type": "function",
  "name": "paused",
  "inputs": [],
  "outputs": [{"name": "", "type": "bool", "internalType": "bool"}],
  "stateMutability": "view"
}, {
  "type": "function",
  "name": "proxiableUUID",
  "inputs": [],
  "outputs": [{"name": "", "type": "bytes32", "internalType": "bytes32"}],
  "stateMutability": "view"
}, {
  "type": "function",
  "name": "removeListDelegate",
  "inputs": [{"name": "_namespace", "type": "address", "internalType": "address"}, {
    "name": "_list",
    "type": "bytes32",
    "internalType": "bytes32"
  }, {"name": "_delegate", "type": "address", "internalType": "address"}],
  "outputs": [],
  "stateMutability": "nonpayable"
}, {
  "type": "function",
  "name": "removeListDelegateSigned",
  "inputs": [{"name": "_namespace", "type": "address", "internalType": "address"}, {
    "name": "_list",
    "type": "bytes32",
    "internalType": "bytes32"
  }, {"name": "_delegate", "type": "address", "internalType": "address"}, {
    "name": "_signer",
    "type": "address",
    "internalType": "address"
  }, {"name": "_signature", "type": "bytes", "internalType": "bytes"}],
  "outputs": [],
  "stateMutability": "nonpayable"
}, {
  "type": "function",
  "name": "renounceOwnership",
  "inputs": [],
  "outputs": [],
  "stateMutability": "nonpayable"
}, {
  "type": "function",
  "name": "revokedLists",
  "inputs": [{"name": "", "type": "bytes32", "internalType": "bytes32"}],
  "outputs": [{"name": "", "type": "bool", "internalType": "bool"}],
  "stateMutability": "view"
}, {
  "type": "function",
  "name": "setHint",
  "inputs": [{"name": "_namespace", "type": "address", "internalType": "address"}, {
    "name": "_list",
    "type": "bytes32",
    "internalType": "bytes32"
  }, {"name": "_key", "type": "bytes32", "internalType": "bytes32"}, {
    "name": "_value",
    "type": "bytes32",
    "internalType": "bytes32"
  }],
  "outputs": [],
  "stateMutability": "nonpayable"
}, {
  "type": "function",
  "name": "setHint",
  "inputs": [{"name": "_namespace", "type": "address", "internalType": "address"}, {
    "name": "_list",
    "type": "bytes32",
    "internalType": "bytes32"
  }, {"name": "_key", "type": "bytes32", "internalType": "bytes32"}, {
    "name": "_value",
    "type": "bytes32",
    "internalType": "bytes32"
  }, {"name": "_metadata", "type": "bytes", "internalType": "bytes"}],
  "outputs": [],
  "stateMutability": "nonpayable"
}, {
  "type": "function",
  "name": "setHintDelegated",
  "inputs": [{"name": "_namespace", "type": "address", "internalType": "address"}, {
    "name": "_list",
    "type": "bytes32",
    "internalType": "bytes32"
  }, {"name": "_key", "type": "bytes32", "internalType": "bytes32"}, {
    "name": "_value",
    "type": "bytes32",
    "internalType": "bytes32"
  }, {"name": "_metadata", "type": "bytes", "internalType": "bytes"}],
  "outputs": [],
  "stateMutability": "nonpayable"
}, {
  "type": "function",
  "name": "setHintDelegated",
  "inputs": [{"name": "_namespace", "type": "address", "internalType": "address"}, {
    "name": "_list",
    "type": "bytes32",
    "internalType": "bytes32"
  }, {"name": "_key", "type": "bytes32", "internalType": "bytes32"}, {
    "name": "_value",
    "type": "bytes32",
    "internalType": "bytes32"
  }],
  "outputs": [],
  "stateMutability": "nonpayable"
}, {
  "type": "function",
  "name": "setHintDelegatedSigned",
  "inputs": [{"name": "_namespace", "type": "address", "internalType": "address"}, {
    "name": "_list",
    "type": "bytes32",
    "internalType": "bytes32"
  }, {"name": "_key", "type": "bytes32", "internalType": "bytes32"}, {
    "name": "_value",
    "type": "bytes32",
    "internalType": "bytes32"
  }, {"name": "_signer", "type": "address", "internalType": "address"}, {
    "name": "_signature",
    "type": "bytes",
    "internalType": "bytes"
  }],
  "outputs": [],
  "stateMutability": "nonpayable"
}, {
  "type": "function",
  "name": "setHintDelegatedSigned",
  "inputs": [{"name": "_namespace", "type": "address", "internalType": "address"}, {
    "name": "_list",
    "type": "bytes32",
    "internalType": "bytes32"
  }, {"name": "_key", "type": "bytes32", "internalType": "bytes32"}, {
    "name": "_value",
    "type": "bytes32",
    "internalType": "bytes32"
  }, {"name": "_metadata", "type": "bytes", "internalType": "bytes"}, {
    "name": "_signer",
    "type": "address",
    "internalType": "address"
  }, {"name": "_signature", "type": "bytes", "internalType": "bytes"}],
  "outputs": [],
  "stateMutability": "nonpayable"
}, {
  "type": "function",
  "name": "setHintSigned",
  "inputs": [{"name": "_namespace", "type": "address", "internalType": "address"}, {
    "name": "_list",
    "type": "bytes32",
    "internalType": "bytes32"
  }, {"name": "_key", "type": "bytes32", "internalType": "bytes32"}, {
    "name": "_value",
    "type": "bytes32",
    "internalType": "bytes32"
  }, {"name": "_signer", "type": "address", "internalType": "address"}, {
    "name": "_signature",
    "type": "bytes",
    "internalType": "bytes"
  }],
  "outputs": [],
  "stateMutability": "nonpayable"
}, {
  "type": "function",
  "name": "setHintSigned",
  "inputs": [{"name": "_namespace", "type": "address", "internalType": "address"}, {
    "name": "_list",
    "type": "bytes32",
    "internalType": "bytes32"
  }, {"name": "_key", "type": "bytes32", "internalType": "bytes32"}, {
    "name": "_value",
    "type": "bytes32",
    "internalType": "bytes32"
  }, {"name": "_metadata", "type": "bytes", "internalType": "bytes"}, {
    "name": "_signer",
    "type": "address",
    "internalType": "address"
  }, {"name": "_signature", "type": "bytes", "internalType": "bytes"}],
  "outputs": [],
  "stateMutability": "nonpayable"
}, {
  "type": "function",
  "name": "setHints",
  "inputs": [{"name": "_namespace", "type": "address", "internalType": "address"}, {
    "name": "_list",
    "type": "bytes32",
    "internalType": "bytes32"
  }, {"name": "_keys", "type": "bytes32[]", "internalType": "bytes32[]"}, {
    "name": "_values",
    "type": "bytes32[]",
    "internalType": "bytes32[]"
  }],
  "outputs": [],
  "stateMutability": "nonpayable"
}, {
  "type": "function",
  "name": "setHints",
  "inputs": [{"name": "_namespace", "type": "address", "internalType": "address"}, {
    "name": "_list",
    "type": "bytes32",
    "internalType": "bytes32"
  }, {"name": "_keys", "type": "bytes32[]", "internalType": "bytes32[]"}, {
    "name": "_values",
    "type": "bytes32[]",
    "internalType": "bytes32[]"
  }, {"name": "_metadata", "type": "bytes[]", "internalType": "bytes[]"}],
  "outputs": [],
  "stateMutability": "nonpayable"
}, {
  "type": "function",
  "name": "setHintsDelegated",
  "inputs": [{"name": "_namespace", "type": "address", "internalType": "address"}, {
    "name": "_list",
    "type": "bytes32",
    "internalType": "bytes32"
  }, {"name": "_keys", "type": "bytes32[]", "internalType": "bytes32[]"}, {
    "name": "_values",
    "type": "bytes32[]",
    "internalType": "bytes32[]"
  }, {"name": "_metadata", "type": "bytes[]", "internalType": "bytes[]"}],
  "outputs": [],
  "stateMutability": "nonpayable"
}, {
  "type": "function",
  "name": "setHintsDelegated",
  "inputs": [{"name": "_namespace", "type": "address", "internalType": "address"}, {
    "name": "_list",
    "type": "bytes32",
    "internalType": "bytes32"
  }, {"name": "_keys", "type": "bytes32[]", "internalType": "bytes32[]"}, {
    "name": "_values",
    "type": "bytes32[]",
    "internalType": "bytes32[]"
  }],
  "outputs": [],
  "stateMutability": "nonpayable"
}, {
  "type": "function",
  "name": "setHintsDelegatedSigned",
  "inputs": [{"name": "_namespace", "type": "address", "internalType": "address"}, {
    "name": "_list",
    "type": "bytes32",
    "internalType": "bytes32"
  }, {"name": "_keys", "type": "bytes32[]", "internalType": "bytes32[]"}, {
    "name": "_values",
    "type": "bytes32[]",
    "internalType": "bytes32[]"
  }, {"name": "_metadata", "type": "bytes[]", "internalType": "bytes[]"}, {
    "name": "_signer",
    "type": "address",
    "internalType": "address"
  }, {"name": "_signature", "type": "bytes", "internalType": "bytes"}],
  "outputs": [],
  "stateMutability": "nonpayable"
}, {
  "type": "function",
  "name": "setHintsDelegatedSigned",
  "inputs": [{"name": "_namespace", "type": "address", "internalType": "address"}, {
    "name": "_list",
    "type": "bytes32",
    "internalType": "bytes32"
  }, {"name": "_keys", "type": "bytes32[]", "internalType": "bytes32[]"}, {
    "name": "_values",
    "type": "bytes32[]",
    "internalType": "bytes32[]"
  }, {"name": "_signer", "type": "address", "internalType": "address"}, {
    "name": "_signature",
    "type": "bytes",
    "internalType": "bytes"
  }],
  "outputs": [],
  "stateMutability": "nonpayable"
}, {
  "type": "function",
  "name": "setHintsSigned",
  "inputs": [{"name": "_namespace", "type": "address", "internalType": "address"}, {
    "name": "_list",
    "type": "bytes32",
    "internalType": "bytes32"
  }, {"name": "_keys", "type": "bytes32[]", "internalType": "bytes32[]"}, {
    "name": "_values",
    "type": "bytes32[]",
    "internalType": "bytes32[]"
  }, {"name": "_signer", "type": "address", "internalType": "address"}, {
    "name": "_signature",
    "type": "bytes",
    "internalType": "bytes"
  }],
  "outputs": [],
  "stateMutability": "nonpayable"
}, {
  "type": "function",
  "name": "setHintsSigned",
  "inputs": [{"name": "_namespace", "type": "address", "internalType": "address"}, {
    "name": "_list",
    "type": "bytes32",
    "internalType": "bytes32"
  }, {"name": "_keys", "type": "bytes32[]", "internalType": "bytes32[]"}, {
    "name": "_values",
    "type": "bytes32[]",
    "internalType": "bytes32[]"
  }, {"name": "_metadata", "type": "bytes[]", "internalType": "bytes[]"}, {
    "name": "_signer",
    "type": "address",
    "internalType": "address"
  }, {"name": "_signature", "type": "bytes", "internalType": "bytes"}],
  "outputs": [],
  "stateMutability": "nonpayable"
}, {
  "type": "function",
  "name": "setListOwner",
  "inputs": [{"name": "_namespace", "type": "address", "internalType": "address"}, {
    "name": "_list",
    "type": "bytes32",
    "internalType": "bytes32"
  }, {"name": "_newOwner", "type": "address", "internalType": "address"}],
  "outputs": [],
  "stateMutability": "nonpayable"
}, {
  "type": "function",
  "name": "setListOwnerSigned",
  "inputs": [{"name": "_namespace", "type": "address", "internalType": "address"}, {
    "name": "_list",
    "type": "bytes32",
    "internalType": "bytes32"
  }, {"name": "_newOwner", "type": "address", "internalType": "address"}, {
    "name": "_signer",
    "type": "address",
    "internalType": "address"
  }, {"name": "_signature", "type": "bytes", "internalType": "bytes"}],
  "outputs": [],
  "stateMutability": "nonpayable"
}, {
  "type": "function",
  "name": "setListStatus",
  "inputs": [{"name": "_namespace", "type": "address", "internalType": "address"}, {
    "name": "_list",
    "type": "bytes32",
    "internalType": "bytes32"
  }, {"name": "_revoked", "type": "bool", "internalType": "bool"}],
  "outputs": [],
  "stateMutability": "nonpayable"
}, {
  "type": "function",
  "name": "setListStatusSigned",
  "inputs": [{"name": "_namespace", "type": "address", "internalType": "address"}, {
    "name": "_list",
    "type": "bytes32",
    "internalType": "bytes32"
  }, {"name": "_revoked", "type": "bool", "internalType": "bool"}, {
    "name": "_signer",
    "type": "address",
    "internalType": "address"
  }, {"name": "_signature", "type": "bytes", "internalType": "bytes"}],
  "outputs": [],
  "stateMutability": "nonpayable"
}, {
  "type": "function",
  "name": "setMetadata",
  "inputs": [{"name": "_namespace", "type": "address", "internalType": "address"}, {
    "name": "_list",
    "type": "bytes32",
    "internalType": "bytes32"
  }, {"name": "_key", "type": "bytes32", "internalType": "bytes32"}, {
    "name": "_value",
    "type": "bytes32",
    "internalType": "bytes32"
  }, {"name": "_metadata", "type": "bytes", "internalType": "bytes"}],
  "outputs": [],
  "stateMutability": "nonpayable"
}, {
  "type": "function",
  "name": "setMetadataDelegated",
  "inputs": [{"name": "_namespace", "type": "address", "internalType": "address"}, {
    "name": "_list",
    "type": "bytes32",
    "internalType": "bytes32"
  }, {"name": "_key", "type": "bytes32", "internalType": "bytes32"}, {
    "name": "_value",
    "type": "bytes32",
    "internalType": "bytes32"
  }, {"name": "_metadata", "type": "bytes", "internalType": "bytes"}],
  "outputs": [],
  "stateMutability": "nonpayable"
}, {
  "type": "function",
  "name": "setMetadataDelegatedSigned",
  "inputs": [{"name": "_namespace", "type": "address", "internalType": "address"}, {
    "name": "_list",
    "type": "bytes32",
    "internalType": "bytes32"
  }, {"name": "_key", "type": "bytes32", "internalType": "bytes32"}, {
    "name": "_value",
    "type": "bytes32",
    "internalType": "bytes32"
  }, {"name": "_metadata", "type": "bytes", "internalType": "bytes"}, {
    "name": "_signer",
    "type": "address",
    "internalType": "address"
  }, {"name": "_signature", "type": "bytes", "internalType": "bytes"}],
  "outputs": [],
  "stateMutability": "nonpayable"
}, {
  "type": "function",
  "name": "setMetadataSigned",
  "inputs": [{"name": "_namespace", "type": "address", "internalType": "address"}, {
    "name": "_list",
    "type": "bytes32",
    "internalType": "bytes32"
  }, {"name": "_key", "type": "bytes32", "internalType": "bytes32"}, {
    "name": "_value",
    "type": "bytes32",
    "internalType": "bytes32"
  }, {"name": "_metadata", "type": "bytes", "internalType": "bytes"}, {
    "name": "_signer",
    "type": "address",
    "internalType": "address"
  }, {"name": "_signature", "type": "bytes", "internalType": "bytes"}],
  "outputs": [],
  "stateMutability": "nonpayable"
}, {
  "type": "function",
  "name": "transferOwnership",
  "inputs": [{"name": "newOwner", "type": "address", "internalType": "address"}],
  "outputs": [],
  "stateMutability": "nonpayable"
}, {
  "type": "function",
  "name": "unpause",
  "inputs": [],
  "outputs": [],
  "stateMutability": "nonpayable"
}, {
  "type": "function",
  "name": "upgradeTo",
  "inputs": [{"name": "newImplementation", "type": "address", "internalType": "address"}],
  "outputs": [],
  "stateMutability": "nonpayable"
}, {
  "type": "function",
  "name": "upgradeToAndCall",
  "inputs": [{"name": "newImplementation", "type": "address", "internalType": "address"}, {
    "name": "data",
    "type": "bytes",
    "internalType": "bytes"
  }],
  "outputs": [],
  "stateMutability": "payable"
}, {
  "type": "function",
  "name": "version",
  "inputs": [],
  "outputs": [{"name": "", "type": "string", "internalType": "string"}],
  "stateMutability": "view"
}, {
  "type": "event",
  "name": "AdminChanged",
  "inputs": [{
    "name": "previousAdmin",
    "type": "address",
    "indexed": false,
    "internalType": "address"
  }, {"name": "newAdmin", "type": "address", "indexed": false, "internalType": "address"}],
  "anonymous": false
}, {
  "type": "event",
  "name": "BeaconUpgraded",
  "inputs": [{"name": "beacon", "type": "address", "indexed": true, "internalType": "address"}],
  "anonymous": false
}, {"type": "event", "name": "EIP712DomainChanged", "inputs": [], "anonymous": false}, {
  "type": "event",
  "name": "HintListDelegateAdded",
  "inputs": [{"name": "namespace", "type": "address", "indexed": true, "internalType": "address"}, {
    "name": "list",
    "type": "bytes32",
    "indexed": true,
    "internalType": "bytes32"
  }, {"name": "newDelegate", "type": "address", "indexed": true, "internalType": "address"}],
  "anonymous": false
}, {
  "type": "event",
  "name": "HintListDelegateRemoved",
  "inputs": [{"name": "namespace", "type": "address", "indexed": true, "internalType": "address"}, {
    "name": "list",
    "type": "bytes32",
    "indexed": true,
    "internalType": "bytes32"
  }, {"name": "oldDelegate", "type": "address", "indexed": true, "internalType": "address"}],
  "anonymous": false
}, {
  "type": "event",
  "name": "HintListOwnerChanged",
  "inputs": [{"name": "namespace", "type": "address", "indexed": true, "internalType": "address"}, {
    "name": "list",
    "type": "bytes32",
    "indexed": true,
    "internalType": "bytes32"
  }, {"name": "newOwner", "type": "address", "indexed": true, "internalType": "address"}],
  "anonymous": false
}, {
  "type": "event",
  "name": "HintListStatusChanged",
  "inputs": [{"name": "namespace", "type": "address", "indexed": true, "internalType": "address"}, {
    "name": "list",
    "type": "bytes32",
    "indexed": true,
    "internalType": "bytes32"
  }, {"name": "revoked", "type": "bool", "indexed": true, "internalType": "bool"}],
  "anonymous": false
}, {
  "type": "event",
  "name": "HintValueChanged",
  "inputs": [{"name": "namespace", "type": "address", "indexed": true, "internalType": "address"}, {
    "name": "list",
    "type": "bytes32",
    "indexed": true,
    "internalType": "bytes32"
  }, {"name": "key", "type": "bytes32", "indexed": true, "internalType": "bytes32"}, {
    "name": "value",
    "type": "bytes32",
    "indexed": false,
    "internalType": "bytes32"
  }],
  "anonymous": false
}, {
  "type": "event",
  "name": "Initialized",
  "inputs": [{"name": "version", "type": "uint8", "indexed": false, "internalType": "uint8"}],
  "anonymous": false
}, {
  "type": "event",
  "name": "OwnershipTransferred",
  "inputs": [{
    "name": "previousOwner",
    "type": "address",
    "indexed": true,
    "internalType": "address"
  }, {"name": "newOwner", "type": "address", "indexed": true, "internalType": "address"}],
  "anonymous": false
}, {
  "type": "event",
  "name": "Paused",
  "inputs": [{"name": "account", "type": "address", "indexed": false, "internalType": "address"}],
  "anonymous": false
}, {
  "type": "event",
  "name": "Unpaused",
  "inputs": [{"name": "account", "type": "address", "indexed": false, "internalType": "address"}],
  "anonymous": false
}, {
  "type": "event",
  "name": "Upgraded",
  "inputs": [{"name": "implementation", "type": "address", "indexed": true, "internalType": "address"}],
  "anonymous": false
}] as const;