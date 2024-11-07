import stream from 'stream'
import fs from 'fs'

export async function downloadImage(
	url: string,
	dirpath: string,
	filename: string
) {
	const filepath = `${dirpath}/${filename}`
	const fulldirpath = `./public/${dirpath}`
	if (!fs.existsSync(fulldirpath)) await fs.promises.mkdir(fulldirpath)

	const { body } = await fetch(url)
	if (!body) return null
	const dest = fs.createWriteStream(`./public/${filepath}`, { flags: 'w' })
	stream.Readable.fromWeb(body as any).pipe(dest)
	return filepath
}
