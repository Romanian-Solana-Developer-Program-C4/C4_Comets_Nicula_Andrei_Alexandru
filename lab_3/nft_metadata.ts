import {
    getKeypairFromEnvironment
} from "@solana-developers/helpers";
import "dotenv/config";
import {
    clusterApiUrl
} from "@solana/web3.js";
import {
    createUmi
} from "@metaplex-foundation/umi-bundle-defaults";
import {
    createSignerFromKeypair,
    signerIdentity
} from "@metaplex-foundation/umi";
import {
    irysUploader
} from "@metaplex-foundation/umi-uploader-irys";

const clusterURL = clusterApiUrl("devnet");
const umi = createUmi(clusterURL);
const user = getKeypairFromEnvironment("SECRET_KEY");
const keypair = umi.eddsa.createKeypairFromSecretKey(user.secretKey);
const signer = createSignerFromKeypair(umi, keypair);

umi.use(irysUploader());
umi.use(signerIdentity(signer));

const IMAGE_URI = "https://gateway.irys.xyz/6Gg2ZceqmQVLFbCT4vbuvcMHmTRVWq6Ltd6tiKjbwK51"; // generated in nft_image.ts

async function uploadMetadata() {
    try {
        const metadata = {
            name: "Trifoiul Norocos",
            symbol: "TN",
            description: "Norocul e de partea ta",
            image: IMAGE_URI,
            attributes: [
                { trait_type: "Culoare", value: "Verde" },
                { trait_type: "Dimensiune", value: "Foarte Mic"},
                { trait_type: "Tip", value: "Natural" }
            ],
            properties: {
                files: [{ type: "image/png", uri: IMAGE_URI }]
            }
        };

        const metadataURI = await umi.uploader.uploadJson(metadata);
        console.log("Metadata URI:", metadataURI);
    }
    catch (error) {
        console.error("[uploadMetadata] Failed with error:", error);
    }
}

uploadMetadata();