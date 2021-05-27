const Decentragram = artifacts.require("Decentragram")


require('chai')
	.use(require('chai-as-promised'))
	.should()

function tokens(number) {
	return web3.utils.toWei(String(number), 'ether')
}
contract('Decentragram', ([deployer, author, tipper]) => {
// alternativ statt accounts => [owner, investor]
	let decentragram

	before(async () => {
		// load contracts
		decentragram = await Decentragram.new()
	})

	describe('Decentragram', async () => {
		it("deployed successfully", async () => {
			const address = decentragram.address
			assert.notEqual(address, 0x0)
			assert.notEqual(address, '')
			assert.notEqual(address, null)
			assert.notEqual(address, undefined)
		})

		it('has a name', async () => {

			const name = await decentragram.name()
			assert.equal(name, 'Decentragram')
		})
	})

	describe('images', async () => {
		let result, imageCount
		const hash = 'dasIstEinXBeliebigerHash'

		before(async () => {
			result = await decentragram.uploadImage(hash, 'RandomDescription', {from: author})
			imageCount = await decentragram.imageCount()
		})

		it('creates images', async () => {		
			
			// Success 
			assert.equal(imageCount, 1)
			const event = result.logs[0].args
			assert.equal(event.id.toNumber(), imageCount.toNumber(), 'id is correct')
			assert.equal(event.hash, hash, 'hash is correct')
			assert.equal(event.tipAmount, 0 ,'tipAmount is correct')
			assert.equal(event.description, 'RandomDescription' ,'description is correct')
			assert.equal(event.author, author, 'address/author is correct')

			// Fail for invalid hash, description or sender

			await decentragram.uploadImage('', 'RandomDescription', {from: author}).should.be.rejected
			await decentragram.uploadImage(hash, '', {from: author}).should.be.rejected
			await decentragram.uploadImage(hash, 'RandomDescription', {from: '0x0'}).should.be.rejected
		})

		it('lists images', async () => {
			const image = await decentragram.images(imageCount)
			assert.equal(image.id.toNumber(), imageCount.toNumber(), 'id is correct')
			assert.equal(image.hash, hash, 'hash is correct')
			assert.equal(image.tipAmount, 0 ,'tipAmount is correct')
			assert.equal(image.description, 'RandomDescription' ,'description is correct')
			assert.equal(image.author, author, 'address/author is correct')
		})

		it('can be tipped', async () => {

			// Save prior balance of Author
			let oldBalanceAutor =  await web3.eth.getBalance(author)
			oldBalanceAutor = new web3.utils.BN(oldBalanceAutor)


			// let tipper tip the image
			result = await decentragram.tipImage(imageCount, {from: tipper, value: web3.utils.toWei('1', 'Ether')})
			const event = result.logs[0].args

			//SUCCESS
			assert.equal(event.id.toNumber(), imageCount.toNumber(), 'id is correct')
			assert.equal(event.hash, hash, 'hash is correct')
			assert.equal(event.tipAmount, web3.utils.toWei('1', 'Ether') ,'tipAmount is correct')
			assert.equal(event.description, 'RandomDescription' ,'description is correct')
			assert.equal(event.author, author, 'address/author is correct')
			//FAIL
			await decentragram.tipImage(imageCount+1, {from: tipper, value: web3.utils.toWei('1', 'Ether')}).should.be.rejected
			await decentragram.tipImage(0, {from: tipper, value: web3.utils.toWei('1', 'Ether')}).should.be.rejected
			await decentragram.tipImage(imageCount, {from: '0x0'}).should.be.rejected
			

			// save author's balance after tips
			let newBalanceAutor =  await web3.eth.getBalance(author)
			newBalanceAutor = new web3.utils.BN(newBalanceAutor)


			//amount tipped
			let tipValue = web3.utils.toWei('1', 'Ether')
			tipValue = new web3.utils.BN(tipValue)

			const expectedAutor = oldBalanceAutor.add(tipValue)

			assert.equal(newBalanceAutor.toString(), expectedAutor.toString())
		

		})

	})
})