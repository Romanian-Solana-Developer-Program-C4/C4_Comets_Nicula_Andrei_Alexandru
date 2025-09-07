import {
    clusterApiUrl,
    Connection,
    PublicKey,
    Keypair
} from "@solana/web3.js";
import {
    getKeypairFromEnvironment,
    getExplorerLink
} from "@solana-developers/helpers";
import "dotenv/config";
import {getOrCreateAssociatedTokenAccount} from "@solana/spl-token";


async function main(){
    const clusterURL = clusterApiUrl("devnet");
    const connection = new Connection(clusterURL, "confirmed");

    const user = getKeypairFromEnvironment('SECRET_KEY');
    const tokenMintPK = new PublicKey("ArT6p8N6M5TfVVpay9ATY5pfbLp5Ws1VvURTSPGkf5WB"); // generated with create_token_mint.ts
    const recipient = Keypair.generate();

    const recipientATA = await getOrCreateAssociatedTokenAccount(
        connection,
        user,
        tokenMintPK,
        recipient.publicKey
    );

    const resultLink = getExplorerLink("address", recipientATA.address.toBase58(), "devnet");
    console.log(resultLink);
}
main();