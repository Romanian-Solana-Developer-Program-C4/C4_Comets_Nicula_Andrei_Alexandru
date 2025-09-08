import {
    clusterApiUrl
} from "@solana/web3.js";
import {
    createUmi
} from "@metaplex-foundation/umi-bundle-defaults";
import {
    getKeypairFromEnvironment
} from "@solana-developers/helpers";
import "dotenv/config";
import {
    createSignerFromKeypair,
    generateSigner, percentAmount,
    signerIdentity
} from "@metaplex-foundation/umi";
import {
    createNft,
    mplTokenMetadata
} from "@metaplex-foundation/mpl-token-metadata";
import {
    base58
} from "@metaplex-foundation/umi/serializers";



const clusterURL = clusterApiUrl("devnet");
const umi = createUmi(clusterURL)

const user = getKeypairFromEnvironment("SECRET_KEY");
const keypair = umi.eddsa.createKeypairFromSecretKey(user.secretKey);
const signer = createSignerFromKeypair(umi, keypair);

umi.use(mplTokenMetadata());
umi.use(signerIdentity(signer));

const METADATA_URI = "https://devnet.irys.xyz/ATpa1LZSRBTEFnCDS39xTYHeTnWKCtjWoM3rEMwaPEQD"; // generated in nft_metadata.ts

async function createNFT() {
    try {
        const mint = generateSigner(umi);
        let transaction = createNft(
            umi, {
                name: "Trifoiul Norocos",
                mint,
                authority: signer,
                sellerFeeBasisPoints: percentAmount(7),
                isCollection: false,
                uri: METADATA_URI
            }
        );

        let result = await transaction.sendAndConfirm(umi);
        const [signature] = base58.deserialize(result.signature);

        console.log("Signature address: ", signature);
        console.log("NFT Mint address: ", mint.publicKey);
    }
    catch (error) {
        console.error("[createNFT] Failed with error:", error);
    }
}

createNFT();