import "dotenv/config";
import {
    Connection,
    LAMPORTS_PER_SOL,
    clusterApiUrl
} from "@solana/web3.js";
import {
    getKeypairFromEnvironment
} from "@solana-developers/helpers";

async function main() {
    const cluster = clusterApiUrl("devnet");
    const connection = new Connection(cluster);
    const keypair = getKeypairFromEnvironment("SECRET_KEY");

    const balanceInLamports = await connection.getBalance(keypair.publicKey);
    const balanceInSOL = balanceInLamports / LAMPORTS_PER_SOL;
    console.log(`Balance: ${balanceInSOL} SOL (${balanceInLamports} Lamports)`);
}
main();