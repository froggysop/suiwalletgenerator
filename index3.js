import { Ed25519Keypair, JsonRpcProvider, RawSigner, TransactionBlock} from '@mysten/sui.js'
import bip39 from 'bip39'
import axios from 'axios'
import fs from 'fs'
import consoleStamp from 'console-stamp'
import { createInterface } from "readline";

consoleStamp(console, { format: ':date(HH:MM:ss)' })

const provider = new JsonRpcProvider();
const parseFile = fileName => fs.readFileSync(fileName, "utf8").split('\n').map(str => str.trim()).filter(str => str.length > 10);

function saveMnemonic(address, mnemonic) {
#куда сохраняем аккаунты
    fs.appendFileSync("./mnemonics/wallets.txt",`${address}\n ${mnemonic}\n`, "utf8");
}

function createwallet() {
#5 заменить на количество необходимых аккаунтов#
        for (let i = 0; i < 5; i++) {
        const mnemonic = bip39.generateMnemonic()
        const keypair = Ed25519Keypair.deriveKeypair(mnemonic)
        const address = keypair.getPublicKey().toSuiAddress()
        
        console.log(`Sui Address: 0x${address}`)
        console.log(`Mnemonic: ${mnemonic}`)
        console.log(`Result: https://explorer.sui.io/addresses/${address}?network=testnet`)
        saveMnemonic(address, mnemonic)
        console.log("-".repeat(100))
        }
    }

(async () => {

    const readline = createInterface({
        input: process.stdin,
        output: process.stdout
      });

      const readLineAsync = msg => {
        return new Promise(resolve => {
          readline.question(msg, userRes => {
            resolve(userRes);
          });
        });
      }

    const mode = await readLineAsync(`Select app mode...
    0 - Create SUI wallet
    \n\n`);

    readline.close();
    console.log('Mode..', mode);

    switch (parseInt(mode)) {
        case 0: 
            await createwallet()
            break;

      }
})()