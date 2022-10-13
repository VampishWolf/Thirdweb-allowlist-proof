const { MerkleTree } = require("merkletreejs");
const keccak256 = require("keccak256");
const { ethers } = require("ethers");

const snapshot = [
  {addr: "0x0000000000000000000000000000000000000000", qty: 2},
  {addr: "0xBAf40BFB12B7F281Fd30Ac89DEC5Edb4E95E17bf", qty: 50},
  {addr: "0x9af00Bc1EA498C594fa90e0d35e74005ffdE3237", qty: 50},
  {addr: "0x2aA6473aA92325AC14a0dbb0968C17348515a2ba", qty: 50},
];

const hashedLeaves = snapshot.map(l => ethers.utils.solidityKeccak256(["address", "uint256"], [l.addr, l.qty]));

const tree = new MerkleTree(hashedLeaves, keccak256, {
  sort: true,
  sortLeaves: true,
  sortPairs: true,
});

const root = tree.getHexRoot();
console.log(root);

const expectedProof = tree.getHexProof(ethers.utils.solidityKeccak256(["address", "uint256"], [snapshot[0].addr, snapshot[0].qty]));

console.log(expectedProof);