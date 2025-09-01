import {
    getKeypairFromEnvironment
} from "@solana-developers/helpers";
import "dotenv/config";
import {
    clusterApiUrl,
    Connection,
    LAMPORTS_PER_SOL,
    PublicKey,
    sendAndConfirmTransaction,
    SystemProgram,
    Transaction
} from "@solana/web3.js";
import {
    createMemoInstruction
} from "@solana/spl-memo";

async function main() {
    const sender = getKeypairFromEnvironment("SECRET_KEY");
    const recipientPK = new PublicKey("GE9bbnsUgXyeKbf5pSaj7cDp4pZjQK4YkcXZagqqdKPT"); // Generated with generate_keypair.ts

    const clusterURL = clusterApiUrl("devnet");
    const connection = new Connection(clusterURL);

    const transaction = new Transaction();
    const sendSolInstruction = SystemProgram.transfer({
        fromPubkey:sender.publicKey,
        toPubkey:recipientPK,
        lamports: 0.01 * LAMPORTS_PER_SOL
    });
    transaction.add(sendSolInstruction);
    const memoInstruction = createMemoInstruction("Small payment for a big heart");
    transaction.add(memoInstruction);

    const signature = await sendAndConfirmTransaction(connection, transaction, [sender]);

    console.log("Transaction signature: ", signature);

}
main();
