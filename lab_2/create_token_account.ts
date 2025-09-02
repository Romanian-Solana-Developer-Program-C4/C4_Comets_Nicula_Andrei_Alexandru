import {
    clusterApiUrl,
    Connection,
    PublicKey
} from '@solana/web3.js';
import {
    getKeypairFromEnvironment
} from "@solana-developers/helpers";
import "dotenv/config";
import {
    getOrCreateAssociatedTokenAccount
} from "@solana/spl-token";

async function main() {
    const clusterURL = clusterApiUrl("devnet");
    const connection = new Connection(clusterURL);

    const user = getKeypairFromEnvironment("SECRET_KEY");

    const tokenMintAccountPK = new PublicKey("6zcuUYuMDyZiD8wj5BSteMzn8xrtyu3pEUwLSt7e7sao"); // Generated with "create_token_mint.ts"
    const recipientPK = new PublicKey("X1Zz49EftgHtKPdaVgWaTJw1EvkGbhucuE8koLmHc5u"); // Generated with "../generate_keypair.ts"

    const tokenAccount = await getOrCreateAssociatedTokenAccount(
        connection,
        user,
        tokenMintAccountPK,
        recipientPK
    );

    console.log("Token Account Address: ", tokenAccount.address.toBase58());
}

main();