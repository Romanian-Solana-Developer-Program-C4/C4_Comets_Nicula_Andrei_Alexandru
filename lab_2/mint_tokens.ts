import {
    clusterApiUrl,
    Connection, PublicKey
} from "@solana/web3.js";
import {
    getKeypairFromEnvironment,
    getExplorerLink
} from "@solana-developers/helpers";
import "dotenv/config";
import {
    getOrCreateAssociatedTokenAccount,
    mintTo,
    getMint
} from "@solana/spl-token";

async function main(){
    const clusterURL = clusterApiUrl()
    const connection = new Connection(clusterURL, "confirmed");

    const user = getKeypairFromEnvironment("SECRET_KEY");
    const tokenMintPK = new PublicKey("ArT6p8N6M5TfVVpay9ATY5pfbLp5Ws1VvURTSPGkf5WB"); // generated with create_token_mint.ts

    const recipientATA = await getOrCreateAssociatedTokenAccount(
        connection,
        user,
        tokenMintPK,
        user.publicKey
    );

    const mintInfo = await getMint(connection, tokenMintPK);
    const MINOR_UNITS_PER_MAJOR_UNIT = Math.pow(10, mintInfo.decimals);

    const transactionSignature = await mintTo(
        connection,
        user,
        tokenMintPK,
        recipientATA.address,
        user,
        360 * MINOR_UNITS_PER_MAJOR_UNIT
    );

    const resultLink = getExplorerLink("transaction", transactionSignature, "devnet");
    console.log(resultLink);

}
main();