import type { NextApiRequest, NextApiResponse } from 'next'
import { db } from '../../../database'
import { IResEntry, IResEntrys, IResMessage } from '../../../interface'
import { Entry } from '../../../models'

type Data = IResMessage | IResEntry | IResEntrys

export default function handler(
	req: NextApiRequest,
	res: NextApiResponse<Data>
) {
	switch (req.method) {
		case 'GET':
			return getEntries(res)
		case 'POST':
			return postEntry(req, res)

		default:
			return res
				.status(400)
				.json({ status: 'error', message: `Method does not exist` })
	}
}

const getEntries = async (res: NextApiResponse<Data>) => {
	db.connect()
	const entries = await Entry.find().sort({ createdAt: 'ascending' })
	db.disconnect()

	res.status(200).json({ status: 'success', data: entries })
}

const postEntry = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
	const { description } = req.body
	const newEntry = new Entry({ description, createdAt: new Date() })
	console.log(req.body)

	try {
		db.connect()
		await newEntry.save()
		db.disconnect()

		res.status(201).json({ status: 'success', data: newEntry })
	} catch (error) {
		db.disconnect()
		console.log(error)

		res.status(500).json({ status: 'error', message: 'algo salio mal' })
	}
}
