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
    createGenericFile,
    createSignerFromKeypair, signerIdentity
} from "@metaplex-foundation/umi";
import {irysUploader} from "@metaplex-foundation/umi-uploader-irys";
import {readFile} from "node:fs/promises";



const user = getKeypairFromEnvironment("SECRET_KEY");

const clusterURL = clusterApiUrl("devnet");
const umi = createUmi(clusterURL);

const keypair = umi.eddsa.createKeypairFromSecretKey(user.secretKey);
const signer = createSignerFromKeypair(
    umi,
    keypair
);

umi.use(irysUploader());
umi.use(signerIdentity(signer));

const IMAGE_FILE = "./lucky_clover.png";

export async function uploadImage() {
    try {
        const image = await readFile(IMAGE_FILE);
        const imageConverted = createGenericFile(
            new Uint8Array(image),
            "image/png"
        );
        const [myUri] = await umi.uploader.upload([imageConverted]);
        console.log("Resulted URI:", myUri);
    } catch (error) {
        console.error("[uploadImage] Failed with error:", error);
    }
}
uploadImage();