import {
    clusterApiUrl,
    Connection,
    PublicKey
} from "@solana/web3.js";
import {
    getKeypairFromEnvironment,
    getExplorerLink
} from "@solana-developers/helpers";
import "dotenv/config";
import {
    getMint,
    transfer
} from "@solana/spl-token";


async function main() {
    const clusterURL = clusterApiUrl("devnet");
    const connection = new Connection(clusterURL, "confirmed");

    const tokenMintPK = new PublicKey("ArT6p8N6M5TfVVpay9ATY5pfbLp5Ws1VvURTSPGkf5WB"); //generated in create_token_mint.ts
    const sender = getKeypairFromEnvironment("SECRET_KEY");
    const senderATA_PK = new PublicKey("45vLNBfh4Tb1G3254J6nffMiSa8P7Hh9o3NzvrmMgNWU");
    const receiverATA_PK = new PublicKey("HKT5fGvYJeMdGRU2vdEA8dTymdY1EFCfsmU11yTbUkqh"); // generated in create_token_account.ts

    const mintInfo = await getMint(connection, tokenMintPK);
    const MINOR_UNITS_PER_MAJOR_UNIT = Math.pow(10, mintInfo.decimals);

    const transactionSignature = await transfer(
        connection,
        sender,
        senderATA_PK,
        receiverATA_PK,
        sender,
        60 * MINOR_UNITS_PER_MAJOR_UNIT
    );

    const resultLink = getExplorerLink("transaction", transactionSignature, "devnet");
    console.log(resultLink);
}
main();