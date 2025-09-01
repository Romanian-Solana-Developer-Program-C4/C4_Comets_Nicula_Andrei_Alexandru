import "dotenv/config";
import {
    getKeypairFromEnvironment
} from "@solana-developers/helpers";
import bs58 from "bs58";

const keypair = getKeypairFromEnvironment("SECRET_KEY");

console.log("Keypair loaded!");
console.log("Public key: ", keypair.publicKey.toBase58());
console.log("Private key: ", bs58.encode(keypair.secretKey));