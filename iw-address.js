const {
	Wallet
} = require('./wallet');
const addr = require('./address')
const account = require('./iw-account.js')

const fromRandom = () => Wallet.createRandom()

const fromMnemonic = (mnemonic, path) => Wallet.fromMnemonic(mnemonic, path)

const fromPrivateKey = privateKey => new Wallet(privateKey)

const isAddress = address => addr.isAddress(address)
module.exports = {
	fromRandom,
	fromMnemonic,
	fromPrivateKey,
	isAddress,
	...account
}
