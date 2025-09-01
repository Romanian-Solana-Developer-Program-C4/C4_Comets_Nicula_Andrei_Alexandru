import {
    clusterApiUrl,
    Connection,
    LAMPORTS_PER_SOL
} from "@solana/web3.js";
import {
    getKeypairFromEnvironment,
    airdropIfRequired
} from "@solana-developers/helpers";
import "dotenv/config";

async function main() {
    const cluster = clusterApiUrl("devnet");
    const connection = new Connection(cluster);
    const keypair = getKeypairFromEnvironment("SECRET_KEY");


    await airdropIfRequired(
        connection,
        keypair.publicKey,
        LAMPORTS_PER_SOL,
        0.5 * LAMPORTS_PER_SOL
    );
}
main();