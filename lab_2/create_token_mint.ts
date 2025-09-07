import {
    clusterApiUrl,
    Connection
} from "@solana/web3.js";
import {
    getExplorerLink,
    getKeypairFromEnvironment
} from "@solana-developers/helpers";
import "dotenv/config";
import {
    createMint
} from "@solana/spl-token";

async function main(){
    const clusterURL = clusterApiUrl("devnet");
    const connection = new Connection(clusterURL);
    const user = getKeypairFromEnvironment('SECRET_KEY');

    const tokenMint = await createMint(
        connection,
        user,
        user.publicKey,
        null,
        5
    );

    const resultLink = getExplorerLink("address", tokenMint.toString(), "devnet");
    console.log(resultLink);
}
main();