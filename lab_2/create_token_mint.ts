import {
    Connection,
    clusterApiUrl
} from "@solana/web3.js";
import {
    getKeypairFromEnvironment
} from "@solana-developers/helpers";
import "dotenv/config";
import {
    createMint
} from "@solana/spl-token";

async function main() {
    const clusterURL = clusterApiUrl("devnet");
    const connection = new Connection(clusterURL);

    const userKeypair = getKeypairFromEnvironment("SECRET_KEY");

    const tokenMint = await createMint(
        connection,
        userKeypair,
        userKeypair.publicKey,
        null,
        3
    );

    console.log("Token mint address: ", tokenMint.toBase58());
}

main();